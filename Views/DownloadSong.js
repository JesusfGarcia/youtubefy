import React from "react";
import ytdl from "react-native-ytdl";
import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
} from "react-native";
import { AudioContext } from "../App";

export default function DownloadSong() {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const { updateList, setUpdateList } = React.useContext(AudioContext);

  const download = async () => {
    const youtubeURL = url;
    const urls = await ytdl(youtubeURL, { quality: "highestaudio" });
    console.log(urls);

    FileSystem.downloadAsync(urls[0].url, FileSystem.documentDirectory + name)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
        alert(`${name} se ha descargado exitosamente`);
        setUpdateList(!updateList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Url</Text>
        <TextInput
          value={url}
          onChangeText={(text) => setUrl(text)}
          style={styles.input}
        />
        <Text>Nombre</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <Button onPress={download} title="Aceptar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
    marginBottom: 10,
  },
  form: {
    padding: 10,
  },
});
