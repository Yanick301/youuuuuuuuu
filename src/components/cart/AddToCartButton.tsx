'use client';

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { Button, ButtonProps } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { TranslatedText } from "../TranslatedText";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
    product: Product;
    children?: React.ReactNode;
} & ButtonProps;

export function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    }

    return (
        <Button onClick={handleAddToCart} {...props}>
            {children ? children : <ShoppingCart />}
        </Button>
    )
}
