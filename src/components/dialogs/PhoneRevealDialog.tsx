import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface PhoneRevealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

export const PhoneRevealDialog: React.FC<PhoneRevealDialogProps> = ({
  isOpen,
  onClose,
  phoneNumber,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-2 border-primary rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel mb-4 flex items-center gap-2">
            <Phone className="h-6 w-6 text-primary animate-bounce" />
            Contact Information
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="flex flex-col items-center gap-4">
            {!isRevealed ? (
              <div className="w-full space-y-4">
                <div className="text-center text-muted-foreground font-pixel">
                  🔒 The phone number is hidden
                </div>
                <Button
                  onClick={handleReveal}
                  className="font-pixel bg-primary text-primary-foreground hover:bg-primary/90 w-full transform transition-transform duration-200 hover:scale-105"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Reveal Phone Number
                </Button>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div className="text-2xl font-pixel text-primary text-center p-4 border-2 border-primary rounded-lg bg-primary/5">
                  {phoneNumber}
                </div>
                <Button
                  onClick={handleCall}
                  className="font-pixel bg-green-500 text-white hover:bg-green-600 w-full transform transition-transform duration-200 hover:scale-105"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="px-4 pb-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-pixel border-2 hover:bg-secondary transform transition-transform duration-200 hover:scale-105"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};