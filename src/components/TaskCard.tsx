import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ChevronRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  debrisType: string;
  daysUntil: number;
  status: "pending" | "in-progress" | "completed";
  distance?: string;
  onClick?: () => void;
}

const debrisColors: Record<string, string> = {
  plastic: "border-l-blue-500",
  metal: "border-l-gray-500",
  glass: "border-l-green-500",
  organic: "border-l-amber-600",
  mixed: "border-l-purple-500",
};

export function TaskCard({
  title,
  location,
  date,
  time,
  debrisType,
  daysUntil,
  status,
  distance,
  onClick,
}: TaskCardProps) {
  const getDaysLabel = () => {
    if (daysUntil === 0) return { text: "Today!", className: "bg-destructive text-destructive-foreground" };
    if (daysUntil === 1) return { text: "Tomorrow", className: "bg-warning text-foreground" };
    return { text: `In ${daysUntil} days`, className: "bg-muted text-muted-foreground" };
  };

  const daysLabel = getDaysLabel();

  return (
    <Card
      variant="interactive"
      className={cn(
        "border-l-4 overflow-hidden",
        debrisColors[debrisType.toLowerCase()] || "border-l-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={daysLabel.className}>
                {daysLabel.text}
              </Badge>
              {status === "completed" && (
                <Badge variant="success">Completed</Badge>
              )}
            </div>
            
            <h3 className="font-display font-semibold text-lg mb-2 truncate">{title}</h3>
            
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="truncate">{location}</span>
                {distance && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    {distance}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="capitalize">{debrisType} debris</span>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="flex-shrink-0 mt-6">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
