import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { session, loading, initialLoading, profile } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initialLoading) return; // Don't hide splash until initial auth check is done

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    if (session && profile) {
      // User is authenticated and has a profile
      if (
        inAuthGroup ||
        segments.length === 0 ||
        (segments.length > 0 && segments[0] === "index")
      ) {
        // If in auth routes, or at root, or at an unprotected index, redirect to app home
        router.replace("/(app)/(tabs)/home");
      }
      SplashScreen.hideAsync();
    } else if (!session) {
      // User is not authenticated
      if (inAppGroup) {
        // If in app routes, redirect to login
        router.replace("/(auth)/login");
      }
      SplashScreen.hideAsync();
    } else if (session && !profile && !loading) {
      // User is authed but profile is still loading or missing
      if (inAppGroup) {
        router.replace("/(auth)/login");
      }
      SplashScreen.hideAsync();
    } else if (!initialLoading && !loading) {
      // Fallback to hide splash screen if no other condition met it
      SplashScreen.hideAsync();
    }
  }, [session, profile, initialLoading, loading, segments, router]);

  if (initialLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="index" redirect={!session} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
