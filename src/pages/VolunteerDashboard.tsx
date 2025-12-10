import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsDisplay } from "@/components/StatsDisplay";
import { TaskCard } from "@/components/TaskCard";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { AnimatedWaves } from "@/components/WaveBackground";
import { 
  Camera, Bell, User, Plus, WifiOff, MapPin, 
  ChevronRight, ClipboardList, Trophy
} from "lucide-react";

// Demo data
const currentUser = {
  id: "user1",
  name: "Ahmad",
  streak: 7,
  xp: 1250,
  rank: 12,
};

const tasks = [
  {
    id: "1",
    title: "Seberang Takir Beach Cleanup",
    location: "Seberang Takir, Kuala Terengganu",
    date: "Dec 10, 2024",
    time: "8:00 AM",
    debrisType: "plastic",
    daysUntil: 0,
    status: "pending" as const,
    distance: "2.3 km",
  },
  {
    id: "2",
    title: "Batu Buruk Cleanup Drive",
    location: "Batu Buruk Beach",
    date: "Dec 12, 2024",
    time: "7:30 AM",
    debrisType: "mixed",
    daysUntil: 2,
    status: "pending" as const,
    distance: "5.1 km",
  },
];

const leaderboardData = [
  { rank: 1, userId: "u1", username: "Fatimah Z.", verifiedWeight: 234, xp: 4520, badges: ["Ocean Champion", "Plastic Slayer"], rankChange: 0 },
  { rank: 2, userId: "u2", username: "Razak M.", verifiedWeight: 198, xp: 3890, badges: ["Ghost Net Buster"], rankChange: 2 },
  { rank: 3, userId: "u3", username: "Siti N.", verifiedWeight: 187, xp: 3650, badges: ["Speed Cleaner"], rankChange: -1 },
  { rank: 4, userId: "u4", username: "Hafiz A.", verifiedWeight: 156, xp: 3200, badges: ["First Report"], rankChange: 1 },
  { rank: 5, userId: "u5", username: "Nurul H.", verifiedWeight: 142, xp: 2980, badges: [], rankChange: -2 },
];

export default function VolunteerDashboard() {
  const [isOffline] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/volunteer/notifications">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/volunteer/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-warning/20 border-b border-warning/30 py-2 px-4">
          <div className="container max-w-lg mx-auto flex items-center gap-2 text-sm">
            <WifiOff className="h-4 w-4 text-warning" />
            <span>3 reports pending sync</span>
          </div>
        </div>
      )}

      <main className="container max-w-lg mx-auto px-4 py-6 pb-32 space-y-6">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl gradient-ocean p-6 text-primary-foreground">
          <div className="relative z-10">
            <p className="text-primary-foreground/80 text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl font-display font-bold mb-4">{currentUser.name}! 👋</h1>
            <StatsDisplay 
              streak={currentUser.streak} 
              xp={currentUser.xp} 
              rank={currentUser.rank}
            />
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary-foreground/10" />
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary-foreground/5" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Link to="/volunteer/report">
            <Card variant="interactive" className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl gradient-ocean flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">Report</span>
            </Card>
          </Link>
          <Link to="/volunteer/tasks">
            <Card variant="interactive" className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-accent flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium">Tasks</span>
            </Card>
          </Link>
          <Link to="/volunteer/leaderboard">
            <Card variant="interactive" className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-warning flex items-center justify-center">
                <Trophy className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-sm font-medium">Rank</span>
            </Card>
          </Link>
        </div>

        {/* My Assigned Tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              My Assigned Tasks
            </h2>
            <Link to="/volunteer/tasks" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Leaderboard</h2>
            <Link to="/volunteer/leaderboard" className="text-sm text-primary flex items-center gap-1 hover:underline">
              Full board <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <LeaderboardCard entries={leaderboardData} currentUserId="user1" compact />
        </section>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Button variant="fab" size="fab" asChild>
          <Link to="/volunteer/report">
            <Plus className="h-7 w-7" />
          </Link>
        </Button>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Start Debris Report
        </span>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-40">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <Link to="/volunteer" className="flex flex-col items-center gap-1 text-primary">
              <MapPin className="h-5 w-5" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link to="/volunteer/tasks" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <ClipboardList className="h-5 w-5" />
              <span className="text-xs">Tasks</span>
            </Link>
            <div className="w-16" /> {/* Spacer for FAB */}
            <Link to="/volunteer/leaderboard" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Rank</span>
            </Link>
            <Link to="/volunteer/profile" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
