import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AchievementsGrid, sampleBadges } from "@/components/AchievementsGrid";
import { 
  ArrowLeft, Settings, Share2, Scale, FileText, 
  CheckCircle, XCircle, Target, TrendingUp, Flame, Star
} from "lucide-react";

const profileData = {
  name: "Ahmad bin Hassan",
  email: "ahmad.hassan@email.com",
  joinedDate: "October 2024",
  preferredLocation: "Kuala Terengganu",
  stats: {
    totalVerifiedWeight: 87,
    totalReports: 34,
    verifiedReports: 28,
    unverifiedReports: 6,
    aiAccuracyScore: 82,
    xpPoints: 1250,
    streak: 7,
    rank: 12,
  },
};

export default function VolunteerProfile() {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/volunteer">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-display font-semibold text-lg">My Profile</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl font-display font-bold bg-primary/10 text-primary">
              AH
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-display font-bold">{profileData.name}</h2>
          <p className="text-sm text-muted-foreground">{profileData.email}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="ocean">Rank #{profileData.stats.rank}</Badge>
            <Badge variant="secondary">{profileData.preferredLocation}</Badge>
          </div>
        </div>

        {/* Stats Rings */}
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(profileData.stats.totalVerifiedWeight / 100) * 226} 226`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="font-bold text-lg">{profileData.stats.totalVerifiedWeight}kg</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>

              <div>
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(profileData.stats.aiAccuracyScore / 100) * 226} 226`}
                      className="text-success"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Target className="h-6 w-6 text-success" />
                  </div>
                </div>
                <p className="font-bold text-lg">{profileData.stats.aiAccuracyScore}%</p>
                <p className="text-xs text-muted-foreground">AI Accuracy</p>
              </div>

              <div>
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(profileData.stats.verifiedReports / profileData.stats.totalReports) * 226} 226`}
                      className="text-warning"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-warning" />
                  </div>
                </div>
                <p className="font-bold text-lg">{profileData.stats.totalReports}</p>
                <p className="text-xs text-muted-foreground">Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP & Streak */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-warning/20">
                <Star className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{profileData.stats.xpPoints.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP Points</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/20">
                <Flame className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{profileData.stats.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Report Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Verified Reports</span>
              </div>
              <span className="font-semibold">{profileData.stats.verifiedReports}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Pending Verification</span>
              </div>
              <span className="font-semibold">{profileData.stats.unverifiedReports}</span>
            </div>
            <Progress 
              value={(profileData.stats.verifiedReports / profileData.stats.totalReports) * 100} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground text-center">
              {Math.round((profileData.stats.verifiedReports / profileData.stats.totalReports) * 100)}% verification rate
            </p>
          </CardContent>
        </Card>

        {/* 100kg Progress */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium">Progress to 100kg Badge</span>
            </div>
            <Progress value={profileData.stats.totalVerifiedWeight} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{profileData.stats.totalVerifiedWeight}kg</span> of 100kg goal
            </p>
          </CardContent>
        </Card>

        {/* Achievements */}
        <section>
          <h3 className="text-lg font-display font-semibold mb-4">Badges & Achievements</h3>
          <AchievementsGrid badges={sampleBadges} />
        </section>

        {/* Share Impact */}
        <Button variant="outline" size="lg" className="w-full">
          <Share2 className="h-4 w-4 mr-2" />
          Share My Impact
        </Button>
      </main>
    </div>
  );
}
