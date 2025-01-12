import {
  StyleSheet,
  Image,
  Platform,
  Text,
  Button,
  View,
  TouchableOpacity,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

// Function to fetch data from server
export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  console.log("flipping status:", isFlipped);

  const getScholarships = async () => {
    try {
      console.log("hihi");
      const response = await axios.get(
        "http://172.30.105.190:3000/api/scholarships"
      );
      const _data = response.data;
      console.log(response);
      setData(_data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("hiii");
    getScholarships();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Everything below is the styling

  //THIS CAN BE EDITTED
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedText>
        {/* This JSON.stringify(data) is what's displaying the data right now, its ok to delete when formatting */}
        {JSON.stringify(data)}
      </ThemedText>
      <View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => setIsFlipped(!isFlipped)}
        >
          {/* make the following variables */}
          <Text style={styles.text}>Value</Text>
          <Text style={styles.text}>Company</Text>
          <Text style={styles.text}>Description</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/ex2-removebg-preview.png")}
            style={[styles.image, { alignSelf: "center" }]} // Adjust the size here
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/heart.png")}
            style={[styles.image, { alignSelf: "center" }]} // Adjust the size here
          />
        </TouchableOpacity>
      </View>

      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the{" "}
          <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
          provide files for different screen densities
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 70, // Desired width
    height: 70, // Desired height
  },
  container: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Add space between images
    alignItems: "center", // Align images vertically in the center
    padding: 5,
  },
  card: {
    width: 250,
    height: 350,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
  },
});
