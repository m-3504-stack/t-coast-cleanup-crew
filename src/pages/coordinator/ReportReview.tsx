import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, FileText, Check, X, ChevronLeft, ChevronRight,
  MapPin, Calendar, User, ZoomIn, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DebrisReport {
  reportId: string;
  reportVolunteerId: string;
  volunteerName: string;
  reportGpsCoordinates: string;
  reportDebrisType: string;
  reportQuantity: string;
  reportAiConfidenceScore: number;
  reportPhotoUrl: string;
  reportDateTime: string;
  reportStatus: "PENDING" | "VERIFIED" | "REJECTED";
}

const reports: DebrisReport[] = [
  { reportId: "1", reportVolunteerId: "v1", volunteerName: "Ahmad R.", reportGpsCoordinates: "Seberang Takir Beach", reportDebrisType: "Plastic", reportQuantity: "Medium", reportAiConfidenceScore: 92, reportPhotoUrl: "/placeholder.svg", reportDateTime: "Dec 9, 2024 10:23 AM", reportStatus: "PENDING" },
  { reportId: "2", reportVolunteerId: "v2", volunteerName: "Fatimah Z.", reportGpsCoordinates: "Batu Buruk Beach", reportDebrisType: "Mixed", reportQuantity: "High", reportAiConfidenceScore: 78, reportPhotoUrl: "/placeholder.svg", reportDateTime: "Dec 9, 2024 9:45 AM", reportStatus: "PENDING" },
  { reportId: "3", reportVolunteerId: "v3", volunteerName: "Razak M.", reportGpsCoordinates: "Marang Beach", reportDebrisType: "Organic", reportQuantity: "Low", reportAiConfidenceScore: 65, reportPhotoUrl: "/placeholder.svg", reportDateTime: "Dec 8, 2024 4:30 PM", reportStatus: "PENDING" },
  { reportId: "4", reportVolunteerId: "v4", volunteerName: "Siti N.", reportGpsCoordinates: "Dungun Coast", reportDebrisType: "Fishing Gear", reportQuantity: "High", reportAiConfidenceScore: 88, reportPhotoUrl: "/placeholder.svg", reportDateTime: "Dec 8, 2024 2:15 PM", reportStatus: "PENDING" },
  { reportId: "5", reportVolunteerId: "v5", volunteerName: "Hafiz A.", reportGpsCoordinates: "Kuala Abang", reportDebrisType: "Glass", reportQuantity: "Low", reportAiConfidenceScore: 95, reportPhotoUrl: "/placeholder.svg", reportDateTime: "Dec 8, 2024 11:00 AM", reportStatus: "PENDING" },
];

export default function ReportReview() {
  const [reportList, setReportList] = useState(reports);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const { toast } = useToast();

  const activeReport = reportList.find(r => r.reportId === activeReportId);
  const pendingReports = reportList.filter(r => r.reportStatus === "PENDING");

  const toggleSelect = (id: string) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === pendingReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(pendingReports.map(r => r.reportId));
    }
  };

  const handleVerify = (ids: string[]) => {
    setReportList(prev => prev.map(r => 
      ids.includes(r.reportId) ? { ...r, reportStatus: "VERIFIED" as const } : r
    ));
    setSelectedReports([]);
    toast({ title: `${ids.length} report(s) verified`, description: "AI accuracy scores updated" });
  };

  const handleReject = (ids: string[]) => {
    setReportList(prev => prev.map(r => 
      ids.includes(r.reportId) ? { ...r, reportStatus: "REJECTED" as const } : r
    ));
    setSelectedReports([]);
    toast({ title: `${ids.length} report(s) rejected`, variant: "destructive" });
  };

  const navigateReports = (direction: "prev" | "next") => {
    const currentIndex = pendingReports.findIndex(r => r.reportId === activeReportId);
    if (direction === "prev" && currentIndex > 0) {
      setActiveReportId(pendingReports[currentIndex - 1].reportId);
    } else if (direction === "next" && currentIndex < pendingReports.length - 1) {
      setActiveReportId(pendingReports[currentIndex + 1].reportId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeReport) {
      if (e.key === "a" || e.key === "A") handleVerify([activeReport.reportId]);
      if (e.key === "r" || e.key === "R") handleReject([activeReport.reportId]);
      if (e.key === "ArrowLeft") navigateReports("prev");
      if (e.key === "ArrowRight") navigateReports("next");
    }
  };

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/coordinator">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg">Report Review Queue</h1>
              <p className="text-xs text-muted-foreground">{pendingReports.length} pending reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden md:flex">
              Shortcuts: A=Approve, R=Reject, ←→=Navigate
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-96 border-r border-border overflow-y-auto">
          {selectedReports.length > 0 && (
            <div className="sticky top-0 bg-primary/10 border-b border-border p-3 flex items-center gap-3">
              <span className="text-sm font-medium">{selectedReports.length} selected</span>
              <div className="flex-1" />
              <Button size="sm" variant="success" onClick={() => handleVerify(selectedReports)}>
                <Check className="h-4 w-4 mr-1" />
                Verify All
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleReject(selectedReports)}>
                <X className="h-4 w-4 mr-1" />
                Reject All
              </Button>
            </div>
          )}

          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedReports.length === pendingReports.length && pendingReports.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Select all pending</span>
            </div>
          </div>

          <div className="divide-y divide-border">
            {reportList.map(report => (
              <div
                key={report.reportId}
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  activeReportId === report.reportId && "bg-primary/5 border-l-4 border-l-primary",
                  report.reportStatus !== "PENDING" && "opacity-50"
                )}
                onClick={() => setActiveReportId(report.reportId)}
              >
                <div className="flex items-start gap-3">
                  {report.reportStatus === "PENDING" && (
                    <Checkbox
                      checked={selectedReports.includes(report.reportId)}
                      onCheckedChange={() => toggleSelect(report.reportId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{report.reportGpsCoordinates}</span>
                      {report.reportAiConfidenceScore < 70 && (
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{report.volunteerName}</span>
                      <span>•</span>
                      <span>{report.reportDebrisType}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={
                          report.reportStatus === "VERIFIED" ? "success" :
                          report.reportStatus === "REJECTED" ? "destructive" : "outline"
                        }
                        className="text-xs"
                      >
                        {report.reportStatus.toLowerCase()}
                      </Badge>
                      <Badge 
                        variant={report.reportAiConfidenceScore >= 70 ? "outline" : "warning"}
                        className="text-xs"
                      >
                        {report.reportAiConfidenceScore}% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {activeReport ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateReports("prev")}
                  disabled={pendingReports.findIndex(r => r.reportId === activeReportId) === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {pendingReports.findIndex(r => r.reportId === activeReportId) + 1} of {pendingReports.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateReports("next")}
                  disabled={pendingReports.findIndex(r => r.reportId === activeReportId) === pendingReports.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Report Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden relative group">
                      <img 
                        src={activeReport.reportPhotoUrl} 
                        alt="Debris report"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                        <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="h-4 w-4 mr-2" />
                          Zoom
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">AI Classification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                      <img 
                        src={activeReport.reportPhotoUrl} 
                        alt="AI classification"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-8 border-2 border-primary border-dashed rounded-lg">
                        <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          {activeReport.reportDebrisType} ({activeReport.reportAiConfidenceScore}%)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Volunteer</p>
                      <p className="font-medium">{activeReport.volunteerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{activeReport.reportGpsCoordinates}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date/Time</p>
                      <p className="font-medium">{activeReport.reportDateTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-medium">{activeReport.reportQuantity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {activeReport.reportStatus === "PENDING" && (
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="destructive"
                    onClick={() => handleReject([activeReport.reportId])}
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject (R)
                  </Button>
                  <Button 
                    size="lg" 
                    variant="success"
                    onClick={() => handleVerify([activeReport.reportId])}
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Verify (A)
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-display font-semibold mb-1">Select a Report</h3>
                <p className="text-sm text-muted-foreground">Choose a report from the list to review</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
