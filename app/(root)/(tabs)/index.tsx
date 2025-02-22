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
      <Link href={"/Sign_In"}> Sign in</Link>
      <Link href={"/Explore"}> Explore</Link>
      <Link href={"/Profile"}> Profile</Link>
      <Link href={"/properties/1"}> Properties</Link>
      <Text className="my-10 text-lg font-bold">Welcome to Nestify</Text>
    </View>
  );
}
