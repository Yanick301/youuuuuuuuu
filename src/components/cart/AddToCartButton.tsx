'use client';

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { Button, ButtonProps } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { TranslatedText } from "../TranslatedText";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type AddToCartOptions = {
    size?: string;
    color?: string;
};

type AddToCartButtonProps = {
    product: Product;
    children?: React.ReactNode;
    options?: AddToCartOptions;
} & ButtonProps;

export function AddToCartButton({ product, children, options, ...props }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const { language } = useLanguage();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1, options);
        
        const title = language === 'fr' ? "Ajouté au panier" : language === 'en' ? "Added to cart" : "Zum Warenkorb hinzugefügt";
        
        let description = language === 'fr' 
            ? `${product.name_fr}`
            : language === 'en'
            ? `${product.name_en}`
            : `${product.name}`;

        if (options?.size || options?.color) {
            const details = [options.size, options.color].filter(Boolean).join(', ');
            description += ` (${details})`;
        }
        
        description += language === 'fr' ? " a été ajouté à votre panier." : language === 'en' ? " has been added to your cart." : " wurde Ihrem Warenkorb hinzugefügt.";

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
