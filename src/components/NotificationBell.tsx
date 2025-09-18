import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationPopup } from './NotificationPopup';

export const NotificationBell: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notifications] = useState<any[]>([]); // You can replace this with actual notifications data

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsPopupOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </Button>

      <NotificationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => {
          // Implement mark as read functionality
          console.log('Marking notification as read:', id);
        }}
        onMarkAllAsRead={() => {
          // Implement mark all as read functionality
          console.log('Marking all notifications as read');
        }}
      />
    </>
  );
};