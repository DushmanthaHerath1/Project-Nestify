import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/Sign_In"} className="font-rubik">
        {" "}
        Sign in
      </Link>
      <Link href={"/Explore"} className="font-rubik">
        {" "}
        Explore
      </Link>
      <Link href={"/Profile"}> Profile</Link>
      <Link href={"/properties/1"}> Properties</Link>
      <Text className="my-10 text-3xl font-bold font-rubik-bold">
        Welcome to Nestify
      </Text>
      <View className="flex-1 justify-center items-center">
        <Text className="my-10 text-3xl font-normal font-rubik">
          Hello, World!
        </Text>
        <Text className="text-xl font-rubik">This is bold Rubik</Text>
      </View>
    </View>
  );
}
