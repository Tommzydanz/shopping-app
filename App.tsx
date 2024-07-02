import React, { useCallback, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Products from "./src/screens/product-screen/Products";
import Checkout from "./src/screens/checkout/Checkout";
import OrderSuccess from "./src/screens/order-success/OrderSuccess";
import { Product } from "./src/components/product-item/interface";
import { ICartItem } from "./src/components/cart-item/interface";

const Tab = createBottomTabNavigator();

// Define the type for valid Ionicons names
type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function App() {
  // State to hold the current items in the cart
  const [cart, setCart] = useState<ICartItem[]>([]);

  /**
   * Adds a product to the cart or increments its quantity if already present
   * @param product The product to be added to the cart
   */
  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartItemQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    },
    [],
  );

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Clears all items from the cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * Clears all items from the cart
   */
  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: IconName = "list";

              if (route.name === "Products") {
                iconName = focused ? "list-circle" : "list-circle-outline";
              } else if (route.name === "Checkout") {
                iconName = focused ? "cart" : "cart-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "orange",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Products">
            {(props) => <Products {...props} addToCart={addToCart} />}
          </Tab.Screen>
          <Tab.Screen
            name="Checkout"
            options={{
              tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
              tabBarBadgeStyle: {
                backgroundColor: "orange",
                color: "white",
              },
            }}
          >
            {(props) => (
              <Checkout
                {...props}
                cart={cart}
                removeFromCart={removeFromCart}
                updateCartItemQuantity={updateCartItemQuantity}
                clearCart={clearCart}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="OrderSuccess"
            component={OrderSuccess}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
