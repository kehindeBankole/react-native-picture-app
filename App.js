import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, Box } from "native-base";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import Home from "./screens/Home";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Cam from "./screens/Cam";
import Todo from "./screens/Todo";
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();
function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "red",
      }}
    >
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 40 }}>
        Home!
      </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#246BFD",
        tabBarInactiveTintColor: "#65656B",
        title: false,
        tabBarStyle: {
          borderRadius: 75,
          alignSelf: "center",
          backgroundColor: "#222232",
          borderTopColor: "#222232",
          height: 76,
          position: "absolute",
          left: 25,
          right: 25,
          bottom: 25,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center" }}>
              <Image
                style={styles.stretch}
                source={require("./assets/Pinterest.png")}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarLabel: "H",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center" }}>
              <Image
                style={styles.stretch}
                source={require("./assets/Explore.png")}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
        component={Cam}
      />
      <Tab.Screen
        name="todo"
        options={{
          tabBarLabel: "H",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center" }}>
              <Image
                style={styles.stretch}
                source={require("./assets/Chat.png")}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
        component={Todo}
      />
      <Tab.Screen
        name="Setngs"
        options={{
          tabBarLabel: "H",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center" }}>
              <Image
                style={styles.stretch}
                source={require("./assets/Profile.png")}
              />
            </View>
          ),
          tabBarLabelStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider config={config}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MyTabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
