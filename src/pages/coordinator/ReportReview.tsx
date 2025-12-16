import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, FileText, Check, X, ChevronLeft, ChevronRight,
  MapPin, Calendar, User, Pencil, ZoomIn, RotateCcw, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  volunteerId: string;
  volunteerName: string;
  location: string;
  debrisType: string;
  quantity: string;
  confidence: number;
  photoUrl: string;
  dateTime: string;
  status: "pending" | "verified" | "rejected";
}

const reports: Report[] = [
  { id: "1", volunteerId: "v1", volunteerName: "Ahmad R.", location: "Seberang Takir Beach", debrisType: "Plastic", quantity: "Medium", confidence: 92, photoUrl: "/placeholder.svg", dateTime: "Dec 9, 2024 10:23 AM", status: "pending" },
  { id: "2", volunteerId: "v2", volunteerName: "Fatimah Z.", location: "Batu Buruk Beach", debrisType: "Mixed", quantity: "High", confidence: 78, photoUrl: "/placeholder.svg", dateTime: "Dec 9, 2024 9:45 AM", status: "pending" },
  { id: "3", volunteerId: "v3", volunteerName: "Razak M.", location: "Marang Beach", debrisType: "Organic", quantity: "Low", confidence: 65, photoUrl: "/placeholder.svg", dateTime: "Dec 8, 2024 4:30 PM", status: "pending" },
  { id: "4", volunteerId: "v4", volunteerName: "Siti N.", location: "Dungun Coast", debrisType: "Fishing Gear", quantity: "High", confidence: 88, photoUrl: "/placeholder.svg", dateTime: "Dec 8, 2024 2:15 PM", status: "pending" },
  { id: "5", volunteerId: "v5", volunteerName: "Hafiz A.", location: "Kuala Abang", debrisType: "Glass", quantity: "Low", confidence: 95, photoUrl: "/placeholder.svg", dateTime: "Dec 8, 2024 11:00 AM", status: "pending" },
];

export default function ReportReview() {
  const [reportList, setReportList] = useState(reports);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [showCorrectionTool, setShowCorrectionTool] = useState(false);
  const { toast } = useToast();

  const activeReport = reportList.find(r => r.id === activeReportId);
  const pendingReports = reportList.filter(r => r.status === "pending");

  const toggleSelect = (id: string) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === pendingReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(pendingReports.map(r => r.id));
    }
  };

  const handleVerify = (ids: string[]) => {
    setReportList(prev => prev.map(r => 
      ids.includes(r.id) ? { ...r, status: "verified" as const } : r
    ));
    setSelectedReports([]);
    toast({ title: `${ids.length} report(s) verified`, description: "AI accuracy scores updated" });
  };

  const handleReject = (ids: string[]) => {
    setReportList(prev => prev.map(r => 
      ids.includes(r.id) ? { ...r, status: "rejected" as const } : r
    ));
    setSelectedReports([]);
    toast({ title: `${ids.length} report(s) rejected`, variant: "destructive" });
  };

  const navigateReports = (direction: "prev" | "next") => {
    const currentIndex = pendingReports.findIndex(r => r.id === activeReportId);
    if (direction === "prev" && currentIndex > 0) {
      setActiveReportId(pendingReports[currentIndex - 1].id);
    } else if (direction === "next" && currentIndex < pendingReports.length - 1) {
      setActiveReportId(pendingReports[currentIndex + 1].id);
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeReport) {
      if (e.key === "a" || e.key === "A") handleVerify([activeReport.id]);
      if (e.key === "r" || e.key === "R") handleReject([activeReport.id]);
      if (e.key === "ArrowLeft") navigateReports("prev");
      if (e.key === "ArrowRight") navigateReports("next");
    }
  };

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown} tabIndex={0}>
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
        {/* Report List */}
        <aside className="w-96 border-r border-border overflow-y-auto">
          {/* Bulk Actions */}
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
                key={report.id}
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  activeReportId === report.id && "bg-primary/5 border-l-4 border-l-primary",
                  report.status !== "pending" && "opacity-50"
                )}
                onClick={() => setActiveReportId(report.id)}
              >
                <div className="flex items-start gap-3">
                  {report.status === "pending" && (
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => toggleSelect(report.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{report.location}</span>
                      {report.confidence < 70 && (
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{report.volunteerName}</span>
                      <span>•</span>
                      <span>{report.debrisType}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={
                          report.status === "verified" ? "success" :
                          report.status === "rejected" ? "destructive" : "outline"
                        }
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                      <Badge 
                        variant={report.confidence >= 70 ? "outline" : "warning"}
                        className="text-xs"
                      >
                        {report.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Review Panel */}
        <main className="flex-1 overflow-y-auto">
          {activeReport ? (
            <div className="p-6 space-y-6">
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateReports("prev")}
                  disabled={pendingReports.findIndex(r => r.id === activeReportId) === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {pendingReports.findIndex(r => r.id === activeReportId) + 1} of {pendingReports.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateReports("next")}
                  disabled={pendingReports.findIndex(r => r.id === activeReportId) === pendingReports.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Side by Side View */}
              <div className="grid grid-cols-2 gap-6">
                {/* Original Photo */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Original Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden relative group">
                      <img 
                        src={activeReport.photoUrl} 
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

                {/* AI Classification */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">AI Classification</CardTitle>
                      <Button 
                        variant={showCorrectionTool ? "secondary" : "outline"} 
                        size="sm"
                        onClick={() => setShowCorrectionTool(!showCorrectionTool)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Correction Tool
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                      <img 
                        src={activeReport.photoUrl} 
                        alt="AI classification"
                        className="w-full h-full object-cover"
                      />
                      {/* Simulated bounding box */}
                      <div className="absolute inset-8 border-2 border-primary border-dashed rounded-lg">
                        <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          {activeReport.debrisType} ({activeReport.confidence}%)
                        </div>
                      </div>
                      {showCorrectionTool && (
                        <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-2">Draw to correct classification area</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reset
                            </Button>
                            <Button size="sm">
                              Apply Correction
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Details */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Volunteer</p>
                      <p className="font-medium">{activeReport.volunteerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{activeReport.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date/Time</p>
                      <p className="font-medium">{activeReport.dateTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="font-medium">{activeReport.quantity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {activeReport.status === "pending" && (
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="destructive"
                    onClick={() => handleReject([activeReport.id])}
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject (R)
                  </Button>
                  <Button 
                    size="lg" 
                    variant="success"
                    onClick={() => handleVerify([activeReport.id])}
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
