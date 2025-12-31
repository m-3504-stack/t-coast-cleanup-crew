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
  AlertTriangle, Edit, Trash2, X,
  UserPlus, Zap, GripVertical, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CleanupSchedule {
  scheduleId: string;
  scheduleLocation: string;
  scheduleDateTime: string;
  schedulePriorityLevel: "high" | "medium" | "low";
  scheduleDebrisTargetType: string;
  scheduleEstimatedQuantity: string;
  assignedVolunteers: string[];
  scheduleRequiredVolunteerCount: number;
  scheduleStatus: "UPCOMING" | "COMPLETED" | "CANCELLED";
}

interface Volunteer {
  volunteerId: string;
  volunteerName: string;
  initials: string;
  lastActive: string;
  volunteerTotalVerifiedWeight: number;
  proximity: number;
  assigned: boolean;
}

const volunteers: Volunteer[] = [
  { volunteerId: "v1", volunteerName: "Ahmad Hassan", initials: "AH", lastActive: "2 hours ago", volunteerTotalVerifiedWeight: 87, proximity: 2.3, assigned: false },
  { volunteerId: "v2", volunteerName: "Fatimah Zahra", initials: "FZ", lastActive: "30 min ago", volunteerTotalVerifiedWeight: 234, proximity: 1.5, assigned: false },
  { volunteerId: "v3", volunteerName: "Razak Mahmud", initials: "RM", lastActive: "1 hour ago", volunteerTotalVerifiedWeight: 198, proximity: 3.2, assigned: false },
  { volunteerId: "v4", volunteerName: "Siti Nurhaliza", initials: "SN", lastActive: "4 hours ago", volunteerTotalVerifiedWeight: 187, proximity: 4.1, assigned: false },
  { volunteerId: "v5", volunteerName: "Hafiz Abdullah", initials: "HA", lastActive: "15 min ago", volunteerTotalVerifiedWeight: 156, proximity: 0.8, assigned: false },
  { volunteerId: "v6", volunteerName: "Nurul Huda", initials: "NH", lastActive: "1 day ago", volunteerTotalVerifiedWeight: 142, proximity: 5.5, assigned: false },
];

const initialSchedules: CleanupSchedule[] = [
  { scheduleId: "1", scheduleLocation: "Seberang Takir", scheduleDateTime: "Dec 10, 2024 8:00 AM", schedulePriorityLevel: "high", scheduleDebrisTargetType: "Plastic", scheduleEstimatedQuantity: "150", assignedVolunteers: ["v1", "v2", "v3"], scheduleRequiredVolunteerCount: 10, scheduleStatus: "UPCOMING" },
  { scheduleId: "2", scheduleLocation: "Batu Buruk Beach", scheduleDateTime: "Dec 12, 2024 7:30 AM", schedulePriorityLevel: "medium", scheduleDebrisTargetType: "Mixed", scheduleEstimatedQuantity: "80", assignedVolunteers: ["v4", "v5"], scheduleRequiredVolunteerCount: 6, scheduleStatus: "UPCOMING" },
  { scheduleId: "3", scheduleLocation: "Dungun Coast", scheduleDateTime: "Dec 15, 2024 8:00 AM", schedulePriorityLevel: "low", scheduleDebrisTargetType: "Fishing Gear", scheduleEstimatedQuantity: "200", assignedVolunteers: [], scheduleRequiredVolunteerCount: 15, scheduleStatus: "UPCOMING" },
  { scheduleId: "4", scheduleLocation: "Marang Beach", scheduleDateTime: "Dec 8, 2024 7:00 AM", schedulePriorityLevel: "high", scheduleDebrisTargetType: "Organic", scheduleEstimatedQuantity: "45", assignedVolunteers: ["v1", "v2", "v3", "v4", "v5", "v6"], scheduleRequiredVolunteerCount: 6, scheduleStatus: "COMPLETED" },
];

export default function ScheduleManager() {
  const [searchParams] = useSearchParams();
  const [scheduleList, setScheduleList] = useState(initialSchedules);
  const [showForm, setShowForm] = useState(searchParams.has("hotspot"));
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [expandedScheduleId, setExpandedScheduleId] = useState<string | null>(null);
  const [volunteerList] = useState(volunteers);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    scheduleLocation: searchParams.get("hotspot") ? "From Hotspot" : "",
    date: "",
    time: "08:00",
    schedulePriorityLevel: "medium",
    scheduleDebrisTargetType: "",
    scheduleEstimatedQuantity: "",
    scheduleRequiredVolunteerCount: "",
  });

  const upcomingSchedules = scheduleList.filter(s => s.scheduleStatus === "UPCOMING");
  const completedSchedules = scheduleList.filter(s => s.scheduleStatus === "COMPLETED");

  const resetForm = () => {
    setFormData({ 
      scheduleLocation: "", 
      date: "", 
      time: "08:00", 
      schedulePriorityLevel: "medium", 
      scheduleDebrisTargetType: "", 
      scheduleEstimatedQuantity: "", 
      scheduleRequiredVolunteerCount: "" 
    });
    setEditingScheduleId(null);
    setShowForm(false);
  };

  const handleCreate = () => {
    const newSchedule: CleanupSchedule = {
      scheduleId: Date.now().toString(),
      scheduleLocation: formData.scheduleLocation,
      scheduleDateTime: `${formData.date} ${formData.time}`,
      schedulePriorityLevel: formData.schedulePriorityLevel as "high" | "medium" | "low",
      scheduleDebrisTargetType: formData.scheduleDebrisTargetType,
      scheduleEstimatedQuantity: formData.scheduleEstimatedQuantity,
      assignedVolunteers: [],
      scheduleRequiredVolunteerCount: parseInt(formData.scheduleRequiredVolunteerCount) || 5,
      scheduleStatus: "UPCOMING",
    };
    setScheduleList(prev => [newSchedule, ...prev]);
    resetForm();
    toast({ title: "Schedule created", description: "You can now assign volunteers" });
  };

  const handleEdit = (schedule: CleanupSchedule) => {
    const [datePart, timePart] = schedule.scheduleDateTime.split(" ");
    setFormData({
      scheduleLocation: schedule.scheduleLocation,
      date: datePart,
      time: timePart || "08:00",
      schedulePriorityLevel: schedule.schedulePriorityLevel,
      scheduleDebrisTargetType: schedule.scheduleDebrisTargetType,
      scheduleEstimatedQuantity: schedule.scheduleEstimatedQuantity,
      scheduleRequiredVolunteerCount: schedule.scheduleRequiredVolunteerCount.toString(),
    });
    setEditingScheduleId(schedule.scheduleId);
    setShowForm(true);
  };

  const handleUpdate = () => {
    setScheduleList(prev => prev.map(s => {
      if (s.scheduleId !== editingScheduleId) return s;
      return {
        ...s,
        scheduleLocation: formData.scheduleLocation,
        scheduleDateTime: `${formData.date} ${formData.time}`,
        schedulePriorityLevel: formData.schedulePriorityLevel as "high" | "medium" | "low",
        scheduleDebrisTargetType: formData.scheduleDebrisTargetType,
        scheduleEstimatedQuantity: formData.scheduleEstimatedQuantity,
        scheduleRequiredVolunteerCount: parseInt(formData.scheduleRequiredVolunteerCount) || 5,
      };
    }));
    resetForm();
    toast({ title: "Schedule updated" });
  };

  const handleDelete = (id: string) => {
    setScheduleList(prev => prev.filter(s => s.scheduleId !== id));
    toast({ title: "Schedule deleted", variant: "destructive" });
  };

  const toggleVolunteerAssignment = (scheduleId: string, volunteerId: string) => {
    setScheduleList(prev => prev.map(s => {
      if (s.scheduleId !== scheduleId) return s;
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
    const schedule = scheduleList.find(s => s.scheduleId === scheduleId);
    if (!schedule) return;

    const needed = schedule.scheduleRequiredVolunteerCount - schedule.assignedVolunteers.length;
    if (needed <= 0) return;

    const available = volunteerList
      .filter(v => !schedule.assignedVolunteers.includes(v.volunteerId))
      .sort((a, b) => a.proximity - b.proximity)
      .slice(0, needed);

    setScheduleList(prev => prev.map(s => {
      if (s.scheduleId !== scheduleId) return s;
      return {
        ...s,
        assignedVolunteers: [...s.assignedVolunteers, ...available.map(v => v.volunteerId)]
      };
    }));

    toast({ title: `${available.length} volunteers auto-assigned`, description: "Based on proximity" });
  };

  const getVolunteerById = (id: string) => volunteerList.find(v => v.volunteerId === id);

  return (
    <div className="min-h-screen bg-background">
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
          <Button onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Create Schedule
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Create/Edit Form */}
        {showForm && (
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingScheduleId ? "Edit Schedule" : "Create New Schedule"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Schedule Location</Label>
                  <Input 
                    value={formData.scheduleLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleLocation: e.target.value }))}
                    placeholder="Beach/coastal location"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Debris Target Type</Label>
                  <Input 
                    value={formData.scheduleDebrisTargetType}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleDebrisTargetType: e.target.value }))}
                    placeholder="e.g., Plastic, Mixed"
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
                  <Label>Priority Level</Label>
                  <div className="flex gap-2">
                    {["high", "medium", "low"].map(p => (
                      <Button
                        key={p}
                        type="button"
                        variant={formData.schedulePriorityLevel === p ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, schedulePriorityLevel: p }))}
                        className="capitalize"
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estimated Quantity (kg)</Label>
                  <Input 
                    type="number"
                    value={formData.scheduleEstimatedQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleEstimatedQuantity: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Required Volunteer Count</Label>
                  <Input 
                    type="number"
                    value={formData.scheduleRequiredVolunteerCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleRequiredVolunteerCount: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={editingScheduleId ? handleUpdate : handleCreate}>
                  {editingScheduleId ? "Update Schedule" : "Create Schedule"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Schedules */}
        <section>
          <h2 className="font-display font-semibold text-lg mb-4">Upcoming (Next 7 Days)</h2>
          <div className="space-y-4">
            {upcomingSchedules.map(schedule => (
              <Card 
                key={schedule.scheduleId}
                className={cn(
                  "border-l-4 overflow-hidden",
                  schedule.schedulePriorityLevel === "high" && "border-l-destructive",
                  schedule.schedulePriorityLevel === "medium" && "border-l-warning",
                  schedule.schedulePriorityLevel === "low" && "border-l-muted-foreground"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{schedule.scheduleLocation}</h3>
                        <Badge variant={schedule.schedulePriorityLevel === "high" ? "destructive" : "outline"} className="capitalize">
                          {schedule.schedulePriorityLevel}
                        </Badge>
                        <Badge variant="outline">{schedule.scheduleDebrisTargetType}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {schedule.scheduleLocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {schedule.scheduleDateTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className={cn(
                            "font-medium",
                            schedule.assignedVolunteers.length < schedule.scheduleRequiredVolunteerCount && "text-warning"
                          )}>
                            {schedule.assignedVolunteers.length}/{schedule.scheduleRequiredVolunteerCount}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">volunteers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{schedule.scheduleEstimatedQuantity}kg</p>
                        <p className="text-xs text-muted-foreground">estimated</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant={expandedScheduleId === schedule.scheduleId ? "secondary" : "ghost"} 
                          size="icon"
                          onClick={() => setExpandedScheduleId(expandedScheduleId === schedule.scheduleId ? null : schedule.scheduleId)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(schedule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(schedule.scheduleId)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {schedule.assignedVolunteers.length < schedule.scheduleRequiredVolunteerCount && (
                    <div className="mt-3 p-2 rounded-lg bg-warning/10 flex items-center justify-between text-sm text-warning">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Needs {schedule.scheduleRequiredVolunteerCount - schedule.assignedVolunteers.length} more volunteers
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-warning hover:text-warning"
                        onClick={() => autoAssignVolunteers(schedule.scheduleId)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Auto-Assign
                      </Button>
                    </div>
                  )}

                  {schedule.assignedVolunteers.length > 0 && expandedScheduleId !== schedule.scheduleId && (
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

                  {/* Expanded Volunteer Assignment Panel */}
                  {expandedScheduleId === schedule.scheduleId && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">Assign Volunteers</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => autoAssignVolunteers(schedule.scheduleId)}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Auto-Assign by Proximity
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {volunteerList.map(volunteer => {
                          const isAssigned = schedule.assignedVolunteers.includes(volunteer.volunteerId);
                          return (
                            <div
                              key={volunteer.volunteerId}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors",
                                isAssigned ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                              )}
                              onClick={() => toggleVolunteerAssignment(schedule.scheduleId, volunteer.volunteerId)}
                            >
                              <Checkbox checked={isAssigned} className="pointer-events-none" />
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{volunteer.initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{volunteer.volunteerName}</p>
                                <p className="text-xs text-muted-foreground">{volunteer.proximity}km away</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-medium">{volunteer.volunteerTotalVerifiedWeight}kg</p>
                                <p className="text-[10px] text-muted-foreground">verified</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Completed Schedules */}
        <section>
          <h2 className="font-display font-semibold text-lg mb-4">Completed</h2>
          <div className="space-y-3">
            {completedSchedules.map(schedule => (
              <Card key={schedule.scheduleId} className="border-l-4 border-l-success opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{schedule.scheduleLocation}</h3>
                        <Badge variant="success">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{schedule.scheduleDateTime}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">{schedule.assignedVolunteers.length} volunteers</p>
                        <p className="text-xs text-muted-foreground">{schedule.scheduleEstimatedQuantity}kg collected</p>
                      </div>
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
