import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Bell, Moon, Globe, Lock, Shield, 
  User, LogOut, ChevronRight, Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VolunteerSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    quietHours: false,
    language: "en",
  });

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been signed out successfully",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/volunteer/profile">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-display font-semibold text-lg">Settings</h1>
        </div>
      </header>

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Account */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ahmad bin Hassan</p>
                <p className="text-sm text-muted-foreground">ahmad.hassan@email.com</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif" className="cursor-pointer">Push Notifications</Label>
              <Switch 
                id="push-notif"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings(s => ({...s, notifications: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif" className="cursor-pointer">Email Notifications</Label>
              <Switch 
                id="email-notif"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(s => ({...s, emailNotifications: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="quiet-hours" className="cursor-pointer">Quiet Hours</Label>
                <p className="text-xs text-muted-foreground">10:00 PM - 7:00 AM</p>
              </div>
              <Switch 
                id="quiet-hours"
                checked={settings.quietHours}
                onCheckedChange={(checked) => setSettings(s => ({...s, quietHours: checked}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode</Label>
              <Switch 
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings(s => ({...s, darkMode: checked}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span>Change Password</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span>Two-Factor Authentication</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              className="w-full p-2 rounded-lg border bg-background"
              value={settings.language}
              onChange={(e) => setSettings(s => ({...s, language: e.target.value}))}
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Melayu</option>
              <option value="zh">中文</option>
            </select>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="destructive" 
          size="lg" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </main>
    </div>
  );
}
