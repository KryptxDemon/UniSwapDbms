import React from "react";
import { Edit, LogOut, Package, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: "var(--gradient-primary)" }}
            >
              {user.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                {user.name}
              </h2>
              <p className="text-muted-foreground text-lg">{user.email}</p>
              {user.phone && (
                <p className="text-muted-foreground">{user.phone}</p>
              )}
            </div>
            <Button className="btn-secondary px-6 py-3">
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
          <button className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">My Posts</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>

          <button className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                Borrow History
              </span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>

          <button className="w-full card-pixel text-left hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Settings</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="w-full btn-secondary">
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </Layout>
  );
};
