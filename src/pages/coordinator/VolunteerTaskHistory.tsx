import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, User, MapPin, Calendar, Clock, CheckCircle,
  TrendingUp, FileText, Award, Scale
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskLog {
  id: string;
  taskTitle: string;
  location: string;
  date: string;
  collectedWeight: number;
  status: "verified" | "pending" | "rejected";
  debrisType: string;
}

const volunteerData = {
  id: "v1",
  name: "Ahmad R.",
  email: "ahmad@email.com",
  location: "Kuala Terengganu",
  totalVerifiedWeight: 156,
  totalReports: 24,
  aiAccuracy: 92,
  xp: 3200,
  badges: ["First Report", "Plastic Slayer", "Weekend Warrior"],
  joinDate: "March 2024",
};

const taskHistory: TaskLog[] = [
  { id: "1", taskTitle: "Seberang Takir Beach Cleanup", location: "Seberang Takir", date: "Dec 8, 2024", collectedWeight: 23, status: "verified", debrisType: "Plastic" },
  { id: "2", taskTitle: "Batu Buruk Morning Drive", location: "Batu Buruk Beach", date: "Dec 5, 2024", collectedWeight: 18, status: "verified", debrisType: "Mixed" },
  { id: "3", taskTitle: "Marang Beach Initiative", location: "Marang Beach", date: "Dec 1, 2024", collectedWeight: 31, status: "verified", debrisType: "Fishing Gear" },
  { id: "4", taskTitle: "Dungun Coast Cleanup", location: "Dungun Coast", date: "Nov 28, 2024", collectedWeight: 15, status: "verified", debrisType: "Organic" },
  { id: "5", taskTitle: "Kuala Abang Beach", location: "Kuala Abang", date: "Nov 25, 2024", collectedWeight: 28, status: "verified", debrisType: "Plastic" },
  { id: "6", taskTitle: "Seberang Takir Weekend", location: "Seberang Takir", date: "Nov 22, 2024", collectedWeight: 12, status: "pending", debrisType: "Glass" },
];

export default function VolunteerTaskHistory() {
  const { volunteerId } = useParams();
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");

  const filteredHistory = taskHistory.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const totalCollected = taskHistory.reduce((sum, t) => sum + t.collectedWeight, 0);
  const verifiedCount = taskHistory.filter(t => t.status === "verified").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/coordinator/volunteers">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg">Volunteer History</h1>
              <p className="text-xs text-muted-foreground">{volunteerData.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Volunteer Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold">{volunteerData.name}</h2>
                <p className="text-muted-foreground">{volunteerData.email}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{volunteerData.location}</span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>Joined {volunteerData.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 rounded-xl bg-primary/5">
                <Scale className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{volunteerData.totalVerifiedWeight}kg</p>
                <p className="text-xs text-muted-foreground">Verified Weight</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-success/5">
                <FileText className="h-5 w-5 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold">{volunteerData.totalReports}</p>
                <p className="text-xs text-muted-foreground">Total Reports</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-warning/5">
                <TrendingUp className="h-5 w-5 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-bold">{volunteerData.aiAccuracy}%</p>
                <p className="text-xs text-muted-foreground">AI Accuracy</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-accent/5">
                <Award className="h-5 w-5 mx-auto mb-2 text-accent-foreground" />
                <p className="text-2xl font-bold">{volunteerData.xp}</p>
                <p className="text-xs text-muted-foreground">XP Points</p>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Badges Earned</p>
              <div className="flex flex-wrap gap-2">
                {volunteerData.badges.map(badge => (
                  <Badge key={badge} variant="outline" className="px-3 py-1">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Task History
              </CardTitle>
              <div className="flex gap-2">
                {["all", "verified", "pending"].map(f => (
                  <Button
                    key={f}
                    variant={filter === f ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(f as typeof filter)}
                    className="capitalize"
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredHistory.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    task.status === "verified" ? "bg-success/10" : "bg-warning/10"
                  )}>
                    {task.status === "verified" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.taskTitle}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{task.location}</span>
                      <span>•</span>
                      <span>{task.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{task.collectedWeight}kg</p>
                    <Badge variant="outline" className="text-xs">
                      {task.debrisType}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total from {taskHistory.length} tasks</p>
                <p className="text-2xl font-bold">{totalCollected}kg collected</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Verification rate</p>
                <p className="text-2xl font-bold text-success">{Math.round((verifiedCount / taskHistory.length) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}