import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, ClipboardCheck, Check, X, ChevronLeft, ChevronRight,
  MapPin, Calendar, User, AlertTriangle, ZoomIn, Sun, Image
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TaskLog {
  id: string;
  taskId: string;
  taskTitle: string;
  volunteerId: string;
  volunteerName: string;
  location: string;
  collectedWeight: number;
  estimatedWeight: number;
  variance: number;
  photos: string[];
  notes: string;
  dateTime: string;
  status: "pending" | "verified" | "rejected";
}

const taskLogs: TaskLog[] = [
  { id: "1", taskId: "t1", taskTitle: "Seberang Takir Cleanup", volunteerId: "v1", volunteerName: "Ahmad R.", location: "Seberang Takir Beach", collectedWeight: 45, estimatedWeight: 50, variance: 10, photos: ["/placeholder.svg", "/placeholder.svg"], notes: "Mostly plastic bottles found near shoreline", dateTime: "Dec 9, 2024", status: "pending" },
  { id: "2", taskId: "t2", taskTitle: "Batu Buruk Drive", volunteerId: "v2", volunteerName: "Fatimah Z.", location: "Batu Buruk Beach", collectedWeight: 12, estimatedWeight: 35, variance: 66, photos: ["/placeholder.svg"], notes: "Weather was bad, couldn't complete full area", dateTime: "Dec 8, 2024", status: "pending" },
  { id: "3", taskId: "t3", taskTitle: "Marang Beach Cleanup", volunteerId: "v3", volunteerName: "Razak M.", location: "Marang Beach", collectedWeight: 28, estimatedWeight: 25, variance: 12, photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"], notes: "Found additional debris in nearby rocks", dateTime: "Dec 8, 2024", status: "pending" },
  { id: "4", taskId: "t4", taskTitle: "Dungun Coast Drive", volunteerId: "v4", volunteerName: "Siti N.", location: "Dungun Coast", collectedWeight: 8, estimatedWeight: 40, variance: 80, photos: ["/placeholder.svg"], notes: "", dateTime: "Dec 7, 2024", status: "pending" },
];

export default function TaskReview() {
  const [logs, setLogs] = useState(taskLogs);
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const [brightness, setBrightness] = useState([100]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const { toast } = useToast();

  const activeLog = logs.find(l => l.id === activeLogId);
  const pendingLogs = logs.filter(l => l.status === "pending");

  const handleVerify = (id: string) => {
    setLogs(prev => prev.map(l => 
      l.id === id ? { ...l, status: "verified" as const } : l
    ));
    toast({ title: "Task log verified", description: "Weight added to volunteer's verified total" });
    navigateLogs("next");
  };

  const handleReject = (id: string) => {
    setLogs(prev => prev.map(l => 
      l.id === id ? { ...l, status: "rejected" as const } : l
    ));
    toast({ title: "Task log rejected", variant: "destructive" });
    navigateLogs("next");
  };

  const navigateLogs = (direction: "prev" | "next") => {
    const currentIndex = pendingLogs.findIndex(l => l.id === activeLogId);
    if (direction === "prev" && currentIndex > 0) {
      setActiveLogId(pendingLogs[currentIndex - 1].id);
      setActivePhotoIndex(0);
    } else if (direction === "next" && currentIndex < pendingLogs.length - 1) {
      setActiveLogId(pendingLogs[currentIndex + 1].id);
      setActivePhotoIndex(0);
    }
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
              <h1 className="font-display font-bold text-lg">Task Completion Review</h1>
              <p className="text-xs text-muted-foreground">{pendingLogs.length} pending verifications</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Task Log List */}
        <aside className="w-96 border-r border-border overflow-y-auto">
          <div className="divide-y divide-border">
            {logs.map(log => (
              <div
                key={log.id}
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  activeLogId === log.id && "bg-primary/5 border-l-4 border-l-primary",
                  log.status !== "pending" && "opacity-50"
                )}
                onClick={() => {
                  setActiveLogId(log.id);
                  setActivePhotoIndex(0);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{log.taskTitle}</p>
                    <p className="text-sm text-muted-foreground">{log.volunteerName}</p>
                  </div>
                  {log.variance > 50 && (
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      log.status === "verified" ? "success" :
                      log.status === "rejected" ? "destructive" : "outline"
                    }
                  >
                    {log.status}
                  </Badge>
                  <Badge 
                    variant={log.variance > 50 ? "destructive" : "outline"}
                  >
                    {log.variance}% variance
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{log.dateTime}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Review Panel */}
        <main className="flex-1 overflow-y-auto">
          {activeLog ? (
            <div className="p-6 space-y-6">
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateLogs("prev")}
                  disabled={pendingLogs.findIndex(l => l.id === activeLogId) === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {pendingLogs.findIndex(l => l.id === activeLogId) + 1} of {pendingLogs.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateLogs("next")}
                  disabled={pendingLogs.findIndex(l => l.id === activeLogId) === pendingLogs.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Weight Comparison */}
              <Card className={cn(activeLog.variance > 50 && "border-destructive")}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm">Weight Comparison</CardTitle>
                    {activeLog.variance > 50 && (
                      <Badge variant="destructive">High Variance</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold">{activeLog.estimatedWeight}kg</p>
                      <p className="text-sm text-muted-foreground">Estimated</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-3xl font-bold">{activeLog.collectedWeight}kg</p>
                      <p className="text-sm text-muted-foreground">Reported</p>
                    </div>
                    <div className={cn(
                      "p-4 rounded-lg",
                      activeLog.variance > 50 ? "bg-destructive/10" : "bg-success/10"
                    )}>
                      <p className={cn(
                        "text-3xl font-bold",
                        activeLog.variance > 50 ? "text-destructive" : "text-success"
                      )}>
                        {activeLog.variance}%
                      </p>
                      <p className="text-sm text-muted-foreground">Variance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photo Evidence */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Photo Evidence</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          value={brightness}
                          onValueChange={setBrightness}
                          min={50}
                          max={150}
                          step={10}
                          className="w-24"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <ZoomIn className="h-4 w-4 mr-2" />
                        Zoom
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="aspect-video bg-muted rounded-lg overflow-hidden mb-3"
                    style={{ filter: `brightness(${brightness[0]}%)` }}
                  >
                    <img 
                      src={activeLog.photos[activePhotoIndex]} 
                      alt={`Photo ${activePhotoIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeLog.photos.length > 1 && (
                    <div className="flex gap-2">
                      {activeLog.photos.map((photo, index) => (
                        <div
                          key={index}
                          className={cn(
                            "w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors",
                            activePhotoIndex === index ? "border-primary" : "border-transparent"
                          )}
                          onClick={() => setActivePhotoIndex(index)}
                        >
                          <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Volunteer</p>
                      <p className="font-medium">{activeLog.volunteerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{activeLog.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{activeLog.dateTime}</p>
                    </div>
                  </div>
                  {activeLog.notes && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm bg-muted/50 rounded-lg p-3">{activeLog.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {activeLog.status === "pending" && (
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="destructive"
                    onClick={() => handleReject(activeLog.id)}
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    size="lg" 
                    variant="success"
                    onClick={() => handleVerify(activeLog.id)}
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Verify ({activeLog.collectedWeight}kg)
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ClipboardCheck className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-display font-semibold mb-1">Select a Task Log</h3>
                <p className="text-sm text-muted-foreground">Choose a completion log from the list to review</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
