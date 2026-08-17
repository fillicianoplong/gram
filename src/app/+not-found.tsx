import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href="/logs" style={styles.button}>Go to Logs</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: colors.text,
  },
});