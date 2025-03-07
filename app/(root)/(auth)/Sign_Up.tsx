import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import FormFeild from "@/Components/FormFeild";
import CustomButton from "@/Components/CustomButton";
import { useRouter, Link } from "expo-router";
import { createUser } from "@/lib/appwrite";

const Sign_Up = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "please fill in all the fiels");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.userName);
      //set it to global state...
      router.replace("/(root)/(tabs)/Explore");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="items-center justify-center w-full h-full px-4 my-6 min-h-[85vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[100px]"
          ></Image>
          <Text className="mt-10 text-2xl text-primary-300 font-rubik-semibold">
            Get Started Nestify!
          </Text>
          <FormFeild
            title="User Name"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-10"
          />
          <FormFeild
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFeild
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <Text className="mt-5 text-center font-rubik">
            Already have an account?
            <Link
              href={"/(root)/(auth)/Sign_In"}
              className="text-lg text-primary-300 font-rubik-semibold"
            >
              {" "}
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sign_Up;
