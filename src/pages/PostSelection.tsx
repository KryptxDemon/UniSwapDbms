import React from 'react';
import { Link } from 'react-router-dom';
import { Package, GraduationCap, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import backpackIcon from '@/assets/icons/backpack-icon.png';
import bookIcon from '@/assets/icons/book-icon.png';

export const PostSelection: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Layout user={user}>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">What would you like to post?</h1>
          <p className="text-muted-foreground font-medium">Choose what you want to share</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link to="/post/item" className="block">
          <div className="card-pixel hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={backpackIcon} 
                  alt="Post Item"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Post an Item</h3>
                <p className="text-muted-foreground">
                  Share textbooks, electronics, supplies, or anything you want to donate, swap, or exchange.
                </p>
              </div>
              <Package size={24} className="text-primary" />
            </div>
          </div>
        </Link>

        <Link to="/post/tuition" className="block">
          <div className="card-pixel hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={bookIcon} 
                  alt="Offer Tutoring"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Offer Tutoring</h3>
                <p className="text-muted-foreground">
                  Share your knowledge and help fellow students while earning some extra income.
                </p>
              </div>
              <GraduationCap size={24} className="text-secondary" />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-muted/50">
        <h4 className="font-semibold text-foreground mb-2">💡 Quick Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Add clear photos for better visibility</li>
          <li>• Write detailed descriptions</li>
          <li>• Be honest about item condition</li>
          <li>• Respond to messages promptly</li>
        </ul>
      </div>
    </Layout>
  );
};