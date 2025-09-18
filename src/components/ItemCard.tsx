import React from "react";
import { MapPin, Clock, User, Tag, BadgeCheck } from "lucide-react";
import { CardActions } from "./CardActions";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export interface Item {
  id: string;
  name: string;
  description: string;
  type: "donate" | "swap" | "exchange";
  condition: "new" | "good" | "fair" | "poor";
  category: string;
  location: string;
  images: string[];
  status: "available" | "borrowed" | "unavailable";
  phoneNumber: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  wishlistNotes?: string;
}

interface ItemCardProps {
  item: Item;
  onWishlistUpdate?: (itemId: string, notes: string) => void;
}

const getStatusColor = (status: Item['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-500/10 text-green-500 border-green-500/50';
    case 'borrowed':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50';
    case 'unavailable':
      return 'bg-gray-500/10 text-gray-500 border-gray-500/50';
  }
};

const getStatusIcon = (status: Item['status']) => {
  switch (status) {
    case 'available':
      return <BadgeCheck className="h-4 w-4" />;
    case 'borrowed':
      return <Clock className="h-4 w-4" />;
    case 'unavailable':
      return <Clock className="h-4 w-4" />;
  }
};

const getTypeColor = (type: Item['type']) => {
  switch (type) {
    case "donate":
      return "bg-purple-500/10 text-purple-500 border-purple-500/50";
    case "swap":
      return "bg-blue-500/10 text-blue-500 border-blue-500/50";
    case "exchange":
      return "bg-orange-500/10 text-orange-500 border-orange-500/50";
  }
};

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onWishlistUpdate,
}) => {
  return (
    <div className="bg-card rounded-xl border-2 border-border hover:border-primary transition-colors p-6 relative group">
      <div className="flex items-start gap-6">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg">
          {item.images[0] ? (
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl bg-primary/10">
              📦
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={cn(
                    "px-2 py-1 text-xs font-pixel border",
                    getStatusColor(item.status)
                  )}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </Badge>

                <Badge
                  className={cn(
                    "px-2 py-1 text-xs font-pixel border",
                    getTypeColor(item.type)
                  )}
                >
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </Badge>

                <Badge
                  variant="outline"
                  className="font-pixel border border-muted-foreground/20"
                >
                  {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)} Condition
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <div className="text-sm text-muted-foreground font-pixel">
                  Category: {item.category}
                </div>
              </div>
            </div>
          </div>

          {item.description && (
            <p className="text-muted-foreground mt-4 mb-6 text-sm font-pixel leading-relaxed bg-accent/5 rounded-lg p-3 border border-accent/10">
              {item.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground bg-accent/10 rounded-lg p-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-pixel">{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground bg-accent/10 rounded-lg p-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-pixel">Posted {new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-8 h-8 border-2 border-background">
                {item.user.avatar ? (
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm text-muted-foreground font-pixel">
                Posted by {item.user.name}
              </span>
            </div>

            <CardActions
              itemTitle={item.name}
              itemId={item.id}
              phoneNumber={item.phoneNumber}
              posterName={item.user.name}
              existingWishlistNotes={item.wishlistNotes}
              onWishlistSave={(notes) => onWishlistUpdate?.(item.id, notes)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
