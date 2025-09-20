import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';

interface VerifyPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (verified: boolean) => void;
}

export const VerifyPasswordDialog: React.FC<VerifyPasswordDialogProps> = ({
  open,
  onOpenChange,
  onVerify,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user is currently signed in');
      }

      // Create credential with current email and password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      );

      // Attempt to reauthenticate
      await reauthenticateWithCredential(currentUser, credential);
      
      // If we get here, the password was correct
      onVerify(true);
      onOpenChange(false);
      
    } catch (error: any) {
      console.error('Verification error:', error);
      setError('Incorrect password. Please try again.');
      onVerify(false);
      
      if (error.code === 'auth/too-many-requests') {
        toast({
          variant: "destructive",
          title: "Too Many Attempts",
          description: "Please wait a few minutes before trying again."
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            🔐 Verify Password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="old-password">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="old-password"
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="input-cute pl-10 pr-10"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setError('');
              onOpenChange(false);
            }}
            disabled={isVerifying}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};