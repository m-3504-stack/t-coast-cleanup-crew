import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Trophy, Gift, Mail, TrendingUp, TrendingDown,
  Minus, Medal, Crown, Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  email: string;
  verifiedWeight: number;
  xp: number;
  aiAccuracy: number;
  badges: string[];
  rankChange: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, id: "v1", name: "Fatimah Z.", email: "fatimah@email.com", verifiedWeight: 234, xp: 4520, aiAccuracy: 88, badges: ["Ocean Champion", "Plastic Slayer", "100kg Club"], rankChange: 0 },
  { rank: 2, id: "v2", name: "Razak M.", email: "razak@email.com", verifiedWeight: 198, xp: 3890, aiAccuracy: 85, badges: ["Ghost Net Buster", "Early Bird"], rankChange: 2 },
  { rank: 3, id: "v3", name: "Siti N.", email: "siti@email.com", verifiedWeight: 187, xp: 3650, aiAccuracy: 91, badges: ["Speed Cleaner", "AI Master"], rankChange: -1 },
  { rank: 4, id: "v4", name: "Ahmad R.", email: "ahmad@email.com", verifiedWeight: 156, xp: 3200, aiAccuracy: 92, badges: ["First Report"], rankChange: 1 },
  { rank: 5, id: "v5", name: "Nurul H.", email: "nurul@email.com", verifiedWeight: 142, xp: 2980, aiAccuracy: 89, badges: ["Consistent Volunteer"], rankChange: -2 },
  { rank: 6, id: "v6", name: "Hafiz A.", email: "hafiz@email.com", verifiedWeight: 128, xp: 2650, aiAccuracy: 76, badges: [], rankChange: 0 },
  { rank: 7, id: "v7", name: "Aishah K.", email: "aishah@email.com", verifiedWeight: 115, xp: 2400, aiAccuracy: 82, badges: ["Weekend Warrior"], rankChange: 3 },
  { rank: 8, id: "v8", name: "Ismail B.", email: "ismail@email.com", verifiedWeight: 98, xp: 2100, aiAccuracy: 79, badges: [], rankChange: -1 },
  { rank: 9, id: "v9", name: "Zainab M.", email: "zainab@email.com", verifiedWeight: 87, xp: 1850, aiAccuracy: 84, badges: [], rankChange: 0 },
  { rank: 10, id: "v10", name: "Hassan T.", email: "hassan@email.com", verifiedWeight: 76, xp: 1650, aiAccuracy: 81, badges: [], rankChange: 2 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2: return <Medal className="h-5 w-5 text-gray-400" />;
    case 3: return <Award className="h-5 w-5 text-amber-600" />;
    default: return null;
  }
};

export default function CoordinatorLeaderboard() {
  const [showRewardModal, setShowRewardModal] = useState<string | null>(null);
  const [rewardMessage, setRewardMessage] = useState("");
  const { toast } = useToast();

  const handleSendReward = (id: string) => {
    toast({ 
      title: "Reward sent!", 
      description: "Volunteer will receive notification and e-voucher" 
    });
    setShowRewardModal(null);
    setRewardMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/coordinator">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg">Volunteer Leaderboard</h1>
              <p className="text-xs text-muted-foreground">Top performers this month</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <Card className="pt-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400" />
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                <Medal className="h-8 w-8 text-gray-400" />
              </div>
              <Badge className="mb-2">2nd</Badge>
              <p className="font-semibold">{leaderboardData[1].name}</p>
              <p className="text-2xl font-bold text-primary mt-2">{leaderboardData[1].verifiedWeight}kg</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setShowRewardModal(leaderboardData[1].id)}
              >
                <Gift className="h-4 w-4 mr-1" />
                Reward
              </Button>
            </CardContent>
          </Card>

          {/* 1st Place */}
          <Card className="pt-4 text-center relative overflow-hidden border-yellow-500 shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
            <CardContent>
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-yellow-50 flex items-center justify-center">
                <Crown className="h-10 w-10 text-yellow-500" />
              </div>
              <Badge className="mb-2 bg-yellow-500">1st</Badge>
              <p className="font-bold text-lg">{leaderboardData[0].name}</p>
              <p className="text-3xl font-bold text-primary mt-2">{leaderboardData[0].verifiedWeight}kg</p>
              <p className="text-sm text-muted-foreground">{leaderboardData[0].xp} XP</p>
              <Button 
                size="sm" 
                className="mt-3"
                onClick={() => setShowRewardModal(leaderboardData[0].id)}
              >
                <Gift className="h-4 w-4 mr-1" />
                Reward
              </Button>
            </CardContent>
          </Card>

          {/* 3rd Place */}
          <Card className="pt-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600" />
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-50 flex items-center justify-center">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <Badge className="mb-2 bg-amber-600">3rd</Badge>
              <p className="font-semibold">{leaderboardData[2].name}</p>
              <p className="text-2xl font-bold text-primary mt-2">{leaderboardData[2].verifiedWeight}kg</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setShowRewardModal(leaderboardData[2].id)}
              >
                <Gift className="h-4 w-4 mr-1" />
                Reward
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-16">Rank</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Volunteer</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Weight</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">XP</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Accuracy</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Badges</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboardData.map(entry => (
                  <tr key={entry.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank) || <span className="font-bold">#{entry.rank}</span>}
                        {entry.rankChange !== 0 && (
                          <span className={cn(
                            "flex items-center text-xs",
                            entry.rankChange > 0 ? "text-success" : "text-destructive"
                          )}>
                            {entry.rankChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {Math.abs(entry.rankChange)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.email}</p>
                    </td>
                    <td className="p-4 font-bold">{entry.verifiedWeight}kg</td>
                    <td className="p-4">{entry.xp.toLocaleString()}</td>
                    <td className="p-4">{entry.aiAccuracy}%</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.badges.slice(0, 2).map(badge => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                        {entry.badges.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.badges.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {entry.rank <= 10 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowRewardModal(entry.id)}
                        >
                          <Gift className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Reward Modal */}
        {showRewardModal && (
          <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Send Reward
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Send an e-voucher and personalized message to this top performer.
                </p>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Personal Message</label>
                  <Input
                    placeholder="Congratulations on your amazing contribution..."
                    value={rewardMessage}
                    onChange={(e) => setRewardMessage(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowRewardModal(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={() => handleSendReward(showRewardModal)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reward
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
