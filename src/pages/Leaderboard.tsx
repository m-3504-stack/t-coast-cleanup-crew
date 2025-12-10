import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Minus, Users, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedWaves } from "@/components/WaveBackground";

interface LeaderboardEntry {
  rank: number;
  odlRank: number;
  odlRankChange: number;
  odlUsername: string;
  odlTotalVerifiedWeight: number;
  odlAiAccuracyScore: number;
  odlBadges: string[];
  odlXpPoints: number;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("global");

  // Mock leaderboard data
  const globalLeaderboard: LeaderboardEntry[] = [
    { rank: 1, odlRank: 1, odlRankChange: 0, odlUsername: "Ahmad Hafiz", odlTotalVerifiedWeight: 1250, odlAiAccuracyScore: 98, odlBadges: ["🥇", "🌊", "♻️"], odlXpPoints: 15000 },
    { rank: 2, odlRank: 2, odlRankChange: 2, odlUsername: "Sarah Lee", odlTotalVerifiedWeight: 1180, odlAiAccuracyScore: 95, odlBadges: ["🥈", "🐢"], odlXpPoints: 14200 },
    { rank: 3, odlRank: 3, odlRankChange: -1, odlUsername: "Muhammad Farid", odlTotalVerifiedWeight: 1050, odlAiAccuracyScore: 92, odlBadges: ["🥉", "🎯"], odlXpPoints: 12800 },
    { rank: 4, odlRank: 4, odlRankChange: 1, odlUsername: "Nurul Aisyah", odlTotalVerifiedWeight: 980, odlAiAccuracyScore: 94, odlBadges: ["🌟"], odlXpPoints: 11500 },
    { rank: 5, odlRank: 5, odlRankChange: 0, odlUsername: "David Tan", odlTotalVerifiedWeight: 920, odlAiAccuracyScore: 89, odlBadges: ["🔥"], odlXpPoints: 10800 },
    { rank: 6, odlRank: 6, odlRankChange: 3, odlUsername: "Siti Aminah", odlTotalVerifiedWeight: 850, odlAiAccuracyScore: 91, odlBadges: ["💪"], odlXpPoints: 9900 },
    { rank: 7, odlRank: 7, odlRankChange: -2, odlUsername: "Jason Wong", odlTotalVerifiedWeight: 780, odlAiAccuracyScore: 87, odlBadges: [], odlXpPoints: 9100 },
    { rank: 8, odlRank: 8, odlRankChange: 0, odlUsername: "Priya Kumar", odlTotalVerifiedWeight: 720, odlAiAccuracyScore: 90, odlBadges: [], odlXpPoints: 8400 },
    { rank: 9, odlRank: 9, odlRankChange: 1, odlUsername: "Ali Rahman", odlTotalVerifiedWeight: 680, odlAiAccuracyScore: 85, odlBadges: [], odlXpPoints: 7800 },
    { rank: 10, odlRank: 10, odlRankChange: -1, odlUsername: "Chen Wei", odlTotalVerifiedWeight: 650, odlAiAccuracyScore: 88, odlBadges: [], odlXpPoints: 7200 },
    { rank: 15, odlRank: 15, odlRankChange: 2, odlUsername: "You", odlTotalVerifiedWeight: 450, odlAiAccuracyScore: 82, odlBadges: ["🌱"], odlXpPoints: 5200, isCurrentUser: true },
  ];

  const friendsLeaderboard: LeaderboardEntry[] = [
    { rank: 1, odlRank: 1, odlRankChange: 0, odlUsername: "Sarah Lee", odlTotalVerifiedWeight: 1180, odlAiAccuracyScore: 95, odlBadges: ["🥈", "🐢"], odlXpPoints: 14200 },
    { rank: 2, odlRank: 2, odlRankChange: 1, odlUsername: "You", odlTotalVerifiedWeight: 450, odlAiAccuracyScore: 82, odlBadges: ["🌱"], odlXpPoints: 5200, isCurrentUser: true },
    { rank: 3, odlRank: 3, odlRankChange: -1, odlUsername: "Lim Wei Ming", odlTotalVerifiedWeight: 380, odlAiAccuracyScore: 79, odlBadges: [], odlXpPoints: 4500 },
    { rank: 4, odlRank: 4, odlRankChange: 0, odlUsername: "Fatimah Zahra", odlTotalVerifiedWeight: 290, odlAiAccuracyScore: 81, odlBadges: [], odlXpPoints: 3400 },
  ];

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    const isTopThree = entry.rank <= 3;
    
    return (
      <Card 
        key={index} 
        className={`glass-card transition-all ${
          entry.isCurrentUser 
            ? "ring-2 ring-ocean-medium bg-ocean-light/10" 
            : ""
        } ${isTopThree ? "border-l-4 border-l-amber-400" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Rank */}
            <div className="flex flex-col items-center min-w-[40px]">
              {getRankMedal(entry.rank) ? (
                <span className="text-2xl">{getRankMedal(entry.rank)}</span>
              ) : (
                <span className="text-xl font-bold text-muted-foreground">#{entry.rank}</span>
              )}
              <div className="flex items-center gap-0.5 text-xs">
                {getRankChangeIcon(entry.odlRankChange)}
                {entry.odlRankChange !== 0 && (
                  <span className={entry.odlRankChange > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(entry.odlRankChange)}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar & Name */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-light to-ocean-medium flex items-center justify-center text-white font-bold">
                  {entry.odlUsername.charAt(0)}
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {entry.odlUsername}
                    {entry.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.odlXpPoints.toLocaleString()} XP</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <p className="font-bold text-ocean-medium">{entry.odlTotalVerifiedWeight} kg</p>
              <p className="text-xs text-muted-foreground">{entry.odlAiAccuracyScore}% accuracy</p>
              {entry.odlBadges.length > 0 && (
                <div className="flex justify-end gap-0.5 mt-1">
                  {entry.odlBadges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="text-sm">{badge}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-400" />
              <h1 className="text-lg font-heading font-bold">Leaderboard</h1>
            </div>
          </div>
        </header>

        <main className="p-4 pb-8">
          {/* Your Rank Summary */}
          <Card className="glass-card mb-4 bg-gradient-to-r from-ocean-deep/20 to-ocean-medium/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-light to-ocean-medium flex items-center justify-center text-white font-bold text-lg">
                    Y
                  </div>
                  <div>
                    <p className="font-heading font-bold">Your Ranking</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-ocean-medium">#15</span>
                      <div className="flex items-center text-green-500 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>+2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Verified</p>
                  <p className="text-xl font-bold">450 kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="global" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-3">
              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {globalLeaderboard.slice(0, 3).map((entry, i) => {
                  const order = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
                  const actualEntry = globalLeaderboard[order[i]];
                  const heights = ["h-20", "h-28", "h-16"];
                  
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-ocean-light to-ocean-medium flex items-center justify-center text-white font-bold mb-2`}>
                        {actualEntry.odlUsername.charAt(0)}
                      </div>
                      <p className="text-xs font-medium text-center truncate w-full">{actualEntry.odlUsername}</p>
                      <p className="text-xs text-muted-foreground">{actualEntry.odlTotalVerifiedWeight} kg</p>
                      <div className={`${heights[i]} w-full mt-2 rounded-t-lg bg-gradient-to-t ${
                        order[i] === 0 ? "from-amber-400 to-amber-300" : 
                        order[i] === 1 ? "from-gray-400 to-gray-300" : 
                        "from-amber-600 to-amber-500"
                      } flex items-end justify-center pb-2`}>
                        <span className="text-2xl">{getRankMedal(order[i] + 1)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rest of leaderboard */}
              <div className="space-y-2">
                {globalLeaderboard.slice(3).map((entry, index) => renderLeaderboardEntry(entry, index))}
              </div>
            </TabsContent>

            <TabsContent value="friends" className="space-y-2">
              {friendsLeaderboard.map((entry, index) => renderLeaderboardEntry(entry, index))}
              
              {friendsLeaderboard.length < 5 && (
                <Card className="glass-card border-dashed">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Invite friends to join T-COAST!</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Invite Friends
                    </Button>
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

export default Leaderboard;
