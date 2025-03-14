import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/Components/Search";
import { Card, FeaturedCard } from "@/Components/Cards";
import Filters from "@/Components/Filters";
import { useGlobalContext } from "@/context/global-provider";
import seed from "@/lib/seed";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="flex-1 pt-2 bg-white">
      {/* <Button title="Seed" onPress={seed} /> */}
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="rounded-full size-12"
                />
                <View className="flex flex-col items-start justify-center ml-2">
                  <Text className="text-xs font-rubik-semibold text-black-200 ">
                    {" "}
                    Good Morning!
                  </Text>
                  <Text className="font-rubik-bold text-black-300">
                    {user?.username}
                  </Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                className="size-6"
                tintColor={"#0061ff"}
              />
            </View>
            <View>
              <Search />
            </View>
            <View className="my-5 ">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  {" "}
                  Featured
                </Text>
                <TouchableOpacity className="">
                  <Text className="text-base font-rubik-bold text-primary-300 ">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[5, 6, 7]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                {" "}
                Our Recommendations
              </Text>
              <TouchableOpacity className="">
                <Text className="text-base font-rubik-bold text-primary-300 ">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
