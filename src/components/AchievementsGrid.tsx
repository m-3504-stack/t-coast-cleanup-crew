import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Target, Zap, Recycle, Ghost, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: "bronze" | "silver" | "gold";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsGridProps {
  badges: BadgeData[];
}

const tierColors = {
  bronze: "from-amber-600 to-amber-700",
  silver: "from-gray-300 to-gray-400",
  gold: "from-yellow-400 to-amber-500",
};

const tierBorderColors = {
  bronze: "border-amber-600/50",
  silver: "border-gray-400/50",
  gold: "border-yellow-500/50",
};

export function AchievementsGrid({ badges }: AchievementsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <Card
          key={badge.id}
          variant={badge.unlocked ? "elevated" : "outline"}
          className={cn(
            "relative overflow-hidden transition-all",
            badge.unlocked ? tierBorderColors[badge.tier] : "opacity-60"
          )}
        >
          {badge.unlocked && (
            <div className={cn(
              "absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl rounded-bl-full -mr-4 -mt-4",
              tierColors[badge.tier]
            )} />
          )}
          <CardContent className="p-4 text-center">
            <div className={cn(
              "w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 shadow-md",
              badge.unlocked 
                ? `bg-gradient-to-br ${tierColors[badge.tier]} text-white` 
                : "bg-muted text-muted-foreground"
            )}>
              {badge.icon}
            </div>
            <h4 className="font-display font-semibold text-sm mb-1">{badge.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
            {badge.progress !== undefined && badge.maxProgress !== undefined && !badge.unlocked && (
              <div className="space-y-1">
                <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">
                  {badge.progress}/{badge.maxProgress}
                </p>
              </div>
            )}
            {badge.unlocked && (
              <Badge variant={badge.tier === "gold" ? "warning" : badge.tier === "silver" ? "secondary" : "coral"} className="mt-2">
                {badge.tier.charAt(0).toUpperCase() + badge.tier.slice(1)}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const sampleBadges: BadgeData[] = [
  {
    id: "1",
    name: "Plastic Slayer",
    description: "Collect 100kg of plastic",
    icon: <Recycle className="h-6 w-6" />,
    tier: "gold",
    unlocked: true,
  },
  {
    id: "2",
    name: "Ghost Net Buster",
    description: "Report 10 fishing nets",
    icon: <Ghost className="h-6 w-6" />,
    tier: "silver",
    unlocked: true,
  },
  {
    id: "3",
    name: "First Report",
    description: "Submit your first debris report",
    icon: <Award className="h-6 w-6" />,
    tier: "bronze",
    unlocked: true,
  },
  {
    id: "4",
    name: "Century Club",
    description: "Verify 100kg total",
    icon: <Target className="h-6 w-6" />,
    tier: "gold",
    unlocked: false,
    progress: 87,
    maxProgress: 100,
  },
  {
    id: "5",
    name: "Speed Cleaner",
    description: "Complete 5 tasks in one week",
    icon: <Zap className="h-6 w-6" />,
    tier: "silver",
    unlocked: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "6",
    name: "Ocean Champion",
    description: "Reach #1 on leaderboard",
    icon: <Crown className="h-6 w-6" />,
    tier: "gold",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
];
