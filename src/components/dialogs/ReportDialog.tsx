import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  isOpen,
  onClose,
  itemTitle,
}) => {
  const [reportMessage, setReportMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement report submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Submitting report:', reportMessage);
      toast.success('Report submitted successfully', {
        description: 'We will review your report and take appropriate action.',
      });
      onClose();
    } catch (error) {
      toast.error('Failed to submit report', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-2 border-destructive rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel mb-2 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
            Report Item
          </DialogTitle>
          <DialogDescription className="font-pixel text-sm">
            Help us maintain a safe and friendly community by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm font-pixel flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Reporting: {itemTitle}
            </p>
          </div>
          <Textarea
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
            placeholder="Please describe why you're reporting this item..."
            className="min-h-[120px] font-pixel border-2 border-destructive/50 rounded-lg focus:border-destructive"
          />
          <div className="text-xs text-muted-foreground font-pixel">
            Your report will be reviewed by our team and appropriate action will be taken.
            We appreciate your help in keeping our community safe! 💖
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
            onClick={handleSubmit}
            variant="destructive"
            className="font-pixel transform transition-transform duration-200 hover:scale-105"
            disabled={!reportMessage.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Submit Report
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};