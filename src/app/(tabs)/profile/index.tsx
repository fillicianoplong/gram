import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 10,
  },
  text: {
    color: colors.text,
    textAlign: "center",
  },
});
