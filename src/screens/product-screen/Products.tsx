import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Product } from "../../components/product-item/interface";
import ProductItem from "../../components/product-item/ProductItem";
import { products } from "../../data/products";

interface ProductsScreenProps {
  addToCart: (product: Product) => void;
}

const Products: React.FC<ProductsScreenProps> = ({ addToCart }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});

export default Products;
