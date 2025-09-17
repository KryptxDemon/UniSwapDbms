import React from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';

export const Messages: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Layout user={user}>
      <Header title="Messages" subtitle="Your conversations" />
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search conversations..."
          className="input-cute pl-10"
        />
      </div>

      <div className="text-center py-12">
        <MessageCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
        <h3 className="text-xl font-semibold text-foreground mb-2">No messages yet</h3>
        <p className="text-muted-foreground mb-6">
          Start a conversation by messaging someone about their items or tutoring!
        </p>
        <div className="text-sm text-muted-foreground">
          <p>💬 Messages will appear here when you contact other users</p>
        </div>
      </div>
    </Layout>
  );
};