import React, { useState } from 'react';
import { User, Phone, Lock, Plus, Trash2, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AvatarSelector } from './AvatarSelector';
import { VerifyPasswordDialog } from './dialogs/VerifyPasswordDialog';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: any) => void;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [formData, setFormData] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      name: userData?.name || '',
      email: userData?.email || '',
      studentId: userData?.studentId || '', // Add student ID
      phones: userData?.phoneNumbers ? 
        [userData.phoneNumbers.primary, userData.phoneNumbers.secondary].filter(Boolean) :
        userData?.phones || [userData?.phoneNumber || ''].filter(Boolean),
      password: '',
      confirmPassword: '',
      avatar: userData?.avatar || '👤',
    };
  });

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!open) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        studentId: userData?.studentId || '', // Reset student ID
        phones: userData?.phoneNumbers ? 
          [userData.phoneNumbers.primary, userData.phoneNumbers.secondary].filter(Boolean) :
          userData?.phones || [userData?.phoneNumber || ''].filter(Boolean),
        password: '',
        confirmPassword: '',
        avatar: userData?.avatar || '👤',
      });
      setIsPasswordVerified(false);
      setShowVerifyDialog(false);
      setShowPassword(false);
    }
  }, [open]);
  const [showPassword, setShowPassword] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const handleAddPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, '']
    }));
  };

  const handleRemovePhone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.map((phone, i) => i === index ? value : phone)
    }));
  };

  const handleSave = () => {
    if (formData.password) {
      if (!isPasswordVerified) {
        setShowVerifyDialog(true);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    }

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Prevent student ID changes if it's already set
    const finalStudentId = currentUser.studentId && currentUser.studentId.trim() !== '' 
      ? currentUser.studentId 
      : formData.studentId;

    const updatedUser = {
      ...currentUser,
      name: formData.name,
      studentId: finalStudentId, // Save student ID (unchangeable once set)
      phoneNumber: formData.phones[0] || '', // Primary phone as main phone
      phoneNumbers: {
        primary: formData.phones[0] || '',
        secondary: formData.phones[1] || ''
      }, // Structured phone numbers
      phones: formData.phones.filter(phone => phone.trim() !== ''), // Keep old format for compatibility
      avatar: formData.avatar,
      ...(formData.password && { password: formData.password }),
    };

    // Also save to persistent storage for logout persistence
    const persistentData = {
      phoneNumber: updatedUser.phoneNumber,
      phoneNumbers: updatedUser.phoneNumbers,
      studentId: updatedUser.studentId,
      name: updatedUser.name,
      avatar: updatedUser.avatar
    };
    localStorage.setItem('persistentProfile', JSON.stringify(persistentData));

    onSave(updatedUser);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold pixel-font text-center">
              ✏️ Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="mb-3">
                <button
                  onClick={() => setShowAvatarSelector(true)}
                  className="w-20 h-20 rounded-full text-4xl hover:scale-110 transition-all border-4 border-primary bg-primary/10"
                >
                  {formData.avatar}
                </button>
              </div>
              <Button
                onClick={() => setShowAvatarSelector(true)}
                className="btn-secondary text-sm px-4 py-2"
              >
                Change Avatar
              </Button>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-cute pl-10"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email</Label>
              <Input
                value={formData.email}
                className="input-cute bg-muted"
                disabled
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            {/* Student ID (readonly once set) */}
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="studentId"
                  value={formData.studentId || ''}
                  onChange={(e) => {
                    // Only allow changes if student ID is not set yet
                    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                    if (!currentUser.studentId || currentUser.studentId.trim() === '') {
                      setFormData(prev => ({ ...prev, studentId: e.target.value }));
                    }
                  }}
                  className={`input-cute pl-10 ${
                    formData.studentId ? 'bg-muted' : ''
                  }`}
                  placeholder={formData.studentId ? '' : "Enter your student ID"}
                  disabled={!!(formData.studentId && formData.studentId.trim() !== '')}
                />
              </div>
              {formData.studentId && formData.studentId.trim() !== '' ? (
                <p className="text-xs text-muted-foreground">🔒 Student ID cannot be changed once set</p>
              ) : (
                <p className="text-xs text-muted-foreground">⚠️ Student ID cannot be changed once saved</p>
              )}
            </div>

            {/* Phone Numbers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Phone Numbers</Label>
                <Button
                  onClick={handleAddPhone}
                  className="btn-secondary text-xs px-3 py-1"
                >
                  <Plus size={14} className="mr-1" />
                  Add
                </Button>
              </div>
              {formData.phones.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className="input-cute pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {formData.phones.length > 1 && (
                    <Button
                      onClick={() => handleRemovePhone(index)}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">New Password (Optional)</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    if (newPassword && !isPasswordVerified) {
                      setShowVerifyDialog(true);
                    }
                    setFormData(prev => ({ ...prev, password: newPassword }));
                  }}
                  className="input-cute pl-10 pr-10"
                  placeholder="Leave blank to keep current"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {formData.password && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="input-cute pl-10"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="btn-primary flex-1">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AvatarSelector
        isOpen={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        currentAvatar={formData.avatar}
        onSelectAvatar={(avatar) => setFormData(prev => ({ ...prev, avatar }))}
      />

      <VerifyPasswordDialog
        open={showVerifyDialog}
        onOpenChange={setShowVerifyDialog}
        onVerify={(verified) => {
          if (verified) {
            setIsPasswordVerified(true);
          } else {
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
          }
        }}
      />
    </>
  );
};