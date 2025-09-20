import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Edit,
  Package,
  Heart,
  MessageCircle,
  Phone,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileDialog } from './EditProfileDialog';
import { ContactAdminDialog } from './ContactAdminDialog';

export const StudentProfileDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [showContactAdmin, setShowContactAdmin] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSaveProfile = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* User Info Card */}
            <div className="card-pixel">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl border-4 border-primary bg-primary/10">
                  {user?.avatar || user?.name?.charAt(0) || "👤"}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-1">
                    {user?.name}
                  </h2>
                  <p className="text-muted-foreground text-lg">{user?.email}</p>
                  {user?.phones && user?.phones.length > 0 && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={16} />
                      <span>{user.phones[0]}</span>
                      {user.phones.length > 1 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          +{user.phones.length - 1} more
                        </span>
                      )}
                    </div>
                  )}
                  {user?.studentId && (
                    <p className="text-muted-foreground text-sm">
                      Student ID: {user.studentId}
                    </p>
                  )}
                </div>
                <Button 
                  onClick={() => setShowEditProfile(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  onOpenChange(false);
                  navigate('/my-posts');
                }} 
                className="card-pixel text-center py-6 hover:bg-accent/10 transition-colors"
              >
                <Package className="mx-auto mb-3 text-primary" size={32} />
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-muted-foreground">Posts</p>
              </button>
              <button 
                onClick={() => {
                  onOpenChange(false);
                  navigate('/wishlist');
                }}
                className="card-pixel text-center py-6 hover:bg-accent/10 transition-colors"
              >
                <Heart className="mx-auto mb-3 text-destructive" size={32} />
                <p className="text-3xl font-bold text-foreground">8</p>
                <p className="text-muted-foreground">Wishlisted</p>
              </button>
              <button 
                onClick={() => {
                  onOpenChange(false);
                  navigate('/messages');
                }}
                className="card-pixel text-center py-6 hover:bg-accent/10 transition-colors"
              >
                <MessageCircle className="mx-auto mb-3 text-accent" size={32} />
                <p className="text-3xl font-bold text-foreground">24</p>
                <p className="text-muted-foreground">Messages</p>
              </button>
              <button 
                onClick={() => {
                  onOpenChange(false);
                  navigate('/borrow-history');
                }}
                className="card-pixel text-center py-6 hover:bg-accent/10 transition-colors"
              >
                <Package className="mx-auto mb-3 text-secondary" size={32} />
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-muted-foreground">Borrowed</p>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={() => setShowContactAdmin(true)} 
                className="btn-secondary flex-1"
              >
                <MessageCircle size={18} className="mr-2" />
                Contact Admin
              </Button>
              <Button 
                onClick={handleLogout}
                variant="destructive"
                className="flex-1"
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditProfileDialog
        open={showEditProfile}
        onOpenChange={setShowEditProfile}
        onSave={handleSaveProfile}
      />

      <ContactAdminDialog
        open={showContactAdmin}
        onOpenChange={setShowContactAdmin}
      />
    </>
  );
};