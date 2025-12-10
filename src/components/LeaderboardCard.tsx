import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  verifiedWeight: number;
  xp: number;
  badges: string[];
  rankChange: number;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  compact?: boolean;
}

export function LeaderboardCard({ entries, currentUserId, compact = false }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-success" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  if (compact) {
    return (
      <Card variant="glass">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Leaderboard
            </CardTitle>
            <Badge variant="ocean" className="text-xs">Top 5</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {entries.slice(0, 5).map((entry) => (
            <div
              key={entry.userId}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                entry.userId === currentUserId && "bg-primary/10 border border-primary/20"
              )}
            >
              <span className="font-display font-bold w-8 text-center">
                {getRankIcon(entry.rank)}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={entry.avatar} />
                <AvatarFallback className="text-xs bg-secondary">
                  {entry.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{entry.username}</p>
              </div>
              <div className="flex items-center gap-1">
                {getRankChangeIcon(entry.rankChange)}
                <span className="text-sm font-semibold">{entry.verifiedWeight}kg</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-warning" />
          Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.userId}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl transition-all",
              entry.userId === currentUserId 
                ? "bg-primary/10 border-2 border-primary/30 shadow-sm" 
                : "bg-muted/50 hover:bg-muted"
            )}
          >
            <span className="font-display font-bold text-2xl w-12 text-center">
              {getRankIcon(entry.rank)}
            </span>
            <Avatar className="h-12 w-12 border-2 border-border">
              <AvatarImage src={entry.avatar} />
              <AvatarFallback className="bg-secondary font-medium">
                {entry.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{entry.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="xp" className="text-xs">{entry.xp} XP</Badge>
                {entry.badges.slice(0, 2).map((badge, i) => (
                  <Badge key={i} variant="glass" className="text-xs">{badge}</Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {getRankChangeIcon(entry.rankChange)}
                <span className={cn(
                  "text-xs",
                  entry.rankChange > 0 && "text-success",
                  entry.rankChange < 0 && "text-destructive"
                )}>
                  {entry.rankChange !== 0 && Math.abs(entry.rankChange)}
                </span>
              </div>
              <p className="font-bold text-lg font-display">{entry.verifiedWeight}kg</p>
              <p className="text-xs text-muted-foreground">verified</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
