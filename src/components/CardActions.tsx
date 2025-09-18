import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageDialog } from './dialogs/MessageDialog';
import { ReportDialog } from './dialogs/ReportDialog';
import { WishlistNotesDialog } from './dialogs/WishlistNotesDialog';
import { PhoneRevealDialog } from './dialogs/PhoneRevealDialog';
import { Heart, Phone, Share2, AlertTriangle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CardActionsProps {
  itemTitle: string;
  itemId: string;
  phoneNumber: string;
  posterName: string;
  existingWishlistNotes?: string;
  onWishlistSave: (notes: string) => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  itemTitle,
  itemId,
  phoneNumber,
  posterName,
  existingWishlistNotes,
  onWishlistSave,
}) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/item/${itemId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!', {
        className: 'font-pixel',
      });
    } catch (error) {
      toast.error('Failed to copy link', {
        className: 'font-pixel',
      });
    }
  };

  return (
    <>
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPhoneOpen(true)}
          className="rounded-lg border-2 border-primary hover:bg-primary/20"
        >
          <Phone className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleShare}
          className="rounded-lg border-2 border-primary hover:bg-primary/20"
        >
          <Share2 className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsWishlistOpen(true)}
          className="rounded-lg border-2 border-pink-500 hover:bg-pink-500/20"
        >
          <Heart className="h-4 w-4 text-pink-500" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsReportOpen(true)}
          className="rounded-lg border-2 border-destructive hover:bg-destructive/20"
        >
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </Button>

        <Button
          onClick={() => setIsMessageOpen(true)}
          className="ml-auto px-4 font-pixel bg-primary text-primary-foreground hover:bg-primary/90 flex gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Message
        </Button>
      </div>

      <MessageDialog
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        recipientName={posterName}
      />

      <ReportDialog
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        itemTitle={itemTitle}
      />

      <WishlistNotesDialog
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        itemTitle={itemTitle}
        onSave={onWishlistSave}
        existingNotes={existingWishlistNotes}
      />

      <PhoneRevealDialog
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
        phoneNumber={phoneNumber}
      />
    </>
  );
};