import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  type GestureResponderEvent,
} from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = "",
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading || disabled}
      className={`items-center w-full p-3 rounded-2xl bg-primary-300 focus:border-primary-200 ${
        disabled || isLoading ? "opacity-50" : "opacity-100"
      } ${containerStyles}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <Text className="text-lg text-white font-rubik-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
