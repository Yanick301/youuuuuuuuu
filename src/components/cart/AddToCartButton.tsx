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
            title: "Zum Warenkorb hinzugefügt",
            description: `${product.name} wurde Ihrem Warenkorb hinzugefügt.`,
        });
    }

    return (
        <Button onClick={handleAddToCart} {...props}>
            {children ? children : <ShoppingCart />}
        </Button>
    )
}
