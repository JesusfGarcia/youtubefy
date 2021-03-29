import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ytdl from "react-native-ytdl";

import { Audio } from "expo-av";

import * as FileSystem from "expo-file-system";

import AudioPlayer from "./Views/AudioPlayer";
import DownloadSong from "./Views/DownloadSong";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import Home from "./Views/Home";
const Tab = createBottomTabNavigator();

export const AudioContext = React.createContext();

export default function App() {
  const [sound, setSound] = React.useState();
  const [updateList, setUpdateList] = React.useState(false);

  async function playSound(name) {
    console.log(name);
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
    const trackInfo = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + name
    );
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(trackInfo, {
      shouldPlay: true,
    });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function pauseSound() {
    await sound.pauseAsync();
  }

  async function resume() {
    await sound.playAsync();
  }
  const download = async () => {
    const youtubeURL =
      "https://www.youtube.com/watch?v=vZjjgw8Nc6Q&list=RDMM&start_radio=1";
    const urls = await ytdl(youtubeURL, { quality: "highestaudio" });
    console.log(urls);

    FileSystem.downloadAsync(
      urls[0].url,
      FileSystem.documentDirectory + "small.mp4"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    const uwu = async () => {
      const xd = await FileSystem.getInfoAsync(
        "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252FytbMusic-1f1b48ff-8d5b-4699-82c7-bba4bafa4a66/small.mp4"
      );
      console.log(xd);
    };
    uwu();

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  /*  React.useEffect(() => {
    const uwu = async () => {
      const callback = (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      };

      const downloadResumable = FileSystem.createDownloadResumable(
        "http://techslides.com/demos/sample-videos/small.mp4",
        FileSystem.documentDirectory + "small.mp4",
        {},
        callback
      );
      try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.error(e);
      }
    };
    uwu();
  }, []); */

  return (
    <AudioContext.Provider
      value={{ updateList, setUpdateList: setUpdateList, playSound: playSound }}
    >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="music" component={AudioPlayer} />
          <Tab.Screen name="descargar" component={DownloadSong} />
        </Tab.Navigator>
      </NavigationContainer>
    </AudioContext.Provider>
  );
}
