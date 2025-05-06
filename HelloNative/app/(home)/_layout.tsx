import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <MaterialIcons name="home" size={24} />,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: () => <MaterialIcons name="person" size={24} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <MaterialIcons name="settings" size={24} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
