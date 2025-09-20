import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Clock } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isFromUser: boolean;
}

interface MessageConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: {
    id: number;
    user: {
      name: string;
      avatar: string;
      studentId: string;
    };
    itemType: string;
    itemTitle: string;
  } | null;
}

export const MessageConversationDialog: React.FC<MessageConversationDialogProps> = ({
  open,
  onOpenChange,
  conversation,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!conversation) return [];
    
    // Generate dummy conversation based on the conversation type
    const dummyMessages: { [key: number]: Message[] } = {
      1: [
        { id: 1, text: "Hi! Is the calculus textbook still available?", timestamp: "2:15 PM", isFromUser: false },
        { id: 2, text: "Yes! It's in great condition. Are you interested?", timestamp: "2:16 PM", isFromUser: true },
        { id: 3, text: "Absolutely! How much are you asking for it?", timestamp: "2:17 PM", isFromUser: false },
        { id: 4, text: "I'm asking $80, but I'm flexible. It's the 8th edition with all the solution manuals.", timestamp: "2:18 PM", isFromUser: true },
        { id: 5, text: "That sounds perfect! When can we meet?", timestamp: "2:20 PM", isFromUser: false },
      ],
      2: [
        { id: 1, text: "Hey! Could I get a copy of your chemistry notes?", timestamp: "1:45 PM", isFromUser: false },
        { id: 2, text: "Sure! I have the complete set from Professor Johnson's class.", timestamp: "1:46 PM", isFromUser: true },
        { id: 3, text: "Perfect! Those are exactly what I need for the midterm.", timestamp: "1:47 PM", isFromUser: false },
        { id: 4, text: "I can share them digitally. What's your email?", timestamp: "1:48 PM", isFromUser: true },
        { id: 5, text: "Thanks for the chemistry notes! They were really helpful.", timestamp: "2:30 PM", isFromUser: false },
      ],
      3: [
        { id: 1, text: "Hi! I saw your biology tutoring offer. Are you still available?", timestamp: "12:30 PM", isFromUser: false },
        { id: 2, text: "Yes! I'm free most evenings. What topics do you need help with?", timestamp: "12:31 PM", isFromUser: true },
        { id: 3, text: "I'm struggling with cellular respiration and photosynthesis.", timestamp: "12:32 PM", isFromUser: false },
        { id: 4, text: "Those are my favorite topics! I can definitely help with that.", timestamp: "12:33 PM", isFromUser: true },
        { id: 5, text: "Can we schedule the biology tutoring session for tomorrow?", timestamp: "12:35 PM", isFromUser: false },
      ],
      4: [
        { id: 1, text: "Is the MacBook still available?", timestamp: "10:15 AM", isFromUser: false },
        { id: 2, text: "Yes! It's a 2021 MacBook Pro 13\", barely used.", timestamp: "10:16 AM", isFromUser: true },
        { id: 3, text: "What's the condition like? Any scratches or issues?", timestamp: "10:17 AM", isFromUser: false },
        { id: 4, text: "It's in excellent condition! I have the original box and charger too.", timestamp: "10:18 AM", isFromUser: true },
        { id: 5, text: "The laptop is in great condition! When can I pick it up?", timestamp: "10:20 AM", isFromUser: false },
      ]
    };
    
    return dummyMessages[conversation.id] || [];
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromUser: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Simulate a response after 1 second
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Let me check on that.",
        "Sounds good! I'll get back to you soon.",
        "Perfect! Let me know if you have any other questions.",
        "Great! Looking forward to it.",
        "That works for me! See you then."
      ];
      
      const responseMsg: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromUser: false
      };
      
      setMessages(prev => [...prev, responseMsg]);
    }, 1000);
  };

  if (!conversation) return null;

  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return '📚';
      case 'electronics': return '💻';
      case 'tutoring': return '🎓';
      case 'notes': return '📝';
      default: return '📦';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl border-2 border-primary/20">
              {conversation.user.avatar}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">{conversation.user.name}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded-full text-xs">
                  {conversation.user.studentId}
                </span>
                <span className="flex items-center gap-1">
                  {getItemTypeIcon(conversation.itemType)}
                  {conversation.itemTitle}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.isFromUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center gap-1 mt-1 opacity-70">
                  <Clock size={12} />
                  <span className="text-xs">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-2 p-4 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="sm" className="px-4">
            <Send size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};