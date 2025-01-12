import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
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

const SavedScreen = () => {
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);

  // Fetch saved scholarships from backend
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

  useEffect(() => {
    getSavedScholarships();
  }, []);

  const renderItem = ({ item }: { item: Scholarship }) => (
    <View style={styles.card}>
      {/* Image
      <Image source={{ uri: item.image }} style={styles.image} /> */}

      {/* Scholarship Info */}
      <View style={styles.infoContainer}>
        {/* Scholarship Name */}
        <Text style={styles.cardText}>{item.name}</Text>

        {/* Scholarship Link */}
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.cardLink}>View Scholarship</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/sky.jpg")}
          style={[styles.headerImage, { alignSelf: "center" }]} // Adjust the size here
        />
      }
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Saved</Text>

        {/* List */}
        <FlatList
          data={savedScholarships}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ParallaxScrollView>
  );
};

const { width } = Dimensions.get("window");
export default SavedScreen;

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    position: "absolute",
    width: 400,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F4F1",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 16,
    marginTop: "13%",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row", // Horizontal layout for the card
    alignItems: "center",
    width: width * 0.9,
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1, // Takes the remaining space in the row
    justifyContent: "center", // Aligns content vertically
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8, // Space between name and link
    color: "#333",
  },
  cardLink: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
