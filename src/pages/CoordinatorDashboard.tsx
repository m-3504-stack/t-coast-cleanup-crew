import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Map, FileText, CalendarDays, Users, BarChart3, 
  Trophy, Bell, Settings, Menu, TrendingUp, 
  CheckCircle, Clock, AlertTriangle, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = {
  todayReports: 12,
  verifiedWeight: 87,
  tasksCompleted: 8,
  activeVolunteers: 24,
};

const recentReports = [
  { id: "1", location: "Seberang Takir", type: "Plastic", status: "pending", time: "10 min ago" },
  { id: "2", location: "Batu Buruk", type: "Mixed", status: "verified", time: "25 min ago" },
  { id: "3", location: "Marang Beach", type: "Organic", status: "pending", time: "1 hour ago" },
];

const upcomingSchedules = [
  { id: "1", title: "Seberang Takir Cleanup", date: "Dec 10", volunteers: 8, priority: "high" },
  { id: "2", title: "Batu Buruk Drive", date: "Dec 12", volunteers: 5, priority: "medium" },
  { id: "3", title: "Dungun Coast Cleanup", date: "Dec 15", volunteers: 12, priority: "low" },
];

const navItems = [
  { icon: Map, label: "Hotspot Map", href: "/coordinator/hotspots" },
  { icon: FileText, label: "Report Review", href: "/coordinator/reports" },
  { icon: CheckCircle, label: "Task Review", href: "/coordinator/tasks" },
  { icon: CalendarDays, label: "Schedules", href: "/coordinator/schedules" },
  { icon: Users, label: "Volunteers", href: "/coordinator/volunteers" },
  { icon: Trophy, label: "Leaderboard", href: "/coordinator/leaderboard" },
];

export default function CoordinatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 z-40 bg-card border-r border-border transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Logo size="sm" showText={sidebarOpen} />
        </div>
        
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Link
            to="/coordinator/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display font-bold text-xl">Dashboard</h1>
                <p className="text-xs text-muted-foreground">Coordinator View</p>
              </div>
            </div>
            
            {/* Live Stats Ticker */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <Badge variant="glass" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Today: {stats.todayReports} reports
              </Badge>
              <Badge variant="glass">{stats.verifiedWeight}kg verified</Badge>
              <Badge variant="glass">{stats.tasksCompleted} tasks completed</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Reports</p>
                    <p className="text-3xl font-display font-bold mt-1">{stats.todayReports}</p>
                    <div className="flex items-center gap-1 mt-2 text-success text-sm">
                      <TrendingUp className="h-4 w-4" />
                      +23% from yesterday
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Verified Weight</p>
                    <p className="text-3xl font-display font-bold mt-1">{stats.verifiedWeight}kg</p>
                    <div className="flex items-center gap-1 mt-2 text-success text-sm">
                      <TrendingUp className="h-4 w-4" />
                      +12kg today
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    <p className="text-3xl font-display font-bold mt-1">{stats.tasksCompleted}</p>
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      3 pending
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-warning/10">
                    <CalendarDays className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Volunteers</p>
                    <p className="text-3xl font-display font-bold mt-1">{stats.activeVolunteers}</p>
                    <div className="flex items-center gap-1 mt-2 text-success text-sm">
                      <TrendingUp className="h-4 w-4" />
                      +5 this week
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hotspot Map Preview */}
            <Card className="lg:row-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Live Hotspot Map
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/coordinator/hotspots">View Full Map</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl flex items-center justify-center border border-border relative overflow-hidden">
                  {/* Simplified map visualization */}
                  <div className="absolute inset-4">
                    {/* Hotspot markers */}
                    <div className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full bg-destructive/30 animate-pulse flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-destructive" />
                    </div>
                    <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-warning/30 animate-pulse flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                    </div>
                    <div className="absolute bottom-1/3 left-1/2 w-5 h-5 rounded-full bg-primary/30 animate-pulse flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>High density</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span>Medium density</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Low density</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Reports
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/coordinator/reports">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{report.location}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.time}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={report.status === "verified" ? "success" : "warning"}
                      className="capitalize"
                    >
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Schedules */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Upcoming Schedules
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/coordinator/schedules">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSchedules.map((schedule) => (
                  <div 
                    key={schedule.id}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl border-l-4 bg-muted/50 hover:bg-muted transition-colors cursor-pointer",
                      schedule.priority === "high" && "border-l-destructive",
                      schedule.priority === "medium" && "border-l-warning",
                      schedule.priority === "low" && "border-l-muted-foreground"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{schedule.title}</p>
                      <p className="text-xs text-muted-foreground">{schedule.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{schedule.volunteers}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
