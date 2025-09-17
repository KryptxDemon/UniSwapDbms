import React from "react";
import { MapPin, Clock, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface ItemCardProps {
  item: Item;
  onMessage: (itemId: string) => void;
  onRequest: (itemId: string) => void;
  onWishlist: (itemId: string) => void;
  isWishlisted?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onMessage,
  onRequest,
  onWishlist,
  isWishlisted = false,
}) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const getTypeColor = (type: string) => {
    switch (type) {
      case "donate":
        return "text-accent-foreground bg-accent";
      case "swap":
        return "text-secondary-foreground bg-secondary";
      case "exchange":
        return "text-primary-foreground bg-primary";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "text-green-700 bg-green-100";
      case "good":
        return "text-blue-700 bg-blue-100";
      case "fair":
        return "text-yellow-700 bg-yellow-100";
      case "poor":
        return "text-red-700 bg-red-100";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="card-pixel hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-6">
        <div className="w-32 h-32 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
          {item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
              📦
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {item.name}
            </h3>
            <button
              onClick={() => onWishlist(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                isWishlisted
                  ? "text-destructive bg-destructive/10"
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${getTypeColor(
                item.type
              )}`}
            >
              {item.type}
            </span>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${getConditionColor(
                item.condition
              )}`}
            >
              {item.condition}
            </span>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                item.status === "available"
                  ? "status-available"
                  : item.status === "borrowed"
                  ? "status-borrowed"
                  : "status-unavailable"
              }`}
            >
              {item.status}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.user.avatar || '👤'}</span>
                <span>{item.user.name}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="btn-secondary flex-1 max-w-32"
              onClick={() => onMessage(item.id)}
            >
              Message
            </Button>
            <Button
              className="btn-primary flex-1 max-w-32"
              onClick={() => onRequest(item.id)}
              disabled={item.status !== "available"}
            >
              Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
