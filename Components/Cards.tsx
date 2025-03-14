import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex flex-col items-start w-60 h-80 "
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />

      <View className="absolute flex flex-row items-center justify-between px-3 py-1.5 rounded-full bg-white/90 top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="ml-1.5 text-xs font-rubik-bold text-primary-300">
          4.4
        </Text>
      </View>
      <View className="absolute flex flex-col items-start bottom-5 inset-x-5">
        <Text className="text-xl text-white font-rubik-extrabold">
          Modern Apartment
        </Text>
        <Text className="text-base text-white font-rubik">
          22 W 15th St, New York
        </Text>
        <View className="flex flex-row items-center justify-between w-full ">
          <Text className="text-xl text-white font-rubik-extrabold">
            LKR25,000
          </Text>
          <Image source={icons.heart} className=" size-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full px-3 py-4 mt-4 bg-white rounded-md shadow-lg shadow-black-100/70"
    >
      <View className="absolute z-50 flex flex-row items-center p-1 px-2 rounded-full bg-white/90 top-5 right-5">
        <Image source={icons.star} className="size-2.5" />
        <Text className="ml-0.5 text-xs font-rubik-bold text-primary-300">
          4.4
        </Text>
      </View>
      <Image className="z-10 w-full h-40 rounded-lg" source={images.newYork} />
      <View className="flex flex-col mt-2 ">
        <Text className="text-base text-black font-rubik-bold">
          Cozy Studio
        </Text>
        <Text className="text-xs text-black-200 font-rubik">
          22 W 15th St, New York
        </Text>
        <View className="flex flex-row items-center justify-between mt-2 ">
          <Text className="text-base text-primary-300 font-rubik-bold">
            LKR25,000
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2 "
            tintColor={"#191d31"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
// export default Cards
