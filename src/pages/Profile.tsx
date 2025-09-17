import React from "react";
import { Edit, LogOut, Package, Heart, MessageCircle, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { ContactAdminDialog } from "@/components/ContactAdminDialog";

export const Profile: React.FC = () => {
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

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout user={user}>
      <Header
        title="Profile"
        subtitle="Manage your account"
        showNotifications={false}
      />

      <div className="space-y-6">
        {/* User Info Card */}
        <div className="card-pixel">
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl border-4 border-primary bg-primary/10"
            >
              {user.avatar || user.name?.charAt(0) || "👤"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                {user.name}
              </h2>
              <p className="text-muted-foreground text-lg">{user.email}</p>
              {user.phones && user.phones.length > 0 && (
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
              {user.studentId && (
                <p className="text-muted-foreground text-sm">
                  Student ID: {user.studentId}
                </p>
              )}
            </div>
            <Button 
              onClick={() => setShowEditProfile(true)}
              className="btn-secondary px-6 py-3"
            >
              <Edit size={18} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="card-pixel text-center py-8">
            <Package className="mx-auto mb-3 text-primary" size={32} />
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-muted-foreground">Posts</p>
          </div>
          <div className="card-pixel text-center py-8">
            <Heart className="mx-auto mb-3 text-destructive" size={32} />
            <p className="text-3xl font-bold text-foreground">8</p>
            <p className="text-muted-foreground">Wishlisted</p>
          </div>
          <div className="card-pixel text-center py-8">
            <MessageCircle className="mx-auto mb-3 text-accent" size={32} />
            <p className="text-3xl font-bold text-foreground">24</p>
            <p className="text-muted-foreground">Messages</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-2">
          <Link to="/my-posts" className="block">
            <div className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">My Posts</span>
                <span className="text-muted-foreground">→</span>
              </div>
            </div>
          </Link>

          <Link to="/borrow-history" className="block">
            <div className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">
                  Borrow History
                </span>
                <span className="text-muted-foreground">→</span>
              </div>
            </div>
          </Link>

          <button className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Settings</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
        </div>

        {/* Contact Admin Button */}
        <Button 
          onClick={() => setShowContactAdmin(true)}
          className="w-full btn-accent"
        >
          <Phone size={18} className="mr-2" />
          Contact Admin
        </Button>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="w-full btn-secondary">
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>

      <EditProfileDialog
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={user}
        onSave={handleSaveProfile}
      />

      <ContactAdminDialog
        isOpen={showContactAdmin}
        onClose={() => setShowContactAdmin(false)}
        user={user}
      />
    </Layout>
  );
};
