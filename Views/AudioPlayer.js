import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

export default function AudioPlayer() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>hola mundo XD</Text>
      <View style={styles.controlBar}>
        <TouchableOpacity style={styles.startButton}>
          <Text>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  controlBar: {
    backgroundColor: "red",
    display: "flex",
    width: "100%",
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
