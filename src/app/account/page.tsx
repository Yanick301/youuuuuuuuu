
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { useUser, useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ListOrdered, User, Camera, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) {
    return null;
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }
    
    const file = event.target.files[0];
    const storage = getStorage();
    setIsUploading(true);

    try {
      const filePath = `profile-pictures/${user.uid}/${file.name}`;
      const fileRef = storageRef(storage, filePath);
      
      const uploadResult = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await updateProfile(user, { photoURL: downloadURL });
      
      // Force a refresh of the user object by re-fetching or relying on onAuthStateChanged
      // For simplicity, we can toast and the UI will update on next refresh or via the listener
      toast({
        title: "Photo de profil mise à jour",
        description: "Votre nouvelle photo de profil a été enregistrée.",
      });

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erreur de téléversement",
        description: "Impossible de mettre à jour la photo de profil.",
      });
      console.error("Error uploading profile picture:", error);
    } finally {
        setIsUploading(false);
         if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      <h1 className="mb-8 font-headline text-3xl">
        <TranslatedText fr="Aperçu du compte">Kontoübersicht</TranslatedText>
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                          <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                          <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-muted/80 hover:bg-muted"
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                      >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                      </Button>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">{user.displayName || 'Benutzer'}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card className="hover:bg-muted/50 transition-colors">
                     <Link href="/account/orders">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium"><TranslatedText fr="Commandes récentes">Letzte Bestellungen</TranslatedText></CardTitle>
                            <ListOrdered className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground"><TranslatedText fr="Afficher l'historique de vos commandes">Ihren Bestellverlauf anzeigen</TranslatedText></p>
                        </CardContent>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                     <Link href="/account/favorites">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium"><TranslatedText fr="Vos favoris">Ihre Favoriten</TranslatedText></CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground"><TranslatedText fr="Afficher les articles que vous avez aimés">Artikel anzeigen, die Ihnen gefallen haben</TranslatedText></p>
                        </CardContent>
                    </Link>
                </Card>
                 <Card className="sm:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="h-5 w-5" />
                            <TranslatedText fr="Détails du profil">Profildetails</TranslatedText>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground"><TranslatedText fr="Nom complet">Vollständiger Name</TranslatedText></h3>
                            <p>{user.displayName || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground"><TranslatedText fr="Adresse e-mail">E-Mail-Adresse</TranslatedText></h3>
                            <p>{user.email}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
