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

type Scholarship = {
  id: number;
  name: string;
  company: string;
  value: number;
  open_date: string;
  due_date: string;
  description: string;
  url: string;
};

// Function to fetch data from server
export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Scholarship[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current scholarship displayed on card
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  console.log("flipping status:", isFlipped);

  const getSavedScholarships = async () => {
    try {
      const response = await axios.get<Scholarship[]>(
        "http://172.30.105.190:3000/api/saved-scholarships"
      );
      setSavedScholarships(response.data);
    } catch (error) {
      console.error("Error fetching saved scholarships:", error);
    }
  };

  const getScholarships = async () => {
    try {
      const response = await axios.get<Scholarship[]>(
        "http://172.30.105.190:3000/api/scholarships"
      );
      const fetchedData = response.data;
      const filteredData = fetchedData.filter((scholarship) => !savedScholarships.some((saved) => saved.id === scholarship.id));
      console.log(response);
      setData(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedScholarships();
  }, []);

  useEffect(() => {
    if (savedScholarships.length > 0) {
      getScholarships();
    }
  }, [savedScholarships]);

  useEffect(() => {
    console.log("hiii");
    getScholarships();
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1); // Show next scholarship
    } else {
      setCurrentIndex(0); // Reset to the first scholarship when reaching the end
    }
    setIsFlipped(false); // Reset to front card view
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSave = async () => {
    const currentScholarship = data[currentIndex];

    if (!currentScholarship) return;

    try {
      await axios.post("http://172.30.105.190:3000/api/saved-scholarships", {
        scholarship_id: currentScholarship.id
      });

      // Remove saved/liked scholarship from stack
      const updatedData = data.filter((item, index) => index !== currentIndex);
      setData(updatedData);

      if (currentIndex >= updatedData.length) {
        setCurrentIndex(0);
      } else {
        handleNext();
      }
    } catch (error) {
      console.error("Error saving scholarship:", error);
    }
  };

  const currentScholarship = data[currentIndex] || null;

  if (!currentScholarship) {
    return (
      <View style={styles.container}>
        <Text>No scholarships available</Text>
      </View>
    );
  }

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
        {/* {JSON.stringify(data)} */}
      </ThemedText>

      <View>
        <TouchableOpacity
          onPress={() => setIsFlipped(!isFlipped)}
          style={[
            styles.card,
            isFlipped ? styles.back : styles.front, // Dynamically apply styles
          ]}
        >
          {/* make the following variables */}
          {/* Scholarship info displayed on front of card */}

          <Text style={styles.text}>
            {isFlipped
              ?    <View style={styles.back}>
              <Text style={styles.text}>Opens: {currentScholarship.open_date}</Text>
              <Text style={styles.text}>Due: {currentScholarship.due_date}</Text>
              <Text style={styles.text}>{currentScholarship.description}</Text>
              <Text style={styles.text}>{currentScholarship.url}</Text>
            </View>
              : <View style={styles.front}>
              <Text style={styles.text}>${currentScholarship.value}</Text>
              <Text style={styles.text}>{currentScholarship.name}</Text>
              <Text style={styles.text}>{currentScholarship.company}</Text>
            </View>}
          </Text>

          {/* Scholarship info displayed on back of card */}
       

        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require("@/assets/images/ex2-removebg-preview.png")}
            style={[styles.image, { alignSelf: "center" }]} // Adjust the size here
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
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
    width: 325,
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
  front: {
    backgroundColor: "#ffffff",
  },
  back: {
    backgroundColor: "#C2E7B1",
  }
});
