'use client';

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { Button, ButtonProps } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { TranslatedText } from "../TranslatedText";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type AddToCartButtonProps = {
    product: Product;
    children?: React.ReactNode;
} & ButtonProps;

export function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const { language } = useLanguage();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        
        const title = language === 'fr' ? "Ajouté au panier" : "Zum Warenkorb hinzugefügt";
        const description = language === 'fr' 
            ? `${product.name_fr} a été ajouté à votre panier.`
            : `${product.name} wurde Ihrem Warenkorb hinzugefügt.`;

        toast({
            title,
            description,
        });
    }

    return (
        <Button onClick={handleAddToCart} {...props}>
            {children ? children : <ShoppingCart />}
        </Button>
    )
}
