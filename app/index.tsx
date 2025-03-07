import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Link, Redirect, useRouter } from "expo-router";
import { useGlobalContext } from "@/context/global-provider";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const router = useRouter();

  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn)
    return <Redirect href={"/(root)/(tabs)/Home"} />;

  return (
    <SafeAreaView className="flex-1 pt-10 bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        ></Image>
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Nestify
          </Text>
          <Text className="mt-2 text-3xl text-center font-rubik-bold text-black-300">
            Let's Get Clocer to{"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="mt-8 text-center font-rubik">
            Let's get started!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/Sign_In")}
            className="w-full py-4 mt-5 bg-blue-100 rounded-full shadow-md shadow-zinc-300"
          >
            <View className="flex flex-row items-center justify-center">
              <Text className="ml-2 font-rubik-semibold text-black-300 ">
                Sign in with Email
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="mt-5 text-center font-rubik">
            Don't have an account?
            <Link href={"/(root)/(auth)/Sign_Up"} className="text-primary-300">
              {" "}
              Sign Up
            </Link>
          </Text>
        </View>
      </ScrollView>
      {/* <StatusBar hidden /> */}
    </SafeAreaView>
  );
};

export default index;
