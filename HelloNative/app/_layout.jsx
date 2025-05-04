import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
};

export default RootLayout;
