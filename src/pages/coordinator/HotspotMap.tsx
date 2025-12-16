import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Map, Filter, Layers, TrendingUp, TrendingDown,
  Plus, MapPin, Calendar, ChevronRight, X, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const debrisTypes = ["Plastic", "Metal", "Organic", "Fishing Gear", "Glass", "Mixed"];

const hotspots = [
  { id: "1", name: "Seberang Takir Beach", lat: 5.35, lng: 103.12, density: "high", reportCount: 24, debrisType: "Plastic", trend: 15, quantity: 156 },
  { id: "2", name: "Batu Buruk Beach", lat: 5.28, lng: 103.15, density: "medium", debrisType: "Mixed", reportCount: 12, trend: -5, quantity: 89 },
  { id: "3", name: "Marang Beach", lat: 5.21, lng: 103.20, density: "low", debrisType: "Organic", reportCount: 8, trend: 3, quantity: 45 },
  { id: "4", name: "Dungun Coast", lat: 4.78, lng: 103.42, density: "high", debrisType: "Fishing Gear", reportCount: 31, trend: 22, quantity: 203 },
  { id: "5", name: "Kuala Abang", lat: 4.88, lng: 103.45, density: "medium", debrisType: "Plastic", reportCount: 15, trend: 0, quantity: 78 },
];

export default function HotspotMap() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<typeof hotspots[0] | null>(null);
  const [filters, setFilters] = useState({
    debrisTypes: [] as string[],
    minReports: 0,
    dateRange: "30",
  });
  const [showHeatmap, setShowHeatmap] = useState(true);

  const toggleDebrisType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      debrisTypes: prev.debrisTypes.includes(type) 
        ? prev.debrisTypes.filter(t => t !== type)
        : [...prev.debrisTypes, type]
    }));
  };

  const filteredHotspots = hotspots.filter(h => {
    if (filters.debrisTypes.length > 0 && !filters.debrisTypes.includes(h.debrisType)) return false;
    if (h.reportCount < filters.minReports) return false;
    return true;
  });

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
              <h1 className="font-display font-bold text-lg">Hotspot Map</h1>
              <p className="text-xs text-muted-foreground">{filteredHotspots.length} active clusters</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={showHeatmap ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <Layers className="h-4 w-4 mr-2" />
              Heatmap
            </Button>
            <Button 
              variant={showFilters ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Filter Panel */}
        {showFilters && (
          <aside className="w-80 border-r border-border bg-card p-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Debris Type</Label>
              <div className="flex flex-wrap gap-2">
                {debrisTypes.map(type => (
                  <Badge
                    key={type}
                    variant={filters.debrisTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleDebrisType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Min Report Count</Label>
              <Input
                type="number"
                value={filters.minReports}
                onChange={(e) => setFilters(prev => ({ ...prev, minReports: parseInt(e.target.value) || 0 }))}
                min={0}
              />
            </div>

            <div className="space-y-3">
              <Label>Date Range (days)</Label>
              <div className="flex gap-2">
                {["7", "14", "30", "90"].map(days => (
                  <Button
                    key={days}
                    variant={filters.dateRange === days ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, dateRange: days }))}
                  >
                    {days}d
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setFilters({ debrisTypes: [], minReports: 0, dateRange: "30" })}
            >
              Clear Filters
            </Button>
          </aside>
        )}

        {/* Map Area */}
        <main className="flex-1 relative">
          <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-ocean-light/10 to-ocean-deep/10 relative">
            {/* Simulated map with hotspot markers */}
            <div className="absolute inset-0 p-8">
              {filteredHotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className={cn(
                    "absolute cursor-pointer transition-all hover:scale-110",
                    hotspot.density === "high" && "animate-pulse"
                  )}
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${15 + index * 18}%`,
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <div className={cn(
                    "rounded-full flex items-center justify-center",
                    hotspot.density === "high" && "w-12 h-12 bg-destructive/30",
                    hotspot.density === "medium" && "w-10 h-10 bg-warning/30",
                    hotspot.density === "low" && "w-8 h-8 bg-primary/30",
                  )}>
                    <div className={cn(
                      "rounded-full",
                      hotspot.density === "high" && "w-6 h-6 bg-destructive",
                      hotspot.density === "medium" && "w-5 h-5 bg-warning",
                      hotspot.density === "low" && "w-4 h-4 bg-primary",
                    )} />
                  </div>
                  {showHeatmap && (
                    <div className={cn(
                      "absolute -z-10 rounded-full opacity-20 blur-xl",
                      hotspot.density === "high" && "w-32 h-32 -top-10 -left-10 bg-destructive",
                      hotspot.density === "medium" && "w-24 h-24 -top-7 -left-7 bg-warning",
                      hotspot.density === "low" && "w-16 h-16 -top-4 -left-4 bg-primary",
                    )} />
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <Card className="absolute bottom-4 left-4 p-3">
              <div className="text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span>High density ({'>'}20 reports)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span>Medium (10-20 reports)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Low ({'<'}10 reports)</span>
                </div>
              </div>
            </Card>

            {/* Hotspot Detail Modal */}
            {selectedHotspot && (
              <Card className="absolute top-4 right-4 w-96">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {selectedHotspot.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={
                            selectedHotspot.density === "high" ? "destructive" :
                            selectedHotspot.density === "medium" ? "warning" : "default"
                          }
                        >
                          {selectedHotspot.density} density
                        </Badge>
                        <Badge variant="outline">{selectedHotspot.debrisType}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedHotspot(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{selectedHotspot.reportCount}</p>
                      <p className="text-xs text-muted-foreground">Reports</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{selectedHotspot.quantity}kg</p>
                      <p className="text-xs text-muted-foreground">Estimated</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center gap-1">
                        {selectedHotspot.trend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-destructive" />
                        ) : selectedHotspot.trend < 0 ? (
                          <TrendingDown className="h-4 w-4 text-success" />
                        ) : null}
                        <p className="text-2xl font-bold">{Math.abs(selectedHotspot.trend)}%</p>
                      </div>
                      <p className="text-xs text-muted-foreground">30d Trend</p>
                    </div>
                  </div>

                  {/* Composition Chart (simplified) */}
                  <div>
                    <Label className="text-xs text-muted-foreground">Debris Composition</Label>
                    <div className="mt-2 h-4 rounded-full overflow-hidden bg-muted flex">
                      <div className="h-full bg-debris-plastic" style={{ width: "45%" }} />
                      <div className="h-full bg-debris-organic" style={{ width: "25%" }} />
                      <div className="h-full bg-debris-fishing" style={{ width: "20%" }} />
                      <div className="h-full bg-debris-other" style={{ width: "10%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Plastic 45%</span>
                      <span>Organic 25%</span>
                      <span>Fishing 20%</span>
                      <span>Other 10%</span>
                    </div>
                  </div>

                  {/* 30-day Trend Line (simplified) */}
                  <div>
                    <Label className="text-xs text-muted-foreground">30-Day Report Trend</Label>
                    <div className="mt-2 h-16 flex items-end gap-1">
                      {[3, 5, 4, 7, 6, 8, 9, 7, 10, 8, 9, 11, 10, 12].map((val, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-primary/60 rounded-t"
                          style={{ height: `${(val / 12) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link to={`/coordinator/schedules/new?hotspot=${selectedHotspot.id}`}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Schedule from Hotspot
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
