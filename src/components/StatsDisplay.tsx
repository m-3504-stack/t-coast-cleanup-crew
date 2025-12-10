import { Flame, Trophy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatsDisplayProps {
  streak: number;
  xp: number;
  rank?: number;
  compact?: boolean;
}

export function StatsDisplay({ streak, xp, rank, compact = false }: StatsDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="streak" className="gap-1">
          <Flame className="h-3 w-3" />
          {streak}
        </Badge>
        <Badge variant="xp" className="gap-1">
          <Star className="h-3 w-3" />
          {xp} XP
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/20 border border-accent/30">
        <div className="p-1.5 rounded-lg bg-accent text-accent-foreground">
          <Flame className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="font-bold font-display">{streak} days</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/20 border border-warning/30">
        <div className="p-1.5 rounded-lg bg-warning text-foreground">
          <Star className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">XP Points</p>
          <p className="font-bold font-display">{xp.toLocaleString()}</p>
        </div>
      </div>

      {rank && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Rank</p>
            <p className="font-bold font-display">#{rank}</p>
          </div>
        </div>
      )}
    </div>
  );
}
