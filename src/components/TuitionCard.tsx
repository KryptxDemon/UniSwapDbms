import React from "react";
import { MapPin, Clock, DollarSign, Calendar, User, BookOpen, BadgeCheck } from "lucide-react";
import { CardActions } from "./CardActions";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export interface Tuition {
  id: string;
  salary: number;
  daysPerWeek: number;
  class: string;
  subject: string;
  location: string;
  description?: string;
  phoneNumber: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  status: "available" | "taken" | "paused";
  wishlistNotes?: string;
}

interface TuitionCardProps {
  tuition: Tuition;
  onWishlistUpdate?: (tuitionId: string, notes: string) => void;
}

const getStatusColor = (status: Tuition['status']) => {
  switch (status) {
    case 'available':
      return 'bg-green-500/10 text-green-500 border-green-500/50';
    case 'taken':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50';
    case 'paused':
      return 'bg-gray-500/10 text-gray-500 border-gray-500/50';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/50';
  }
};

const getStatusIcon = (status: Tuition['status']) => {
  switch (status) {
    case 'available':
      return <BadgeCheck className="h-4 w-4" />;
    case 'taken':
      return <Clock className="h-4 w-4" />;
    case 'paused':
      return <Clock className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export const TuitionCard: React.FC<TuitionCardProps> = ({
  tuition,
  onWishlistUpdate,
}) => {
  return (
    <div className="card-pixel hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-xl bg-gradient-accent flex-shrink-0 flex items-center justify-center">
          <span className="text-3xl">🎓</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={cn(
                    "px-2 py-1 text-xs font-pixel border",
                    getStatusColor(tuition.status)
                  )}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(tuition.status)}
                    {tuition.status.charAt(0).toUpperCase() + tuition.status.slice(1)}
                  </span>
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-1 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {tuition.subject}
                <span className="text-sm text-muted-foreground font-pixel">
                  (Class {tuition.class})
                </span>
              </h3>
              <p className="text-muted-foreground">Teaching {tuition.class}</p>
            </div>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                tuition.status === "available"
                  ? "status-available"
                  : tuition.status === "taken"
                  ? "status-borrowed"
                  : "status-unavailable"
              }`}
            >
              {tuition.status}
            </span>
          </div>

          {tuition.description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {tuition.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign size={16} />
              <span className="font-medium">${tuition.salary}/hr</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={16} />
              <span>{tuition.daysPerWeek}x/week</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} />
              <span>{tuition.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={16} />
              <div className="flex items-center gap-2">
                <span className="text-lg">{tuition.user.avatar || '👤'}</span>
                <span>{tuition.user.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock size={16} />
            <span>
              Posted {new Date(tuition.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-4">
            <CardActions
              itemTitle={tuition.subject}
              itemId={tuition.id}
              phoneNumber={tuition.phoneNumber}
              posterName={tuition.user.name}
              existingWishlistNotes={tuition.wishlistNotes}
              onWishlistSave={(notes) => onWishlistUpdate?.(tuition.id, notes)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
