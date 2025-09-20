import React, { useState } from 'react';
import { MessageCircle, Search, Clock, User } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageConversationDialog } from '@/components/dialogs/MessageConversationDialog';

// Dummy messages data
const dummyMessages = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: '👩‍🎓',
      studentId: 'CS2024001'
    },
    lastMessage: 'Hi! Is the calculus textbook still available?',
    timestamp: '2 minutes ago',
    unreadCount: 2,
    isRead: false,
    itemType: 'book',
    itemTitle: 'Calculus: Early Transcendentals'
  },
  {
    id: 2,
    user: {
      name: 'Mike Chen',
      avatar: '👨‍💻',
      studentId: 'EE2023045'
    },
    lastMessage: 'Thanks for the chemistry notes! They were really helpful.',
    timestamp: '15 minutes ago',
    unreadCount: 0,
    isRead: true,
    itemType: 'notes',
    itemTitle: 'Organic Chemistry Lab Notes'
  },
  {
    id: 3,
    user: {
      name: 'Emily Rodriguez',
      avatar: '👩‍🔬',
      studentId: 'BIO2024012'
    },
    lastMessage: 'Can we schedule the biology tutoring session for tomorrow?',
    timestamp: '1 hour ago',
    unreadCount: 1,
    isRead: false,
    itemType: 'tutoring',
    itemTitle: 'Biology Tutoring Session'
  },
  {
    id: 4,
    user: {
      name: 'Alex Thompson',
      avatar: '👨‍🎓',
      studentId: 'CS2023089'
    },
    lastMessage: 'The laptop is in great condition! When can I pick it up?',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isRead: true,
    itemType: 'electronics',
    itemTitle: 'MacBook Pro 13" (2021)'
  },
  {
    id: 5,
    user: {
      name: 'Jessica Wang',
      avatar: '👩‍💼',
      studentId: 'MBA2024007'
    },
    lastMessage: 'Could you help me with statistics? I really need help with regression analysis.',
    timestamp: '1 day ago',
    unreadCount: 0,
    isRead: true,
    itemType: 'tutoring',
    itemTitle: 'Statistics Help Request'
  },
  {
    id: 6,
    user: {
      name: 'David Park',
      avatar: '👨‍🏫',
      studentId: 'PHYS2023156'
    },
    lastMessage: 'The physics textbook exchange went smoothly. Thank you!',
    timestamp: '2 days ago',
    unreadCount: 0,
    isRead: true,
    itemType: 'book',
    itemTitle: 'University Physics 14th Edition'
  },
  {
    id: 7,
    user: {
      name: 'Maria Gonzalez',
      avatar: '👩‍🎨',
      studentId: 'ART2024033'
    },
    lastMessage: 'Are you still offering graphic design tutoring?',
    timestamp: '3 days ago',
    unreadCount: 0,
    isRead: true,
    itemType: 'tutoring',
    itemTitle: 'Graphic Design Tutoring'
  }
];

export const Messages: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showConversation, setShowConversation] = useState(false);
  
  // Filter messages based on search term
  const filteredMessages = dummyMessages.filter(message =>
    message.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return '📚';
      case 'electronics': return '💻';
      case 'tutoring': return '🎓';
      case 'notes': return '📝';
      default: return '📦';
    }
  };

  const handleMessageClick = (message: any) => {
    setSelectedConversation(message);
    setShowConversation(true);
  };

  return (
    <Layout user={user}>
      <Header title="Messages" subtitle={`${filteredMessages.length} conversations`} />
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search conversations..."
          className="input-cute pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Messages List */}
      {filteredMessages.length > 0 ? (
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md hover:bg-accent/5 ${
                !message.isRead ? 'bg-primary/5 border-primary/20' : ''
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-primary/20">
                  {message.user.avatar}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${!message.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {message.user.name}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {message.user.studentId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {message.unreadCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {message.unreadCount}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  {/* Item Type and Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{getItemTypeIcon(message.itemType)}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {message.itemTitle}
                    </span>
                  </div>

                  {/* Last Message */}
                  <p className={`text-sm truncate ${!message.isRead ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {message.lastMessage}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {searchTerm ? 'No messages found' : 'No messages yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Start a conversation by messaging someone about their items or tutoring!'
            }
          </p>
        </div>
      )}
      
      {/* Message Conversation Dialog */}
      <MessageConversationDialog
        open={showConversation}
        onOpenChange={setShowConversation}
        conversation={selectedConversation}
      />
    </Layout>
  );
};