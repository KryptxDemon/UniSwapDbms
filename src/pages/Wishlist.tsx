import React from 'react';
import { Heart, Package } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import heartIcon from '@/assets/icons/heart-icon.png';

export const Wishlist: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Layout user={user}>
      <Header title="Wishlist" subtitle="Items you've saved" />
      
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6">
          <img 
            src={heartIcon} 
            alt="Empty Wishlist"
            className="w-full h-full object-contain opacity-50"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-6">
          Start adding items you're interested in to see them here!
        </p>
        <div className="text-sm text-muted-foreground">
          <p>💡 Tip: Tap the heart icon on any item to add it to your wishlist</p>
        </div>
      </div>
    </Layout>
  );
};