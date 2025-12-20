import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, CalendarDays, Plus, MapPin, Users, Clock,
  Cloud, Sun, CloudRain, AlertTriangle, Edit, Trash2, X,
  UserPlus, Zap, GripVertical, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Schedule {
  id: string;
  title: string;
  location: string;
  dateTime: string;
  priority: "high" | "medium" | "low";
  debrisType: string;
  estimatedQuantity: number;
  assignedVolunteers: string[];
  requiredVolunteers: number;
  status: "upcoming" | "in-progress" | "completed";
  weather: "sunny" | "cloudy" | "rainy";
}

interface Volunteer {
  id: string;
  name: string;
  initials: string;
  lastActive: string;
  totalWeight: number;
  proximity: number;
  assigned: boolean;
}

const volunteers: Volunteer[] = [
  { id: "v1", name: "Ahmad Hassan", initials: "AH", lastActive: "2 hours ago", totalWeight: 87, proximity: 2.3, assigned: false },
  { id: "v2", name: "Fatimah Zahra", initials: "FZ", lastActive: "30 min ago", totalWeight: 234, proximity: 1.5, assigned: false },
  { id: "v3", name: "Razak Mahmud", initials: "RM", lastActive: "1 hour ago", totalWeight: 198, proximity: 3.2, assigned: false },
  { id: "v4", name: "Siti Nurhaliza", initials: "SN", lastActive: "4 hours ago", totalWeight: 187, proximity: 4.1, assigned: false },
  { id: "v5", name: "Hafiz Abdullah", initials: "HA", lastActive: "15 min ago", totalWeight: 156, proximity: 0.8, assigned: false },
  { id: "v6", name: "Nurul Huda", initials: "NH", lastActive: "1 day ago", totalWeight: 142, proximity: 5.5, assigned: false },
];

const initialSchedules: Schedule[] = [
  { id: "1", title: "Seberang Takir Beach Cleanup", location: "Seberang Takir", dateTime: "Dec 10, 2024 8:00 AM", priority: "high", debrisType: "Plastic", estimatedQuantity: 150, assignedVolunteers: ["v1", "v2", "v3"], requiredVolunteers: 10, status: "upcoming", weather: "sunny" },
  { id: "2", title: "Batu Buruk Drive", location: "Batu Buruk Beach", dateTime: "Dec 12, 2024 7:30 AM", priority: "medium", debrisType: "Mixed", estimatedQuantity: 80, assignedVolunteers: ["v4", "v5"], requiredVolunteers: 6, status: "upcoming", weather: "cloudy" },
  { id: "3", title: "Dungun Coast Cleanup", location: "Dungun Coast", dateTime: "Dec 15, 2024 8:00 AM", priority: "low", debrisType: "Fishing Gear", estimatedQuantity: 200, assignedVolunteers: [], requiredVolunteers: 15, status: "upcoming", weather: "rainy" },
  { id: "4", title: "Marang Beach Initiative", location: "Marang Beach", dateTime: "Dec 8, 2024 7:00 AM", priority: "high", debrisType: "Organic", estimatedQuantity: 45, assignedVolunteers: ["v1", "v2", "v3", "v4", "v5", "v6"], requiredVolunteers: 6, status: "completed", weather: "sunny" },
];

const WeatherIcon = ({ weather }: { weather: string }) => {
  switch (weather) {
    case "sunny": return <Sun className="h-4 w-4 text-warning" />;
    case "cloudy": return <Cloud className="h-4 w-4 text-muted-foreground" />;
    case "rainy": return <CloudRain className="h-4 w-4 text-primary" />;
    default: return null;
  }
};

export default function ScheduleManager() {
  const [searchParams] = useSearchParams();
  const [scheduleList, setScheduleList] = useState(initialSchedules);
  const [showCreateForm, setShowCreateForm] = useState(searchParams.has("hotspot"));
  const [expandedScheduleId, setExpandedScheduleId] = useState<string | null>(null);
  const [volunteerList, setVolunteerList] = useState(volunteers);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    location: searchParams.get("hotspot") ? "From Hotspot" : "",
    date: "",
    time: "08:00",
    priority: "medium",
    debrisType: "",
    estimatedQuantity: "",
    requiredVolunteers: "",
    notes: "",
  });

  const upcomingSchedules = scheduleList.filter(s => s.status === "upcoming");
  const completedSchedules = scheduleList.filter(s => s.status === "completed");

  const handleCreate = () => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      title: formData.title,
      location: formData.location,
      dateTime: `${formData.date} ${formData.time}`,
      priority: formData.priority as "high" | "medium" | "low",
      debrisType: formData.debrisType,
      estimatedQuantity: parseInt(formData.estimatedQuantity) || 0,
      assignedVolunteers: [],
      requiredVolunteers: parseInt(formData.requiredVolunteers) || 5,
      status: "upcoming",
      weather: "sunny",
    };
    setScheduleList(prev => [newSchedule, ...prev]);
    setShowCreateForm(false);
    setFormData({ title: "", location: "", date: "", time: "08:00", priority: "medium", debrisType: "", estimatedQuantity: "", requiredVolunteers: "", notes: "" });
    toast({ title: "Schedule created", description: "You can now assign volunteers" });
  };

  const handleDelete = (id: string) => {
    setScheduleList(prev => prev.filter(s => s.id !== id));
    toast({ title: "Schedule deleted", variant: "destructive" });
  };

  const toggleVolunteerAssignment = (scheduleId: string, volunteerId: string) => {
    setScheduleList(prev => prev.map(s => {
      if (s.id !== scheduleId) return s;
      const isAssigned = s.assignedVolunteers.includes(volunteerId);
      return {
        ...s,
        assignedVolunteers: isAssigned 
          ? s.assignedVolunteers.filter(v => v !== volunteerId)
          : [...s.assignedVolunteers, volunteerId]
      };
    }));
  };

  const autoAssignVolunteers = (scheduleId: string) => {
    const schedule = scheduleList.find(s => s.id === scheduleId);
    if (!schedule) return;

    const needed = schedule.requiredVolunteers - schedule.assignedVolunteers.length;
    if (needed <= 0) return;

    // Sort by proximity and assign
    const available = volunteerList
      .filter(v => !schedule.assignedVolunteers.includes(v.id))
      .sort((a, b) => a.proximity - b.proximity)
      .slice(0, needed);

    setScheduleList(prev => prev.map(s => {
      if (s.id !== scheduleId) return s;
      return {
        ...s,
        assignedVolunteers: [...s.assignedVolunteers, ...available.map(v => v.id)]
      };
    }));

    toast({ title: `${available.length} volunteers auto-assigned`, description: "Based on proximity" });
  };

  const getVolunteerById = (id: string) => volunteerList.find(v => v.id === id);

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
              <h1 className="font-display font-bold text-lg">Cleanup Schedules</h1>
              <p className="text-xs text-muted-foreground">{upcomingSchedules.length} upcoming • Manage volunteers inline</p>
            </div>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Schedule
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Create Form Modal */}
        {showCreateForm && (
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Schedule</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Schedule Title</Label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Seberang Takir Cleanup"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Beach/coastal location"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input 
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <div className="flex gap-2">
                    {["high", "medium", "low"].map(p => (
                      <Button
                        key={p}
                        type="button"
                        variant={formData.priority === p ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                        className="capitalize"
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Debris Type</Label>
                  <Input 
                    value={formData.debrisType}
                    onChange={(e) => setFormData(prev => ({ ...prev, debrisType: e.target.value }))}
                    placeholder="e.g., Plastic, Mixed"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Quantity (kg)</Label>
                  <Input 
                    type="number"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedQuantity: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Required Volunteers</Label>
                  <Input 
                    type="number"
                    value={formData.requiredVolunteers}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiredVolunteers: e.target.value }))}
                  />
                </div>
              </div>

              {/* Weather Widget Placeholder */}
              <div className="p-4 rounded-lg bg-muted/50 flex items-center gap-3">
                <Sun className="h-8 w-8 text-warning" />
                <div>
                  <p className="font-medium">Weather Forecast</p>
                  <p className="text-sm text-muted-foreground">Sunny, 28°C - Good conditions for cleanup</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                <Button onClick={handleCreate}>Create Schedule</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Schedules with Inline Volunteer Assignment */}
        <section>
          <h2 className="font-display font-semibold text-lg mb-4">Upcoming (Next 7 Days)</h2>
          <div className="space-y-4">
            {upcomingSchedules.map(schedule => (
              <Card 
                key={schedule.id}
                className={cn(
                  "border-l-4 overflow-hidden",
                  schedule.priority === "high" && "border-l-destructive",
                  schedule.priority === "medium" && "border-l-warning",
                  schedule.priority === "low" && "border-l-muted-foreground"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{schedule.title}</h3>
                        <Badge variant={schedule.priority === "high" ? "destructive" : "outline"} className="capitalize">
                          {schedule.priority}
                        </Badge>
                        <Badge variant="outline">{schedule.debrisType}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {schedule.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {schedule.dateTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <WeatherIcon weather={schedule.weather} />
                          {schedule.weather}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className={cn(
                            "font-medium",
                            schedule.assignedVolunteers.length < schedule.requiredVolunteers && "text-warning"
                          )}>
                            {schedule.assignedVolunteers.length}/{schedule.requiredVolunteers}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">volunteers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{schedule.estimatedQuantity}kg</p>
                        <p className="text-xs text-muted-foreground">estimated</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant={expandedScheduleId === schedule.id ? "secondary" : "ghost"} 
                          size="icon"
                          onClick={() => setExpandedScheduleId(expandedScheduleId === schedule.id ? null : schedule.id)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(schedule.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {schedule.assignedVolunteers.length < schedule.requiredVolunteers && (
                    <div className="mt-3 p-2 rounded-lg bg-warning/10 flex items-center justify-between text-sm text-warning">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Needs {schedule.requiredVolunteers - schedule.assignedVolunteers.length} more volunteers
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-warning hover:text-warning"
                        onClick={() => autoAssignVolunteers(schedule.id)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Auto-Assign
                      </Button>
                    </div>
                  )}

                  {/* Assigned Volunteers Preview */}
                  {schedule.assignedVolunteers.length > 0 && expandedScheduleId !== schedule.id && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Assigned:</span>
                      <div className="flex -space-x-2">
                        {schedule.assignedVolunteers.slice(0, 5).map(vId => {
                          const v = getVolunteerById(vId);
                          return v ? (
                            <Avatar key={vId} className="h-7 w-7 border-2 border-background">
                              <AvatarFallback className="text-xs">{v.initials}</AvatarFallback>
                            </Avatar>
                          ) : null;
                        })}
                        {schedule.assignedVolunteers.length > 5 && (
                          <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{schedule.assignedVolunteers.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Expanded Volunteer Assignment Panel */}
                {expandedScheduleId === schedule.id && (
                  <div className="border-t bg-muted/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">Assign Volunteers</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => autoAssignVolunteers(schedule.id)}
                        >
                          <Zap className="h-3.5 w-3.5 mr-1" />
                          Auto-Assign by Proximity
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {volunteerList.map(volunteer => {
                        const isAssigned = schedule.assignedVolunteers.includes(volunteer.id);
                        return (
                          <div 
                            key={volunteer.id}
                            onClick={() => toggleVolunteerAssignment(schedule.id, volunteer.id)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                              isAssigned 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{volunteer.initials}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{volunteer.name}</p>
                                <p className="text-xs text-muted-foreground">{volunteer.proximity}km away</p>
                              </div>
                            </div>
                            <div className={cn(
                              "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                              isAssigned ? "border-primary bg-primary" : "border-muted-foreground/30"
                            )}>
                              {isAssigned && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Completed Schedules */}
        <section>
          <h2 className="font-display font-semibold text-lg mb-4">Completed</h2>
          <div className="space-y-3">
            {completedSchedules.map(schedule => (
              <Card key={schedule.id} className="opacity-70">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{schedule.title}</h3>
                      <p className="text-sm text-muted-foreground">{schedule.dateTime}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {schedule.assignedVolunteers.slice(0, 3).map(vId => {
                          const v = getVolunteerById(vId);
                          return v ? (
                            <Avatar key={vId} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs">{v.initials}</AvatarFallback>
                            </Avatar>
                          ) : null;
                        })}
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
