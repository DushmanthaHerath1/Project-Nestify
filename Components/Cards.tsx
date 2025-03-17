import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex flex-col items-start w-60 h-80 "
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 size-full rounded-2xl"
      />

      <View className="absolute flex flex-row items-center justify-between px-3 py-1.5 rounded-full bg-white/90 top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="ml-1.5 text-xs font-rubik-bold text-primary-300">
          {rating}
        </Text>
      </View>
      <View className="absolute flex flex-col items-start bottom-5 inset-x-5">
        <Text className="text-xl text-white font-rubik-extrabold">{name}</Text>
        <Text className="text-base text-white font-rubik">{address}</Text>
        <View className="flex flex-row items-center justify-between w-full ">
          <Text className="text-xl text-white font-rubik-extrabold">
            {`LKR ${price}`}
          </Text>
          <Image source={icons.heart} className=" size-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full px-3 py-4 mt-4 bg-white rounded-md shadow-lg shadow-black-100/70"
    >
      <View className="absolute z-50 flex flex-row items-center p-1 px-2 rounded-full bg-white/90 top-5 right-5">
        <Image source={icons.star} className="size-2.5" />
        <Text className="ml-0.5 text-xs font-rubik-bold text-primary-300">
          {rating}
        </Text>
      </View>
      <Image className="z-10 w-full h-40 rounded-lg" source={{ uri: image }} />
      <View className="flex flex-col mt-2 ">
        <Text className="text-base text-black font-rubik-bold">{name}</Text>
        <Text className="text-xs text-black-200 font-rubik">{address}</Text>
        <View className="flex flex-row items-center justify-between mt-2 ">
          <Text className="text-base text-primary-300 font-rubik-bold">
            {`LKR ${price}`}
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
