import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Users, Search, Filter, GripVertical, User,
  MapPin, Calendar, Clock, TrendingUp, History, CheckCircle, XCircle, UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Volunteer {
  volunteerId: string;
  username: string;
  userEmail: string;
  userPreferredLocation: string;
  volunteerTotalVerifiedWeight: number;
  volunteerTotalReportCount: number;
  volunteerAiAccuracyScore: number;
  userLastSeen: string;
  userProfileStatus: "active" | "inactive";
  assignedSchedule?: string;
}

interface CoordinatorRegistration {
  id: string;
  username: string;
  userEmail: string;
  coordinatorOrganization: string;
  coordinatorDepartment: string;
  coordinatorJobScope: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

const volunteers: Volunteer[] = [
  { volunteerId: "v1", username: "Ahmad R.", userEmail: "ahmad@email.com", userPreferredLocation: "Kuala Terengganu", volunteerTotalVerifiedWeight: 156, volunteerTotalReportCount: 24, volunteerAiAccuracyScore: 92, userLastSeen: "2 hours ago", userProfileStatus: "active" },
  { volunteerId: "v2", username: "Fatimah Z.", userEmail: "fatimah@email.com", userPreferredLocation: "Kuala Terengganu", volunteerTotalVerifiedWeight: 234, volunteerTotalReportCount: 31, volunteerAiAccuracyScore: 88, userLastSeen: "1 day ago", userProfileStatus: "active" },
  { volunteerId: "v3", username: "Razak M.", userEmail: "razak@email.com", userPreferredLocation: "Marang", volunteerTotalVerifiedWeight: 198, volunteerTotalReportCount: 28, volunteerAiAccuracyScore: 85, userLastSeen: "3 hours ago", userProfileStatus: "active" },
  { volunteerId: "v4", username: "Siti N.", userEmail: "siti@email.com", userPreferredLocation: "Dungun", volunteerTotalVerifiedWeight: 187, volunteerTotalReportCount: 22, volunteerAiAccuracyScore: 91, userLastSeen: "5 hours ago", userProfileStatus: "active" },
  { volunteerId: "v5", username: "Hafiz A.", userEmail: "hafiz@email.com", userPreferredLocation: "Kemaman", volunteerTotalVerifiedWeight: 78, volunteerTotalReportCount: 12, volunteerAiAccuracyScore: 76, userLastSeen: "1 week ago", userProfileStatus: "inactive" },
  { volunteerId: "v6", username: "Nurul H.", userEmail: "nurul@email.com", userPreferredLocation: "Kuala Terengganu", volunteerTotalVerifiedWeight: 142, volunteerTotalReportCount: 18, volunteerAiAccuracyScore: 89, userLastSeen: "4 hours ago", userProfileStatus: "active" },
];

const coordinatorRegistrations: CoordinatorRegistration[] = [
  { id: "c1", username: "Ali Hassan", userEmail: "ali@gov.my", coordinatorOrganization: "Terengganu Environmental Dept", coordinatorDepartment: "Coastal Management", coordinatorJobScope: "Regional Coordinator", submittedAt: "Dec 8, 2024", status: "pending" },
  { id: "c2", username: "Zainab Omar", userEmail: "zainab@ngo.org", coordinatorOrganization: "Ocean Conservation NGO", coordinatorDepartment: "Field Operations", coordinatorJobScope: "Area Supervisor", submittedAt: "Dec 7, 2024", status: "pending" },
];

export default function VolunteerManagement() {
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get("schedule");
  const [volunteerList] = useState(volunteers);
  const [registrations, setRegistrations] = useState(coordinatorRegistrations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForAssignment, setSelectedForAssignment] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("volunteers");
  const { toast } = useToast();

  const filteredVolunteers = volunteerList.filter(v => 
    v.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.userPreferredLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRegistrations = registrations.filter(r => r.status === "pending");

  const handleAutoAssign = () => {
    const activeVolunteers = volunteerList
      .filter(v => v.userProfileStatus === "active")
      .sort((a, b) => b.volunteerTotalVerifiedWeight - a.volunteerTotalVerifiedWeight)
      .slice(0, 5);
    
    setSelectedForAssignment(activeVolunteers.map(v => v.volunteerId));
    toast({ 
      title: "Auto-assigned 5 volunteers", 
      description: "Selected based on activity and proximity" 
    });
  };

  const handleAssign = () => {
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

  const handleApproveRegistration = (id: string) => {
    setRegistrations(prev => prev.map(r => 
      r.id === id ? { ...r, status: "approved" as const } : r
    ));
    toast({ title: "Registration approved", description: "Coordinator account has been activated" });
  };

  const handleRejectRegistration = (id: string) => {
    setRegistrations(prev => prev.map(r => 
      r.id === id ? { ...r, status: "rejected" as const } : r
    ));
    toast({ title: "Registration rejected", variant: "destructive" });
  };

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
              <h1 className="font-display font-bold text-lg">Volunteer Management</h1>
              <p className="text-xs text-muted-foreground">
                {volunteerList.filter(v => v.userProfileStatus === "active").length} active volunteers • {pendingRegistrations.length} pending registrations
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Volunteers
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Coordinator Registrations
              {pendingRegistrations.length > 0 && (
                <Badge variant="destructive" className="ml-1">{pendingRegistrations.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="volunteers">
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
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Preferred Location</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Verified Weight</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reports</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Accuracy</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Seen</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground w-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredVolunteers.map(volunteer => (
                        <tr 
                          key={volunteer.volunteerId}
                          className={cn(
                            "hover:bg-muted/50 transition-colors",
                            selectedForAssignment.includes(volunteer.volunteerId) && "bg-primary/5",
                            draggedId === volunteer.volunteerId && "opacity-50"
                          )}
                          draggable={!!scheduleId}
                          onDragStart={() => setDraggedId(volunteer.volunteerId)}
                          onDragEnd={() => setDraggedId(null)}
                        >
                          {scheduleId && (
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                <input
                                  type="checkbox"
                                  checked={selectedForAssignment.includes(volunteer.volunteerId)}
                                  onChange={() => toggleSelection(volunteer.volunteerId)}
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
                                <p className="font-medium">{volunteer.username}</p>
                                <p className="text-sm text-muted-foreground">{volunteer.userEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                              {volunteer.userPreferredLocation}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{volunteer.volunteerTotalVerifiedWeight}kg</span>
                              <TrendingUp className="h-3.5 w-3.5 text-success" />
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{volunteer.volunteerTotalReportCount}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full",
                                    volunteer.volunteerAiAccuracyScore >= 85 ? "bg-success" : 
                                    volunteer.volunteerAiAccuracyScore >= 70 ? "bg-warning" : "bg-destructive"
                                  )}
                                  style={{ width: `${volunteer.volunteerAiAccuracyScore}%` }}
                                />
                              </div>
                              <span className="text-sm">{volunteer.volunteerAiAccuracyScore}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {volunteer.userLastSeen}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={volunteer.userProfileStatus === "active" ? "success" : "outline"}>
                              {volunteer.userProfileStatus}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/coordinator/volunteers/${volunteer.volunteerId}/history`}>
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
          </TabsContent>

          <TabsContent value="registrations">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Coordinator Registration Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {registrations.map(reg => (
                    <div key={reg.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{reg.username}</h3>
                              <Badge 
                                variant={
                                  reg.status === "approved" ? "success" :
                                  reg.status === "rejected" ? "destructive" : "outline"
                                }
                              >
                                {reg.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{reg.userEmail}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="flex items-center gap-1">
                                <strong>Organization:</strong> {reg.coordinatorOrganization}
                              </span>
                              <span>•</span>
                              <span><strong>Department:</strong> {reg.coordinatorDepartment}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              <strong>Job Scope:</strong> {reg.coordinatorJobScope}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">Submitted: {reg.submittedAt}</p>
                          </div>
                        </div>
                        
                        {reg.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectRegistration(reg.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm" 
                              variant="success"
                              onClick={() => handleApproveRegistration(reg.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {registrations.length === 0 && (
                    <div className="p-8 text-center">
                      <UserCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="font-medium">No registration requests</p>
                      <p className="text-sm text-muted-foreground">Coordinator registrations will appear here for review</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
