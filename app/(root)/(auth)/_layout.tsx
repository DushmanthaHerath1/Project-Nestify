import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      {/* <Stack>
        <Stack.Screen name="Sign_In" options={{ headerShown: false }} />
        <Stack.Screen name="Sign_Up" options={{ headerShown: false }} />
      </Stack> */}
      <StatusBar backgroundColor="#0061ff" style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default AuthLayout;
