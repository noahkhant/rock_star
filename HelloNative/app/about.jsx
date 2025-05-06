import { View, Text } from "react-native";

const about = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text style={{ fontWeight: "bold" }}>About Us</Text>
    </View>
  );
};

export default about;
