import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, usePathname, router } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex-row items-center justify-between w-full px-4 py-2 mt-5 border rounded-lg felx bg-accent-100 border-primary-100">
      <View className="z-50 flex flex-row items-center justify-start flex-1">
        <Image source={icons.search} className="size-6" tintColor={"#0061FF"} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything..."
          className="flex-1 ml-2 text-sm font-rubik-medium text-black-300"
          style={{ fontFamily: "Rubik-Regular" }}
        />
      </View>
      <Image source={icons.filter} className="size-6" tintColor={"#0061FF"} />
    </View>
  );
};

export default Search;
