import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        ></Image>
        <View className="px-10">
          <Text className="font-rubik text-black-200 text-base text-center uppercase">
            Welcome to Nestify
          </Text>
          <Text className=" font-rubik-bold text-3xl text-black-300 text-center mt-2">
            Let's Get Clocer to{"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="font-rubik text-center mt-12">
            Sign Up with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-100 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              ></Image>
              <Text className="font-rubik-semibold text-black-300 ml-2 ">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
