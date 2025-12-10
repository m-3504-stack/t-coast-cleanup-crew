import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Target, Users, CloudSun, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedWaves } from "@/components/WaveBackground";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWithinRange, setIsWithinRange] = useState(true); // Simulated - would use real geolocation

  // Mock task data based on ID
  const task = {
    id: id || "1",
    scheduleName: "Pantai Cenang Beach Cleanup",
    location: "Pantai Cenang, Langkawi",
    gpsCoordinates: "6.2867° N, 99.7264° E",
    distance: 0.8, // km from current location
    dateTime: "2024-01-20T09:00:00",
    priorityLevel: "High",
    debrisTargetType: "Plastic",
    estimatedQuantity: 45,
    requiredVolunteers: 8,
    assignedVolunteers: 5,
    weatherForecast: "Partly Cloudy, 28°C",
    status: "Upcoming",
    coordinatorName: "Sarah Ahmad",
    notes: "Focus on the rocky area near the jetty. Bring gloves and sun protection."
  };

  const daysUntil = Math.ceil((new Date(task.dateTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  const getCountdownText = () => {
    if (daysUntil <= 0) return "Today!";
    if (daysUntil === 1) return "Tomorrow";
    return `In ${daysUntil} days`;
  };

  const getCountdownColor = () => {
    if (daysUntil <= 0) return "bg-red-500";
    if (daysUntil === 1) return "bg-orange-500";
    return "bg-ocean-medium";
  };

  const debrisColors: Record<string, string> = {
    Plastic: "border-l-blue-500",
    "Fishing Gear": "border-l-purple-500",
    Metal: "border-l-gray-500",
    Glass: "border-l-green-500",
    Mixed: "border-l-orange-500",
  };

  const handleStartCleanup = () => {
    navigate(`/volunteer/task/${id}/complete`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedWaves />
      
      <div className="relative z-10">
        {/* Header */}
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
              <h1 className="text-lg font-heading font-bold">Task Details</h1>
              <p className="text-sm text-white/70">Schedule #{task.id}</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-24 space-y-4">
          {/* Status Card */}
          <Card className={`glass-card border-l-4 ${debrisColors[task.debrisTargetType] || "border-l-ocean-medium"}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-foreground">{task.scheduleName}</h2>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{task.location}</span>
                  </div>
                </div>
                <Badge className={`${getCountdownColor()} text-white`}>
                  {getCountdownText()}
                </Badge>
              </div>

              {/* Distance indicator */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-ocean-medium" />
                  <span className="text-sm font-medium">{task.distance} km from your location</span>
                </div>
                {task.distance <= 0.3 ? (
                  <Badge variant="success">Within Range</Badge>
                ) : (
                  <Badge variant="outline">Get Closer</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Info */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Schedule Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-ocean-medium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(task.dateTime).toLocaleDateString('en-MY', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-ocean-medium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{new Date(task.dateTime).toLocaleTimeString('en-MY', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <CloudSun className="h-5 w-5 text-ocean-medium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weather Forecast</p>
                  <p className="font-medium">{task.weatherForecast}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Info */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Cleanup Target</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-ocean-medium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Debris Type</p>
                  <Badge variant="debris">{task.debrisTargetType}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Quantity</p>
                  <p className="font-medium">{task.estimatedQuantity} kg</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-ocean-medium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volunteers</p>
                  <p className="font-medium">{task.assignedVolunteers} / {task.requiredVolunteers} assigned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {task.notes && (
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-heading">Coordinator Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{task.notes}</p>
                <p className="text-xs text-muted-foreground mt-2">— {task.coordinatorName}</p>
              </CardContent>
            </Card>
          )}

          {/* Map Preview */}
          <Card className="glass-card overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-ocean-light/30 to-ocean-medium/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-ocean-medium mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{task.gpsCoordinates}</p>
                <Button variant="link" size="sm" className="text-ocean-medium mt-1">
                  Open in Maps
                </Button>
              </div>
            </div>
          </Card>
        </main>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
          <Button 
            className="w-full h-12 text-lg font-heading"
            disabled={task.distance > 0.3}
            onClick={handleStartCleanup}
          >
            {task.distance > 0.3 ? (
              <>
                <Navigation className="mr-2 h-5 w-5" />
                Get Within 300m to Start
              </>
            ) : (
              "Start Cleanup"
            )}
          </Button>
          {task.distance > 0.3 && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              You must be within 300 meters of the location to start cleanup
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
