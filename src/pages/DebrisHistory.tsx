import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, Calendar, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface DebrisReport {
  reportId: string;
  reportPhotoUrl: string;
  reportGpsCoordinates: string;
  reportDebrisType: string;
  reportQuantity: string;
  reportAiConfidenceScore: number;
  reportStatus: "PENDING" | "VERIFIED" | "REJECTED";
  reportDateTime: string;
  reportIsOfflineSync: boolean;
}

const DebrisHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reports, setReports] = useState<DebrisReport[]>([
    {
      reportId: "1",
      reportPhotoUrl: "/placeholder.svg",
      reportGpsCoordinates: "5.3117,103.1324",
      reportDebrisType: "Plastic",
      reportQuantity: "High",
      reportAiConfidenceScore: 92,
      reportStatus: "VERIFIED",
      reportDateTime: "2024-01-15T10:30:00",
      reportIsOfflineSync: false,
    },
    {
      reportId: "2",
      reportPhotoUrl: "/placeholder.svg",
      reportGpsCoordinates: "5.2845,103.1456",
      reportDebrisType: "Mixed",
      reportQuantity: "Medium",
      reportAiConfidenceScore: 78,
      reportStatus: "PENDING",
      reportDateTime: "2024-01-14T14:15:00",
      reportIsOfflineSync: true,
    },
    {
      reportId: "3",
      reportPhotoUrl: "/placeholder.svg",
      reportGpsCoordinates: "5.3256,103.1189",
      reportDebrisType: "Fishing Gear",
      reportQuantity: "Low",
      reportAiConfidenceScore: 65,
      reportStatus: "REJECTED",
      reportDateTime: "2024-01-12T09:45:00",
      reportIsOfflineSync: false,
    },
    {
      reportId: "4",
      reportPhotoUrl: "/placeholder.svg",
      reportGpsCoordinates: "5.2989,103.1567",
      reportDebrisType: "Organic",
      reportQuantity: "High",
      reportAiConfidenceScore: 88,
      reportStatus: "VERIFIED",
      reportDateTime: "2024-01-10T16:20:00",
      reportIsOfflineSync: false,
    },
  ]);

  const handleDelete = (reportId: string) => {
    setReports(prev => prev.filter(r => r.reportId !== reportId));
    toast({ title: "Report deleted", variant: "destructive" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <Badge variant="success">Verified</Badge>;
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getQuantityColor = (quantity: string) => {
    switch (quantity) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-success";
      default:
        return "text-muted-foreground";
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
              <h1 className="text-lg font-heading font-bold">Debris Reports</h1>
              <p className="text-sm text-white/70">{reports.length} reports submitted</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-8 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-success">
                  {reports.filter(r => r.reportStatus === "VERIFIED").length}
                </p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-warning">
                  {reports.filter(r => r.reportStatus === "PENDING").length}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-destructive">
                  {reports.filter(r => r.reportStatus === "REJECTED").length}
                </p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </CardContent>
            </Card>
          </div>

          {/* Report List */}
          <div className="space-y-3">
            {reports.map((report) => (
              <Card key={report.reportId} className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Photo */}
                    <div className="w-24 h-24 bg-muted flex-shrink-0 relative">
                      <img 
                        src={report.reportPhotoUrl} 
                        alt="Debris"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1">
                        <Camera className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                      {report.reportIsOfflineSync && (
                        <div className="absolute top-1 left-1 bg-warning/90 rounded px-1 py-0.5">
                          <span className="text-[10px] text-white font-medium">Offline</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{report.reportDebrisType}</span>
                            {report.reportAiConfidenceScore < 70 && (
                              <AlertTriangle className="h-4 w-4 text-warning" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{report.reportGpsCoordinates}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusBadge(report.reportStatus)}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Report?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this debris report.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(report.reportId)} 
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 text-xs">
                          <span className={`font-medium ${getQuantityColor(report.reportQuantity)}`}>
                            {report.reportQuantity}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {report.reportAiConfidenceScore}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.reportDateTime).toLocaleDateString('en-MY', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reports.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="font-medium">No reports yet</p>
                <p className="text-sm text-muted-foreground">Start by submitting your first debris report</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default DebrisHistory;
