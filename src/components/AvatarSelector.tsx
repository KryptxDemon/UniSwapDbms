import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Pixelated avatar options
const AVATARS = {
  girls: [
    '👧🏻', '👧🏼', '👧🏽', '👧🏾', '👧🏿',
    '🧒🏻', '🧒🏼', '🧒🏽', '🧒🏾', '🧒🏿',
    '👩‍🎓', '👩‍💻', '👩‍🔬', '👩‍🎨', '👩‍🏫'
  ],
  boys: [
    '👦🏻', '👦🏼', '👦🏽', '👦🏾', '👦🏿',
    '🧑🏻', '🧑🏼', '🧑🏽', '🧑🏾', '🧑🏿',
    '👨‍🎓', '👨‍💻', '👨‍🔬', '👨‍🎨', '👨‍🏫'
  ]
};

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  onSelectAvatar: (avatar: string) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
}) => {
  const handleSelect = (avatar: string) => {
    onSelectAvatar(avatar);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pixel-font text-center">
            🎨 Choose Your Avatar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3 pixel-font">👧 Girls</h3>
            <div className="grid grid-cols-5 gap-3">
              {AVATARS.girls.map((avatar, index) => (
                <button
                  key={`girl-${index}`}
                  onClick={() => handleSelect(avatar)}
                  className={`w-12 h-12 rounded-xl text-2xl hover:scale-110 transition-all border-2 ${
                    currentAvatar === avatar
                      ? 'border-primary bg-primary/20'
                      : 'border-muted hover:border-accent bg-muted/30'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 pixel-font">👦 Boys</h3>
            <div className="grid grid-cols-5 gap-3">
              {AVATARS.boys.map((avatar, index) => (
                <button
                  key={`boy-${index}`}
                  onClick={() => handleSelect(avatar)}
                  className={`w-12 h-12 rounded-xl text-2xl hover:scale-110 transition-all border-2 ${
                    currentAvatar === avatar
                      ? 'border-primary bg-primary/20'
                      : 'border-muted hover:border-accent bg-muted/30'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};