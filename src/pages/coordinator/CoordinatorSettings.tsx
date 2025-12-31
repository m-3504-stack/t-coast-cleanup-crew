import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Bell, Moon, Lock, Shield, 
  User, LogOut, ChevronRight, Database, Trash2, Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CoordinatorSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    autoAssign: false,
    reportSummary: true,
  });

  const [profile, setProfile] = useState({
    username: "Coordinator Admin",
    userEmail: "coordinator@tcoast.gov.my",
    userContactNumber: "+60123456789",
    coordinatorOrganization: "Terengganu Environmental Department",
    coordinatorDepartment: "Coastal Management",
  });

  const handleToggleDarkMode = (checked: boolean) => {
    setSettings(s => ({ ...s, darkMode: checked }));
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    toast({
      title: checked ? "Dark mode enabled" : "Light mode enabled",
    });
  };

  const handleUpdateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted",
      variant: "destructive",
    });
    navigate("/login");
  };

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
            {isEditing ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile(p => ({ ...p, username: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={profile.userEmail}
                      onChange={(e) => setProfile(p => ({ ...p, userEmail: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userContactNumber">Contact Number</Label>
                    <Input
                      id="userContactNumber"
                      value={profile.userContactNumber}
                      onChange={(e) => setProfile(p => ({ ...p, userContactNumber: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coordinatorOrganization">Organization</Label>
                    <Input
                      id="coordinatorOrganization"
                      value={profile.coordinatorOrganization}
                      onChange={(e) => setProfile(p => ({ ...p, coordinatorOrganization: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinatorDepartment">Department</Label>
                  <Input
                    id="coordinatorDepartment"
                    value={profile.coordinatorDepartment}
                    onChange={(e) => setProfile(p => ({ ...p, coordinatorDepartment: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{profile.username}</p>
                  <p className="text-sm text-muted-foreground">{profile.userEmail}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
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
                onCheckedChange={handleToggleDarkMode}
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
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your coordinator account
                    and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProfile} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
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
