import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CartItem from "../../components/cart-item/CartItem";
import { ICartItem } from "../../components/cart-item/interface";

interface CheckoutProps {
  cart: ICartItem[];
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  navigation: any;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  navigation,
}) => {
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  /**
   * Handles the checkout process
   * Clears the cart and navigates to the OrderSuccess screen
   */
  const handleCheckout = () => {
    clearCart();
    navigation.navigate("OrderSuccess");
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>No orders yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            cart={item}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ₦ {total.toLocaleString("en-US")}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  cartItem: {
    marginBottom: 8,
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  removeText: {
    color: "red",
  },
  totalContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: "orange",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  emptyCartText: {
    fontSize: 18,
    color: "gray",
  },
});

export default Checkout;
