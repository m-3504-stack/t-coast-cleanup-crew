import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Check, Clock, TrendingUp, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedWaves } from "@/components/WaveBackground";
import { useToast } from "@/hooks/use-toast";

interface CompletedTask {
  id: string;
  scheduleName: string;
  location: string;
  completedAt: string;
  collectedWeight: number;
  verifiedWeight: number;
  status: "verified" | "pending" | "rejected";
  debrisType: string;
  photos: number;
}

const TaskHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("completed");

  // Mock data
  const completedTasks: CompletedTask[] = [
    {
      id: "1",
      scheduleName: "Pantai Cenang Cleanup",
      location: "Pantai Cenang, Langkawi",
      completedAt: "2024-01-15T14:30:00",
      collectedWeight: 25,
      verifiedWeight: 24,
      status: "verified",
      debrisType: "Plastic",
      photos: 4,
    },
    {
      id: "2",
      scheduleName: "Tanjung Rhu Morning",
      location: "Tanjung Rhu, Langkawi",
      completedAt: "2024-01-12T11:00:00",
      collectedWeight: 18,
      verifiedWeight: 18,
      status: "verified",
      debrisType: "Mixed",
      photos: 3,
    },
    {
      id: "3",
      scheduleName: "Teluk Datai Sweep",
      location: "Teluk Datai, Langkawi",
      completedAt: "2024-01-10T09:30:00",
      collectedWeight: 32,
      verifiedWeight: 0,
      status: "pending",
      debrisType: "Fishing Gear",
      photos: 5,
    },
    {
      id: "4",
      scheduleName: "Pantai Kok Weekend",
      location: "Pantai Kok, Langkawi",
      completedAt: "2024-01-08T16:00:00",
      collectedWeight: 15,
      verifiedWeight: 14,
      status: "verified",
      debrisType: "Glass",
      photos: 2,
    },
  ];

  // Impact stats
  const impactStats = {
    totalVerifiedWeight: 87,
    totalReports: 12,
    nextBadgeWeight: 100,
    aiAccuracyScore: 82,
    completedTasks: 15,
    pendingVerification: 2,
  };

  const progressToNextBadge = (impactStats.totalVerifiedWeight / impactStats.nextBadgeWeight) * 100;

  const handleShare = () => {
    toast({
      title: "Impact Card Ready!",
      description: "Your impact card is ready to share on social media.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="success">Verified</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedWaves />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-ocean-deep/95 backdrop-blur-sm text-white p-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/volunteer")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-heading font-bold">Task History</h1>
              <p className="text-sm text-white/70">Your cleanup journey</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-8 space-y-4">
          {/* Impact Summary */}
          <Card className="glass-card overflow-hidden">
            <div className="bg-gradient-to-r from-ocean-deep to-ocean-medium p-4 text-white">
              <h2 className="font-heading font-bold text-lg mb-1">Your Impact</h2>
              <p className="text-white/70 text-sm">Making our oceans cleaner, one cleanup at a time</p>
            </div>
            <CardContent className="p-4">
              {/* Main Stat with Progress Ring */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${progressToNextBadge * 3.52} 352`}
                      className="text-ocean-medium transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{impactStats.totalVerifiedWeight}</span>
                    <span className="text-sm text-muted-foreground">kg verified</span>
                  </div>
                </div>
              </div>

              {/* Progress to next badge */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress to 100kg Badge</span>
                  <span className="font-medium">{Math.round(progressToNextBadge)}%</span>
                </div>
                <Progress value={progressToNextBadge} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {impactStats.nextBadgeWeight - impactStats.totalVerifiedWeight} kg more to unlock 🏅 Centurion Badge
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.completedTasks}</p>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.totalReports}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.aiAccuracyScore}%</p>
                  <p className="text-xs text-muted-foreground">AI Accuracy</p>
                </div>
              </div>

              {/* Share Button */}
              <Button 
                variant="ocean" 
                className="w-full mt-4"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Impact Card
              </Button>
            </CardContent>
          </Card>

          {/* Tasks Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({impactStats.pendingVerification})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="completed" className="space-y-3 mt-4">
              {completedTasks.filter(t => t.status === "verified").map((task) => (
                <Card key={task.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{task.scheduleName}</h3>
                        <p className="text-sm text-muted-foreground">{task.location}</p>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(task.completedAt).toLocaleDateString('en-MY', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <Badge variant="debris">{task.debrisType}</Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Collected</p>
                        <p className="font-bold">{task.collectedWeight} kg</p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Verified</p>
                        <p className="font-bold text-green-600">{task.verifiedWeight} kg</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {completedTasks.filter(t => t.status === "pending").map((task) => (
                <Card key={task.id} className="glass-card border-l-4 border-l-amber-400">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{task.scheduleName}</h3>
                        <p className="text-sm text-muted-foreground">{task.location}</p>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(task.completedAt).toLocaleDateString('en-MY', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <Badge variant="debris">{task.debrisType}</Badge>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Submitted: <span className="font-medium">{task.collectedWeight} kg</span>
                      </p>
                      <p className="text-xs text-amber-600 mt-1">Awaiting coordinator verification</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {completedTasks.filter(t => t.status === "pending").length === 0 && (
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <Check className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">No pending verifications</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TaskHistory;
