import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Users, Search, Filter, GripVertical, User,
  MapPin, Calendar, Clock, TrendingUp, History, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  location: string;
  totalVerifiedWeight: number;
  totalReports: number;
  aiAccuracy: number;
  lastActive: string;
  status: "active" | "inactive";
  assignedSchedule?: string;
}

const volunteers: Volunteer[] = [
  { id: "v1", name: "Ahmad R.", email: "ahmad@email.com", location: "Kuala Terengganu", totalVerifiedWeight: 156, totalReports: 24, aiAccuracy: 92, lastActive: "2 hours ago", status: "active" },
  { id: "v2", name: "Fatimah Z.", email: "fatimah@email.com", location: "Kuala Terengganu", totalVerifiedWeight: 234, totalReports: 31, aiAccuracy: 88, lastActive: "1 day ago", status: "active" },
  { id: "v3", name: "Razak M.", email: "razak@email.com", location: "Marang", totalVerifiedWeight: 198, totalReports: 28, aiAccuracy: 85, lastActive: "3 hours ago", status: "active" },
  { id: "v4", name: "Siti N.", email: "siti@email.com", location: "Dungun", totalVerifiedWeight: 187, totalReports: 22, aiAccuracy: 91, lastActive: "5 hours ago", status: "active" },
  { id: "v5", name: "Hafiz A.", email: "hafiz@email.com", location: "Kemaman", totalVerifiedWeight: 78, totalReports: 12, aiAccuracy: 76, lastActive: "1 week ago", status: "inactive" },
  { id: "v6", name: "Nurul H.", email: "nurul@email.com", location: "Kuala Terengganu", totalVerifiedWeight: 142, totalReports: 18, aiAccuracy: 89, lastActive: "4 hours ago", status: "active" },
];

export default function VolunteerManagement() {
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get("schedule");
  const [volunteerList, setVolunteerList] = useState(volunteers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForAssignment, setSelectedForAssignment] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredVolunteers = volunteerList.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutoAssign = () => {
    const activeVolunteers = volunteerList
      .filter(v => v.status === "active")
      .sort((a, b) => b.totalVerifiedWeight - a.totalVerifiedWeight)
      .slice(0, 5);
    
    setSelectedForAssignment(activeVolunteers.map(v => v.id));
    toast({ 
      title: "Auto-assigned 5 volunteers", 
      description: "Selected based on activity and proximity" 
    });
  };

  const handleAssign = () => {
    setVolunteerList(prev => prev.map(v => ({
      ...v,
      assignedSchedule: selectedForAssignment.includes(v.id) ? scheduleId || "schedule-1" : v.assignedSchedule
    })));
    toast({ 
      title: `${selectedForAssignment.length} volunteers assigned`, 
      description: "They will receive notifications" 
    });
    setSelectedForAssignment([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedForAssignment(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
              <h1 className="font-display font-bold text-lg">Volunteer Management</h1>
              <p className="text-xs text-muted-foreground">
                {volunteerList.filter(v => v.status === "active").length} active volunteers
              </p>
            </div>
          </div>
          {scheduleId && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleAutoAssign}>
                Auto-Assign
              </Button>
              {selectedForAssignment.length > 0 && (
                <Button onClick={handleAssign}>
                  Assign {selectedForAssignment.length} Volunteers
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {scheduleId && (
          <Card className="mb-6 border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Assigning volunteers for schedule</p>
                  <p className="text-sm text-muted-foreground">Select volunteers or use auto-assign based on activity and location</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search volunteers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Volunteer Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              All Volunteers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {scheduleId && <th className="text-left p-4 text-sm font-medium text-muted-foreground w-10"></th>}
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Volunteer</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Verified Weight</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reports</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Accuracy</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredVolunteers.map(volunteer => (
                    <tr 
                      key={volunteer.id}
                      className={cn(
                        "hover:bg-muted/50 transition-colors",
                        selectedForAssignment.includes(volunteer.id) && "bg-primary/5",
                        draggedId === volunteer.id && "opacity-50"
                      )}
                      draggable={!!scheduleId}
                      onDragStart={() => setDraggedId(volunteer.id)}
                      onDragEnd={() => setDraggedId(null)}
                    >
                      {scheduleId && (
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            <input
                              type="checkbox"
                              checked={selectedForAssignment.includes(volunteer.id)}
                              onChange={() => toggleSelection(volunteer.id)}
                              className="rounded"
                            />
                          </div>
                        </td>
                      )}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {volunteer.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{volunteer.totalVerifiedWeight}kg</span>
                          <TrendingUp className="h-3.5 w-3.5 text-success" />
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{volunteer.totalReports}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                volunteer.aiAccuracy >= 85 ? "bg-success" : 
                                volunteer.aiAccuracy >= 70 ? "bg-warning" : "bg-destructive"
                              )}
                              style={{ width: `${volunteer.aiAccuracy}%` }}
                            />
                          </div>
                          <span className="text-sm">{volunteer.aiAccuracy}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {volunteer.lastActive}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={volunteer.status === "active" ? "success" : "outline"}>
                          {volunteer.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/coordinator/volunteers/${volunteer.id}/history`}>
                            <History className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
