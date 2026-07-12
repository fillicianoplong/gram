import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
      >
        <FontAwesome6 name="plus" size={18} color="#25292e" style={styles.buttonIcon} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  buttonLabel: {
    color: "#25292e",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
