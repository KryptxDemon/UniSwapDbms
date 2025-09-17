import React from "react";
import { MapPin, Clock, DollarSign, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Tuition {
  id: string;
  salary: number;
  daysPerWeek: number;
  class: string;
  subject: string;
  location: string;
  description?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  status: "available" | "taken" | "paused";
}

interface TuitionCardProps {
  tuition: Tuition;
  onMessage: (tuitionId: string) => void;
  onRequest: (tuitionId: string) => void;
}

export const TuitionCard: React.FC<TuitionCardProps> = ({
  tuition,
  onMessage,
  onRequest,
}) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="card-pixel hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-xl bg-gradient-accent flex-shrink-0 flex items-center justify-center">
          <span className="text-3xl">🎓</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-1">
                {tuition.subject}
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

          <div className="flex gap-3">
            <Button
              className="btn-secondary flex-1 max-w-32"
              onClick={() => onMessage(tuition.id)}
            >
              Message
            </Button>
            <Button
              className="btn-primary flex-1 max-w-32"
              onClick={() => onRequest(tuition.id)}
              disabled={tuition.status !== "available"}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
