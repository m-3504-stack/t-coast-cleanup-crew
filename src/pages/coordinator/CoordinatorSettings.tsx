import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, Bell, Moon, Globe, Lock, Shield, 
  User, LogOut, ChevronRight, Smartphone, Database,
  Mail, FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CoordinatorSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    autoAssign: false,
    reportSummary: true,
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
        <div className="px-4 md:px-6 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/coordinator">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display font-semibold text-lg">Coordinator Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your preferences</p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-3xl mx-auto space-y-6">
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
                <p className="font-medium">Coordinator Admin</p>
                <p className="text-sm text-muted-foreground">coordinator@tcoast.gov.my</p>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
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
              <div>
                <Label htmlFor="email-alerts" className="cursor-pointer">Email Alerts</Label>
                <p className="text-xs text-muted-foreground">Critical updates and reports</p>
              </div>
              <Switch 
                id="email-alerts"
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings(s => ({...s, emailAlerts: checked}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Coordination Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />
              Coordination
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-assign" className="cursor-pointer">Auto-Assign Volunteers</Label>
                <p className="text-xs text-muted-foreground">Automatically assign based on proximity</p>
              </div>
              <Switch 
                id="auto-assign"
                checked={settings.autoAssign}
                onCheckedChange={(checked) => setSettings(s => ({...s, autoAssign: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="report-summary" className="cursor-pointer">Daily Report Summary</Label>
                <p className="text-xs text-muted-foreground">Receive daily digest at 6 PM</p>
              </div>
              <Switch 
                id="report-summary"
                checked={settings.reportSummary}
                onCheckedChange={(checked) => setSettings(s => ({...s, reportSummary: checked}))}
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
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span>Change Password</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span>Two-Factor Authentication</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Activity Logs</span>
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
