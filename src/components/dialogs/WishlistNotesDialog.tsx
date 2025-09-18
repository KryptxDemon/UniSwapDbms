import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistNotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  onSave: (notes: string) => void;
  existingNotes?: string;
}

export const WishlistNotesDialog: React.FC<WishlistNotesDialogProps> = ({
  isOpen,
  onClose,
  itemTitle,
  onSave,
  existingNotes = '',
}) => {
  const [notes, setNotes] = useState(existingNotes);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(notes);
      toast.success('Added to wishlist', {
        description: 'Your notes have been saved! ✨',
      });
      onClose();
    } catch (error) {
      toast.error('Failed to save notes', {
        description: 'Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-2 border-pink-500 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel mb-2 flex items-center gap-2">
            <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
            Add to Wishlist
          </DialogTitle>
          <DialogDescription className="font-pixel text-sm">
            Save this item to your wishlist and add personal notes! ✨
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-3">
            <p className="text-sm font-pixel flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              {itemTitle}
            </p>
          </div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your personal notes here... (e.g., why you like it, reminders, etc.)"
            className="min-h-[120px] font-pixel border-2 border-pink-500/50 rounded-lg focus:border-pink-500"
          />
          <div className="text-xs text-muted-foreground font-pixel flex items-center gap-2">
            <span>💡</span>
            Your notes will be private and only visible to you
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
            onClick={handleSave}
            className="font-pixel bg-pink-500 text-white hover:bg-pink-600 transform transition-transform duration-200 hover:scale-105"
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">💝</span>
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Save to Wishlist
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};