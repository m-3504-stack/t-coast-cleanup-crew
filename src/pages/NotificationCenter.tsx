import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Bell, CalendarDays, CheckCircle, 
  Trophy, FileText, AlertTriangle, Clock, Trash2 
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationType = "task" | "reminder" | "reward" | "review" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "task", title: "New Task Assigned", message: "Seberang Takir Beach Cleanup on Dec 10", time: "10 min ago", isRead: false },
  { id: "2", type: "reminder", title: "Cleanup Tomorrow!", message: "Don't forget your Batu Buruk cleanup at 8:00 AM", time: "1 hour ago", isRead: false },
  { id: "3", type: "reward", title: "Badge Unlocked! 🎉", message: "You've earned the 'Plastic Slayer' badge", time: "2 hours ago", isRead: true },
  { id: "4", type: "review", title: "Report Verified", message: "Your debris report at Marang Beach was verified (+10 XP)", time: "Yesterday", isRead: true },
  { id: "5", type: "system", title: "Rank Update", message: "You've moved up to #12 on the leaderboard!", time: "2 days ago", isRead: true },
  { id: "6", type: "reminder", title: "24h Reminder", message: "Cleanup scheduled for tomorrow at Dungun Coast", time: "3 days ago", isRead: true },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "task": return <CalendarDays className="h-5 w-5" />;
    case "reminder": return <Clock className="h-5 w-5" />;
    case "reward": return <Trophy className="h-5 w-5" />;
    case "review": return <FileText className="h-5 w-5" />;
    case "system": return <Bell className="h-5 w-5" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "task": return "bg-primary/10 text-primary";
    case "reminder": return "bg-warning/10 text-warning";
    case "reward": return "bg-accent/10 text-accent-foreground";
    case "review": return "bg-success/10 text-success";
    case "system": return "bg-muted text-muted-foreground";
  }
};

export default function NotificationCenter() {
  const [notifList, setNotifList] = useState(notifications);
  
  const unreadCount = notifList.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifList(prev => prev.filter(n => n.id !== id));
  };

  const groupedNotifications = {
    today: notifList.filter(n => n.time.includes("min") || n.time.includes("hour")),
    earlier: notifList.filter(n => !n.time.includes("min") && !n.time.includes("hour")),
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/volunteer">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
      </header>

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {groupedNotifications.today.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Today</h2>
            <div className="space-y-2">
              {groupedNotifications.today.map(notif => (
                <Card 
                  key={notif.id}
                  className={cn(
                    "p-4 transition-all",
                    !notif.isRead && "border-l-4 border-l-primary bg-primary/5"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn("p-2 rounded-lg shrink-0", getNotificationColor(notif.type))}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium">{notif.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 shrink-0"
                          onClick={() => deleteNotification(notif.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {groupedNotifications.earlier.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Earlier</h2>
            <div className="space-y-2">
              {groupedNotifications.earlier.map(notif => (
                <Card 
                  key={notif.id}
                  className={cn(
                    "p-4 transition-all",
                    !notif.isRead && "border-l-4 border-l-primary bg-primary/5"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn("p-2 rounded-lg shrink-0", getNotificationColor(notif.type))}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium">{notif.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 shrink-0"
                          onClick={() => deleteNotification(notif.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {notifList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold mb-1">No Notifications</h3>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </main>
    </div>
  );
}
