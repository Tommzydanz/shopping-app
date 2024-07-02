import React from "react";
import { ImageSourcePropType } from "react-native";

export type ProductItemProps = React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
}>;

export interface Product {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
}
