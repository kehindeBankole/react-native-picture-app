import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Camera } from "expo-camera";
export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [click, setClick] = useState(false);
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return () => setClick(false);
  }, []);
  const takePhoto = async () => {
    const photo = await ref.current
      .takePictureAsync({
        quality: 1,
        base64: false,
        fixOrientation: true,
        exif: true,
      })
      .then((photo) => {
        photo.exif.Orientation = 1;
        console.log(photo);
        setImage(photo.uri);
        setClick(false);
      });
    console.debug(photo);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {click === true ? (
        <Camera style={styles.camera} type={type} ref={ref} ratio={"16:9"}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                takePhoto();
                // setClick(false);
                // setType(
                //   type === Camera.Constants.Type.back
                //     ? Camera.Constants.Type.front
                //     : Camera.Constants.Type.back
                // );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                height: 300,
                width: 300,
                position: "absolute",
                top: 90,
                left: 50,
              }}
            />
          )}
          {image ? (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#222232",
                width: 100,
                height: 50,
                borderRadius: 15,
                //   display: image ? "none" : "block",
              }}
              onPress={() => setClick(true)}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Inter_500Medium",
                  fontSize: 15,
                }}
              >
                edit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#222232",
                width: 100,
                height: 50,
                borderRadius: 15,
                //   display: image ? "none" : "block",
              }}
              onPress={() => setClick(true)}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Inter_500Medium",
                  fontSize: 15,
                }}
              >
                click
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 200,
    alignSelf: "center",
  },
  button: {
    flex: 0.1,
    // alignSelf: "flex-end",
    // alignItems: "center",
    backgroundColor: "blue",
    width: 100,
    height: 50,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
