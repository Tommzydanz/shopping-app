import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OrderSuccessProps {
  navigation: any;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="green" />
      <Text style={styles.successText}>Order Placed Successfully!</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.backButtonText}>Back to Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "orange",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderSuccess;
