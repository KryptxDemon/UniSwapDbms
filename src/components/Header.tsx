import React from "react";
import { NotificationBell } from "./NotificationBell";

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
        <NotificationBell />
      )}
    </header>
  );
};
