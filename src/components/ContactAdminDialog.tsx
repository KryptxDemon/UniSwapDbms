import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const ContactAdminDialog: React.FC<ContactAdminDialogProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal',
  });

  const handleSend = () => {
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Mock sending message to admin
    console.log('Sending message to admin:', {
      from: user.email,
      ...formData,
      timestamp: new Date().toISOString(),
    });

    alert('Message sent to admin successfully! 📧');
    setFormData({ subject: '', message: '', priority: 'normal' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pixel-font text-center">
            📞 Contact Admin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center p-4 bg-accent/20 rounded-xl">
            <MessageCircle className="mx-auto mb-2 text-accent" size={32} />
            <p className="text-sm text-muted-foreground">
              Need help? Have a question? Our admin team is here to assist you! 💫
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject *</label>
            <Select
              value={formData.subject}
              onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
            >
              <SelectTrigger className="input-cute">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical-issue">🔧 Technical Issue</SelectItem>
                <SelectItem value="account-problem">👤 Account Problem</SelectItem>
                <SelectItem value="report-user">⚠️ Report User</SelectItem>
                <SelectItem value="feature-request">💡 Feature Request</SelectItem>
                <SelectItem value="general-inquiry">❓ General Inquiry</SelectItem>
                <SelectItem value="other">📝 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger className="input-cute">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Low</SelectItem>
                <SelectItem value="normal">🟡 Normal</SelectItem>
                <SelectItem value="high">🟠 High</SelectItem>
                <SelectItem value="urgent">🔴 Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message *</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="input-cute min-h-[120px]"
              placeholder="Please describe your issue or question in detail..."
            />
          </div>

          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="font-medium mb-1">📋 Your Info:</p>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Student ID: {user?.studentId || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSend} className="btn-primary flex-1">
            <Send size={16} className="mr-2" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};