import React, { useState } from 'react';
import { User, Phone, Lock, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AvatarSelector } from './AvatarSelector';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (updatedUser: any) => void;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phones: user?.phones || [user?.phone || ''].filter(Boolean),
    password: '',
    confirmPassword: '',
    avatar: user?.avatar || '👤',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

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
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      phones: formData.phones.filter(phone => phone.trim() !== ''),
      avatar: formData.avatar,
      ...(formData.password && { password: formData.password }),
    };

    onSave(updatedUser);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
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
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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
            <Button onClick={onClose} variant="outline" className="flex-1">
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
    </>
  );
};