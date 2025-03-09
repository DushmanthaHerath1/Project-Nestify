import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/context/global-provider";
import { isLoading } from "expo-font";
import { signOut_fn } from "@/lib/appwrite";
import { router } from "expo-router";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  textStyle?: any;
  showArrow?: boolean;
  onPress?: () => void;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6 " />
      <Text
        className={`text-lg font-rubik-semibold text-black-300, ${textStyle}`}
      >
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, setIsLoggedIn, setUser } = useGlobalContext();

  const handleLogout = async () => {
    await signOut_fn();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/(root)/(auth)/Sign_In");
  };

  return (
    <SafeAreaView className="flex-1 pt-6 bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7 "
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-6" tintColor={"#0061ff"} />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="relative flex flex-col items-center mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="relative rounded-full size-44"
            />
            <TouchableOpacity className="absolute bottom-12 right-3">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="mt-2 text-2xl font-rubik-bold">
              {user?.username}
            </Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col pt-5 mt-5 border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col pt-5 mt-5 border-t border-primary-200">
          <SettingsItem
            title="Log-Out"
            icon={icons.logout}
            textStyle={`text-danger`}
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
