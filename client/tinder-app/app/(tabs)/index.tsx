import { Image, StyleSheet, Platform, TextInput } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Profile</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter Email</ThemedText>
        <TextInput
          placeholder="email"
          keyboardType="default"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter First Name</ThemedText>
        <TextInput
          placeholder="first name"
          keyboardType="default"
          value={fName}
          onChangeText={(text) => setfName(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter Last Name</ThemedText>
        <TextInput
          placeholder="last name"
          keyboardType="default"
          value={lName}
          onChangeText={(text) => setlName(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter Age</ThemedText>
        <TextInput
          placeholder="age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter School</ThemedText>
        <TextInput
          placeholder="school"
          keyboardType="default"
          value={school}
          onChangeText={(text) => setSchool(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter Program</ThemedText>
        <TextInput
          placeholder="program"
          keyboardType="default"
          value={program}
          onChangeText={(text) => setProgram(text)}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter Year of Study</ThemedText>
        <TextInput
          placeholder="year of study"
          keyboardType="numeric"
          value={year}
          onChangeText={(text) => setYear(text)}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
