import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
} from "react-native";
import { Input, Icon, Center, Box, Button, Flex } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function Todo() {
  const [text, setText] = useState("");
  const [force, setForce] = useState(false);
  const todoInput = useRef();
  const [todo, setTodos] = useState([
    // { done: false, content: "learn react native" },
  ]);
  function addTodo(content) {
    setText("");
    todo.map((d) => d !== content && null);
    setTodos((prev) => [...prev, { done: false, content }]);
    todoInput.current.clear();
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Center>
        <Box style={{ marginTop: 50 }}>
          <Input
            ref={todoInput}
            onChangeText={(text) => setText(text)}
            size="lg"
            w={{
              base: "100%",
              md: "25%",
            }}
            InputRightElement={
              <Icon
                as={<MaterialIcons name="visibility-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            }
            placeholder="Enter Todo"
          />
        </Box>
      </Center>
      <FlatList
        style={{ flexGrow: 1 }}
        data={todo}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Box
            bg={{
              linearGradient: {
                colors: ["lightBlue.300", "violet.800"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="5"
            mt="5"
            rounded="xl"
          >
            <Flex direction="row" justifyContent="space-between">
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_700Bold",
                  textTransform: "capitalize",
                  color: `${item.done === true ? "red" : "white"}`,
                  alignSelf: "center",
                }}
              >
                {item.content}
              </Text>
              <Flex direction="row">
                <Button
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    backgroundColor: "red",
                    alignSelf: "center",
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setTodos(todo.filter((d) => d.content !== item.content));
                  }}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </Button>
                <Button
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    backgroundColor: "green",
                  }}
                  onPress={() => {
                    setForce((prev) => !prev);
                    if (item.done === false) {
                      item.done = true;
                    } else {
                      item.done = false;
                    }
                  }}
                >
                  <AntDesign name="checkcircleo" size={24} color="black" />
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}
        keyExtractor={(item) => item.content}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginBottom: 120,
          marginTop: 50,
          backgroundColor: "red",
          width: 150,
          height: 50,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          text !== "" && addTodo(text);
          todo.map((d) => d === d.content && null);
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Inter_700Bold",
            fontSize: 15,
            textTransform: "capitalize",
          }}
        >
          add to do
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 10,
    //  paddingBottom: 20,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
