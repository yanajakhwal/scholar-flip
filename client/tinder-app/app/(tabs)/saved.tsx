import React from "react";
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

const data = [
  {
    id: "1",
    image: "https://via.placeholder.com/100", // Replace with actual image URLs
    name: "Scholarship 1",
    link: "https://example.com/scholarship1",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/100",
    name: "Scholarship 2",
    link: "https://example.com/scholarship2",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/100",
    name: "Scholarship 3",
    link: "https://example.com/scholarship3",
  },
  {
    id: "4",
    image: "https://via.placeholder.com/100",
    name: "Scholarship 4",
    link: "https://example.com/scholarship4",
  },
];

const SavedScreen = () => {
  const renderItem = ({ item }: { item: typeof data[0] }) => (
    <View style={styles.card}>
      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Scholarship Info */}
      <View style={styles.infoContainer}>
        {/* Scholarship Name */}
        <Text style={styles.cardText}>{item.name}</Text>

        {/* Scholarship Link */}
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <Text style={styles.cardLink}>View Scholarship</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Saved</Text>

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SavedScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
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
    marginTop: "10%",
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
