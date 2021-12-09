import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image, Center, NativeBaseProvider } from "native-base";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
//import MasonryList from "react-native-masonry-list";
import MasonryList from "@react-native-seoul/masonry-list";

export default function Home() {
  const [a, seta] = useState([]);
  const [b, setb] = useState(10);
  function fetchpic() {
    fetch(`https://api.pexels.com/v1/search?query=animal&per_page=${b}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "563492ad6f917000010000018968d5098fec4ffcab3947e600c49094",
      },
    })
      .then((res) => res.json())
      .then((data) => seta(data));
  }
  // const { isLoading, isError, data, error } = useQuery("todos", () => {

  // });
  React.useEffect(() => {
    fetchpic();
  }, [b]);

  //a && a.photos && a.photos.map((d) => f.push({ uri: d.src.large }));
  console.log(a.photos);
  // if (isLoading) {
  //   return (
  //     <View style={{ ...styles.container, backgroundColor: "red" }}>
  //       <Text>loading</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log(a.photos.length)}
        style={{
          width: 70,
          height: 50,
          backgroundColor: "#222232",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_800ExtraBold",
            fontSize: 15,
            color: "white",
            textTransform: "capitalize",
          }}
        >
          all
        </Text>
      </TouchableOpacity>
      {a && a.photos && (
        <MasonryList
          spacing={2}
          numColumns={2}
          data={a && a.photos && a.photos}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ margin: 10 }} key={item.id}>
              {console.log(index)}
              <Image
                style={{
                  borderRadius: 15,
                  height: item.height / 10,
                  width: item.width / 10,
                }}
                source={{
                  uri: `${item.src.large}`,
                }}
                alt="image"
              />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {item.photographer}
              </Text>
            </View>
          )}
          onEndReached={() => setb((prev) => prev + 10)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 10,
    //  paddingBottom: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
});

// 563492ad6f917000010000018968d5098fec4ffcab3947e600c49094
