import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, ArrowLeft, MapPin, RefreshCw, Check, 
  AlertTriangle, Package, Truck, ShoppingBag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Step = "camera" | "classifying" | "confirm";
type Quantity = "low" | "medium" | "high";

const quantityOptions = [
  { value: "low" as Quantity, label: "Low", icon: ShoppingBag, description: "1 bag" },
  { value: "medium" as Quantity, label: "Medium", icon: Package, description: "2-3 bags" },
  { value: "high" as Quantity, label: "High", icon: Truck, description: "Truck load" },
];

export default function DebrisReport() {
  const [step, setStep] = useState<Step>("camera");
  const [classificationResult, setClassificationResult] = useState({
    type: "Plastic",
    confidence: 87,
  });
  const [quantity, setQuantity] = useState<Quantity>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCapture = () => {
    setStep("classifying");
    // Simulate AI classification
    setTimeout(() => {
      setClassificationResult({
        type: "Plastic",
        confidence: 87,
      });
      setStep("confirm");
    }, 2000);
  };

  const handleRetake = () => {
    setStep("camera");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Report Sent Successfully! 🎉",
      description: "+10 XP earned!",
    });
    
    navigate("/volunteer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/volunteer">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-display font-semibold text-lg">New Debris Report</h1>
        </div>
      </header>

      <main className="container max-w-lg mx-auto px-4 py-6">
        {step === "camera" && (
          <div className="space-y-6 animate-fade-in">
            {/* Camera Preview */}
            <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border-2 border-dashed border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Tap to capture debris photo</p>
                </div>
              </div>
              {/* Camera grid overlay */}
              <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-primary/20" />
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Position the debris in the center of the frame
              </p>
              <Badge variant="glass" className="gap-1">
                <MapPin className="h-3 w-3" />
                GPS: 5.3117° N, 103.1324° E
              </Badge>
            </div>

            <Button 
              variant="ocean" 
              size="xl" 
              className="w-full"
              onClick={handleCapture}
            >
              <Camera className="h-5 w-5" />
              Capture Photo
            </Button>
          </div>
        )}

        {step === "classifying" && (
          <div className="space-y-8 text-center py-12 animate-fade-in">
            <div className="w-24 h-24 mx-auto rounded-2xl gradient-ocean flex items-center justify-center animate-pulse-soft">
              <RefreshCw className="h-12 w-12 text-primary-foreground animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-display font-bold">Detecting debris...</h2>
              <p className="text-muted-foreground">AI is analyzing your photo</p>
            </div>
            <Progress value={66} className="max-w-xs mx-auto" />
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6 animate-slide-up">
            {/* Captured Image Preview */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-16 w-16 text-primary/30" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <Card variant="glass">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Classified as</p>
                      <p className="font-display font-bold text-lg">{classificationResult.type}</p>
                    </div>
                    <Badge 
                      variant={classificationResult.confidence >= 70 ? "success" : "warning"}
                      className="gap-1"
                    >
                      {classificationResult.confidence >= 70 ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {classificationResult.confidence}% confidence
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>

            {classificationResult.confidence < 70 && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning">Low confidence detection</p>
                  <p className="text-muted-foreground">Consider retaking the photo for better accuracy</p>
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Estimated Quantity</label>
              <div className="grid grid-cols-3 gap-3">
                {quantityOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setQuantity(option.value)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        quantity === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Icon className={cn(
                        "h-8 w-8 mx-auto mb-2",
                        quantity === option.value ? "text-primary" : "text-muted-foreground"
                      )} />
                      <p className="font-medium text-sm">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPS Location */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">GPS Location</p>
                  <p className="text-xs text-muted-foreground">5.3117° N, 103.1324° E</p>
                </div>
                <Badge variant="success">Auto-detected</Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="lg" className="flex-1" onClick={handleRetake}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake
              </Button>
              <Button 
                variant="ocean" 
                size="lg" 
                className="flex-1"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Confirm & Send"}
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
