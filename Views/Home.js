import React from "react";

import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";

import { AudioContext } from "../App";

export default function Home() {
  const [songs, setSongs] = React.useState([]);
  const { updateList, playSound } = React.useContext(AudioContext);

  React.useEffect(() => {
    console.log("updateList =>", updateList);
    const checkSongsList = async () => {
      const dir = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      console.log("directorio =>", dir);
      setSongs([dir]);
    };

    checkSongsList();
  }, [updateList]);

  return (
    <View>
      {songs.map((item, idx) => {
        return (
          <TouchableOpacity onPress={() => playSound(item)} key={idx}>
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
