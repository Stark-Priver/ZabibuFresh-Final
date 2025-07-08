import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Helper function to get the current user's session.
 */
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return session;
};

/**
 * Helper function to get the current authenticated user.
 */
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return user;
};

/**
 * Fetches the user profile from the 'profiles' table.
 */
export const getUserProfile = async (userId) => {
  if (!userId) return null;
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`full_name, phone, role, created_at`)
      .eq("id", userId)
      .single();

    if (error && status !== 406) {
      console.error("Error fetching user profile:", error.message);
      throw error;
    }

    return data
      ? {
          id: userId,
          fullName: data.full_name,
          phone: data.phone,
          role: data.role,
          createdAt: data.created_at,
        }
      : null;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
};

/**
 * Creates a user profile in the 'profiles' table.
 */
export const createUserProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: profileData.id,
          full_name: profileData.fullName,
          phone: profileData.phone,
          role: profileData.role,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error.message);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error creating user profile:", error.message);
    throw error; // Re-throw to handle in signup
  }
};

/**
 * Sign up a new user with phone and password - IMPROVED VERSION
 */
export const signUp = async (userData) => {
  try {
    // Validate required fields
    if (!userData.phone || !userData.password || !userData.fullName) {
      throw new Error(
        "Missing required fields: phone, password, and full name are required"
      );
    }

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = userData.phone.replace(/\s|-/g, "");

    console.log("Attempting signup with:", {
      phone: cleanPhone,
      fullName: userData.fullName,
      role: userData.role,
    });

    const { data, error } = await supabase.auth.signUp({
      phone: cleanPhone,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          phone: cleanPhone,
          role: userData.role || "buyer",
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error);
      return { data: null, error };
    }

    console.log("Signup successful:", data);

    // Wait for trigger to process
    if (data.user && !data.user.email_confirmed_at) {
      // For phone signup, wait a bit for the trigger
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Check if profile was created by trigger
      const profile = await getUserProfile(data.user.id);
      if (!profile) {
        console.log("Trigger didn't create profile, creating manually...");
        try {
          await createUserProfile({
            id: data.user.id,
            fullName: userData.fullName,
            phone: cleanPhone,
            role: userData.role || "buyer",
          });
          console.log("Profile created manually");
        } catch (profileError) {
          console.error("Failed to create profile manually:", profileError);
          return { data: null, error: profileError };
        }
      } else {
        console.log("Profile created by trigger:", profile);
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Signup exception:", error);
    return { data: null, error };
  }
};

/**
 * Sign in a user with phone and password - IMPROVED VERSION
 */
export const signIn = async (phoneOrEmail, password) => {
  try {
    const isEmail = phoneOrEmail.includes("@");
    let signInData;

    if (isEmail) {
      signInData = {
        email: phoneOrEmail,
        password: password,
      };
    } else {
      // Clean phone number
      const cleanPhone = phoneOrEmail.replace(/\s|-/g, "");
      signInData = {
        phone: cleanPhone,
        password: password,
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword(signInData);

    if (error) {
      console.error("Signin error:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Signin exception:", error.message);
    return { data: null, error };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Signout error:", error.message);
    }
    return { error };
  } catch (error) {
    console.error("Signout exception:", error.message);
    return { error };
  }
};

/**
 * Upload image to Supabase Storage (free tier: 1GB storage)
 */
export const uploadProductImage = async (imageBase64, fileName) => {
  try {
    // Convert base64 to blob
    const response = await fetch(`data:image/jpeg;base64,${imageBase64}`);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(`products/${fileName}`, blob, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error.message);
      return { data: null, error };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(`products/${fileName}`);

    return { data: { path: data.path, publicUrl }, error: null };
  } catch (error) {
    console.error("Upload exception:", error.message);
    return { data: null, error };
  }
};

/**
 * Get all products
 */
export const getProducts = async (sellerId = null) => {
  try {
    let query = supabase
      .from("products")
      .select(
        `
        *,
        profiles:seller_id (
          full_name,
          phone
        )
      `
      )
      .order("created_at", { ascending: false });

    if (sellerId) {
      query = query.eq("seller_id", sellerId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return { data: null, error };
  }
};

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title: productData.title,
          description: productData.description,
          image_url: productData.imageUrl,
          price: productData.price,
          quantity: productData.quantity,
          location: productData.location,
          seller_id: productData.sellerId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error creating product:", error.message);
    return { data: null, error };
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Error deleting product:", error.message);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return { error };
  }
};

/**
 * Get messages for a conversation
 */
export const getMessages = async (senderId, receiverId, productId) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("product_id", productId)
      .or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return { data: null, error };
  }
};

/**
 * Send a message
 */
export const sendMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: messageData.senderId,
          receiver_id: messageData.receiverId,
          product_id: messageData.productId,
          content: messageData.content,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error sending message:", error.message);
    return { data: null, error };
  }
};

/**
 * Get conversations for a user
 */
export const getConversations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        products (
          id,
          title,
          seller_id
        ),
        sender:profiles!messages_sender_id_fkey (
          id,
          full_name,
          phone
        ),
        receiver:profiles!messages_receiver_id_fkey (
          id,
          full_name,
          phone
        )
      `
      )
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    return { data: null, error };
  }
};

export default supabase;
