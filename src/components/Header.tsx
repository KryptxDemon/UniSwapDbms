import React from "react";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showNotifications = true,
}) => {
  return (
    <header className="flex items-center justify-between mb-8 bg-card rounded-lg p-6 shadow-sm border">
      <div className="bounce-in">
        <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground font-medium text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {showNotifications && (
        <button className="icon-pixel hover:scale-110 transition-transform p-3 bg-background rounded-lg hover:bg-accent">
          <Bell size={24} />
        </button>
      )}
    </header>
  );
};
