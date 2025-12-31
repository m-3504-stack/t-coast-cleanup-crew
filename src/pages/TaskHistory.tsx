import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Check, Clock, TrendingUp, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedWaves } from "@/components/WaveBackground";
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

interface TaskCompletionLog {
  taskLogId: string;
  scheduleName: string;
  scheduleLocation: string;
  completedAt: string;
  taskCollectedWeight: number;
  taskVerifiedWeight: number;
  taskStatus: "verified" | "pending" | "rejected";
  debrisType: string;
  taskNotes: string;
}

const TaskHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("completed");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ taskCollectedWeight: 0, taskNotes: "" });

  const [taskLogs, setTaskLogs] = useState<TaskCompletionLog[]>([
    {
      taskLogId: "1",
      scheduleName: "Pantai Cenang Cleanup",
      scheduleLocation: "Pantai Cenang, Langkawi",
      completedAt: "2024-01-15T14:30:00",
      taskCollectedWeight: 25,
      taskVerifiedWeight: 24,
      taskStatus: "verified",
      debrisType: "Plastic",
      taskNotes: "Collected mostly plastic bottles",
    },
    {
      taskLogId: "2",
      scheduleName: "Tanjung Rhu Morning",
      scheduleLocation: "Tanjung Rhu, Langkawi",
      completedAt: "2024-01-12T11:00:00",
      taskCollectedWeight: 18,
      taskVerifiedWeight: 18,
      taskStatus: "verified",
      debrisType: "Mixed",
      taskNotes: "",
    },
    {
      taskLogId: "3",
      scheduleName: "Teluk Datai Sweep",
      scheduleLocation: "Teluk Datai, Langkawi",
      completedAt: "2024-01-10T09:30:00",
      taskCollectedWeight: 32,
      taskVerifiedWeight: 0,
      taskStatus: "pending",
      debrisType: "Fishing Gear",
      taskNotes: "Found abandoned fishing nets",
    },
    {
      taskLogId: "4",
      scheduleName: "Pantai Kok Weekend",
      scheduleLocation: "Pantai Kok, Langkawi",
      completedAt: "2024-01-08T16:00:00",
      taskCollectedWeight: 15,
      taskVerifiedWeight: 14,
      taskStatus: "verified",
      debrisType: "Glass",
      taskNotes: "",
    },
  ]);

  const impactStats = {
    volunteerTotalVerifiedWeight: 87,
    volunteerTotalReportCount: 12,
    nextBadgeWeight: 100,
    volunteerAiAccuracyScore: 82,
    completedTasks: 15,
    pendingVerification: 2,
  };

  const progressToNextBadge = (impactStats.volunteerTotalVerifiedWeight / impactStats.nextBadgeWeight) * 100;

  const handleEdit = (task: TaskCompletionLog) => {
    setEditingId(task.taskLogId);
    setEditForm({ taskCollectedWeight: task.taskCollectedWeight, taskNotes: task.taskNotes });
  };

  const handleSaveEdit = (taskLogId: string) => {
    setTaskLogs(prev => prev.map(t => 
      t.taskLogId === taskLogId 
        ? { ...t, taskCollectedWeight: editForm.taskCollectedWeight, taskNotes: editForm.taskNotes }
        : t
    ));
    setEditingId(null);
    toast({ title: "Task log updated", description: "Your changes have been saved" });
  };

  const handleDelete = (taskLogId: string) => {
    setTaskLogs(prev => prev.filter(t => t.taskLogId !== taskLogId));
    toast({ title: "Task log deleted", variant: "destructive" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="success">Verified</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedWaves />
      
      <div className="relative z-10">
        <header className="bg-ocean-deep/95 backdrop-blur-sm text-white p-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/volunteer")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-heading font-bold">Task History</h1>
              <p className="text-sm text-white/70">Your cleanup journey</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-8 space-y-4">
          {/* Impact Summary */}
          <Card className="glass-card overflow-hidden">
            <div className="bg-gradient-to-r from-ocean-deep to-ocean-medium p-4 text-white">
              <h2 className="font-heading font-bold text-lg mb-1">Your Impact</h2>
              <p className="text-white/70 text-sm">Making our oceans cleaner, one cleanup at a time</p>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${progressToNextBadge * 3.52} 352`}
                      className="text-ocean-medium transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{impactStats.volunteerTotalVerifiedWeight}</span>
                    <span className="text-sm text-muted-foreground">kg verified</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress to 100kg Badge</span>
                  <span className="font-medium">{Math.round(progressToNextBadge)}%</span>
                </div>
                <Progress value={progressToNextBadge} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {impactStats.nextBadgeWeight - impactStats.volunteerTotalVerifiedWeight} kg more to unlock 🏅 Centurion Badge
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.completedTasks}</p>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.volunteerTotalReportCount}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-ocean-medium">{impactStats.volunteerAiAccuracyScore}%</p>
                  <p className="text-xs text-muted-foreground">AI Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({taskLogs.filter(t => t.taskStatus === "pending").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="completed" className="space-y-3 mt-4">
              {taskLogs.filter(t => t.taskStatus === "verified").map((task) => (
                <Card key={task.taskLogId} className="glass-card">
                  <CardContent className="p-4">
                    {editingId === task.taskLogId ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Collected Weight (kg)</Label>
                          <Input
                            type="number"
                            value={editForm.taskCollectedWeight}
                            onChange={(e) => setEditForm(f => ({ ...f, taskCollectedWeight: parseFloat(e.target.value) || 0 }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={editForm.taskNotes}
                            onChange={(e) => setEditForm(f => ({ ...f, taskNotes: e.target.value }))}
                            placeholder="Add notes..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveEdit(task.taskLogId)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{task.scheduleName}</h3>
                            <p className="text-sm text-muted-foreground">{task.scheduleLocation}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(task.taskStatus)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Task Log?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this task log.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(task.taskLogId)} className="bg-destructive text-destructive-foreground">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(task.completedAt).toLocaleDateString('en-MY', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <Badge variant="debris">{task.debrisType}</Badge>
                        </div>

                        {task.taskNotes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{task.taskNotes}"</p>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">Collected</p>
                            <p className="font-bold">{task.taskCollectedWeight} kg</p>
                          </div>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Verified</p>
                            <p className="font-bold text-green-600">{task.taskVerifiedWeight} kg</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {taskLogs.filter(t => t.taskStatus === "pending").map((task) => (
                <Card key={task.taskLogId} className="glass-card border-l-4 border-l-amber-400">
                  <CardContent className="p-4">
                    {editingId === task.taskLogId ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Collected Weight (kg)</Label>
                          <Input
                            type="number"
                            value={editForm.taskCollectedWeight}
                            onChange={(e) => setEditForm(f => ({ ...f, taskCollectedWeight: parseFloat(e.target.value) || 0 }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={editForm.taskNotes}
                            onChange={(e) => setEditForm(f => ({ ...f, taskNotes: e.target.value }))}
                            placeholder="Add notes..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveEdit(task.taskLogId)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{task.scheduleName}</h3>
                            <p className="text-sm text-muted-foreground">{task.scheduleLocation}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(task.taskStatus)}
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Task Log?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this task log.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(task.taskLogId)} className="bg-destructive text-destructive-foreground">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(task.completedAt).toLocaleDateString('en-MY', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <Badge variant="debris">{task.debrisType}</Badge>
                        </div>

                        {task.taskNotes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{task.taskNotes}"</p>
                        )}

                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            Submitted: <span className="font-medium">{task.taskCollectedWeight} kg</span>
                          </p>
                          <p className="text-xs text-amber-600 mt-1">Awaiting coordinator verification</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}

              {taskLogs.filter(t => t.taskStatus === "pending").length === 0 && (
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <Check className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">No pending verifications</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TaskHistory;
