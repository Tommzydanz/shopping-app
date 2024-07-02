import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProductItemProps } from "./interface";

const ProductItem: ProductItemProps = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={product.image} resizeMode="contain" />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>
        ₦ {product.price.toLocaleString("en-US")}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 8,
    marginRight: 12,
    width: "48%",
  },
  image: { borderRadius: 8, height: 200, width: "100%" },
  name: {
    fontSize: 13,
    fontWeight: "light",
  },
  price: {
    marginTop: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "orange",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 40,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductItem;
