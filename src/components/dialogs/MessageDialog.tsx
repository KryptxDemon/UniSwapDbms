import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

export const MessageDialog: React.FC<MessageDialogProps> = ({
  isOpen,
  onClose,
  recipientName,
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    setIsSending(true);
    try {
      // TODO: Implement message sending logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Sending message:', message);
      toast.success('Message sent!', {
        description: `Your message has been sent to ${recipientName}`,
      });
      onClose();
      navigate('/messages'); // Redirect to messages page
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-2 border-primary rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel mb-2 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary animate-pulse" />
            Message
          </DialogTitle>
          <DialogDescription className="font-pixel text-sm">
            Send a message to {recipientName} about their listing! ✉️
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm font-pixel flex items-center gap-2">
              <span>👋</span>
              Chatting with: {recipientName}
            </p>
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here... Be friendly and clear about what you want to know!"
            className="min-h-[120px] font-pixel border-2 border-primary/50 rounded-lg focus:border-primary"
          />
          <div className="text-xs text-muted-foreground font-pixel flex items-center gap-2">
            <span>💡</span>
            After sending, you'll be taken to the messages page to continue your conversation
          </div>
        </div>
        <DialogFooter className="px-4 pb-4 space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-pixel border-2 hover:bg-secondary transform transition-transform duration-200 hover:scale-105"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            className="font-pixel bg-primary text-primary-foreground hover:bg-primary/90 transform transition-transform duration-200 hover:scale-105"
            disabled={!message.trim() || isSending}
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">📨</span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <SendHorizontal className="h-4 w-4" />
                Send Message
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};