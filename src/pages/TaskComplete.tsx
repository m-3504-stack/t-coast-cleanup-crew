import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AnimatedWaves } from "@/components/WaveBackground";
import { useToast } from "@/hooks/use-toast";

const TaskComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [collectedWeight, setCollectedWeight] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock task data
  const task = {
    id: id || "1",
    scheduleName: "Pantai Cenang Beach Cleanup",
    location: "Pantai Cenang, Langkawi",
    debrisTargetType: "Plastic",
    estimatedQuantity: 45,
  };

  const weightPresets = [5, 10, 20, 50];

  const handleAddWeight = (amount: number) => {
    const current = parseFloat(collectedWeight) || 0;
    setCollectedWeight((current + amount).toString());
  };

  const handlePhotoCapture = () => {
    // Simulate photo capture
    const mockPhotoUrl = `https://picsum.photos/seed/${Date.now()}/200/200`;
    setPhotos([...photos, mockPhotoUrl]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!collectedWeight || parseFloat(collectedWeight) <= 0) {
      toast({
        title: "Weight Required",
        description: "Please enter the collected weight.",
        variant: "destructive",
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: "Photo Required",
        description: "Please add at least one photo of the collected debris.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Task Logged! 🎉",
      description: `You've collected ${collectedWeight} kg of debris. Thank you for your contribution!`,
    });

    navigate("/volunteer/history");
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
              onClick={() => navigate(`/volunteer/task/${id}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-heading font-bold">Complete Task</h1>
              <p className="text-sm text-white/70">{task.scheduleName}</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-32 space-y-4">
          {/* Task Info Summary */}
          <Card className="glass-card border-l-4 border-l-ocean-medium">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Target Debris</p>
                  <Badge variant="debris">{task.debrisTargetType}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated</p>
                  <p className="font-bold text-lg">{task.estimatedQuantity} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight Input */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Collected Weight (kg)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="number"
                placeholder="Enter weight in kg"
                value={collectedWeight}
                onChange={(e) => setCollectedWeight(e.target.value)}
                className="text-2xl font-bold text-center h-16"
                autoFocus
              />
              
              {/* Quick Add Buttons */}
              <div className="flex gap-2 flex-wrap">
                {weightPresets.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddWeight(preset)}
                    className="flex-1"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {preset} kg
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo Evidence */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Photo Evidence</CardTitle>
              <p className="text-sm text-muted-foreground">Add before/after photos of the cleanup</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                
                {photos.length < 8 && (
                  <button
                    onClick={handlePhotoCapture}
                    className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 hover:border-ocean-medium hover:bg-ocean-light/10 transition-colors"
                  >
                    <Camera className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add</span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Notes (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any observations or comments about the cleanup..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* GPS Verification Status */}
          <Card className="glass-card bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">GPS Verified</p>
                <p className="text-sm text-muted-foreground">Your location matches the cleanup site</p>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
          <Button 
            className="w-full h-12 text-lg font-heading"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Submit Completion Log
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskComplete;
