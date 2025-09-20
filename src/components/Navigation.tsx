import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Plus,
  MessageCircle,
  Heart,
  User,
  Shield,
  BookOpen,
} from "lucide-react";
import { StudentProfileDialog } from "./StudentProfileDialog";

interface NavigationProps {
  user?: { role: "student" | "admin" } | null;
}

export const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Plus, label: "Post", path: "/post" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
  ];

  if (user?.role === "admin") {
    navItems.push({ icon: Shield, label: "Admin", path: "/admin" });
  }

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-card border-r-2 border-border z-50 p-6">
      {/* Logo/Brand */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <BookOpen size={32} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">UniSwap</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Student Exchange Platform
        </p>
      </div>

      {/* Navigation Items */}
      <div className="space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
              isActive(path)
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <Icon
              size={24}
              className={`${
                isActive(path) ? "scale-110" : "group-hover:scale-105"
              } transition-transform`}
            />
            <span className="text-base font-medium">{label}</span>
          </Link>
        ))}
      </div>

      {/* User Info */}
      {user && (
        <>
          <div className="absolute bottom-6 left-6 right-6">
            <div 
              className="p-4 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setShowProfile(true)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Student User
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <StudentProfileDialog
            open={showProfile}
            onOpenChange={setShowProfile}
          />
        </>
      )}
    </nav>
  );
};
