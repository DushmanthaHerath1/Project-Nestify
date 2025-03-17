import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/Components/Search";
import { Card, FeaturedCard } from "@/Components/Cards";
import Filters from "@/Components/Filters";
import { useGlobalContext } from "@/context/global-provider";
import seed from "@/lib/seed";
import { useLocalSearchParams, router } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import NoResults from "@/Components/NoResults";

const Explore = () => {
  // const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // const { data: latestProperties, loading: latestPropertiesLoading } =
  //   useAppwrite({
  //     fn: getLatestProperties,
  //   });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({ filter: params.filter!, query: params.query!, limit: 20 });
  }, [params.filter, params.query]);
  return (
    <SafeAreaView className="flex-1 pt-2 bg-white">
      {/* <Button title="Seed" onPress={seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="mt-5 text-primary-300" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5 ">
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity className="items-center justify-center rounded-full size-11 bg-primary-100">
                <Image source={icons.backArrow} className="size-6" />
              </TouchableOpacity>
              <Text className="text-base font-rubik-semibold text-black-300">
                Search Your ideal place
              </Text>
              <Image
                source={icons.bell}
                className="size-6"
                tintColor={"#0061ff"}
              />
            </View>
            <Search />
            <View className="mt-2">
              <Filters />
            </View>
            <View className="mt-5">
              <Text className="text-base text-primary-300 font-rubik">
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
