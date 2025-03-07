import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#FFF" style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default TabsLayout;
