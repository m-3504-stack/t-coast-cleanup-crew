import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedWaves } from "@/components/WaveBackground";
import { Camera, ClipboardList, Trophy, ArrowRight, ArrowLeft } from "lucide-react";

const onboardingSteps = [
  {
    icon: Camera,
    title: "Report Debris",
    description: "Spot marine debris? Snap a photo and our AI will instantly classify it. Help us map pollution hotspots along Terengganu's beautiful coastline.",
    color: "bg-primary",
  },
  {
    icon: ClipboardList,
    title: "Get Assigned Tasks",
    description: "Based on your location and availability, you'll receive cleanup tasks. Complete them and log your collected weight to verify your impact.",
    color: "bg-accent",
  },
  {
    icon: Trophy,
    title: "Earn Badges & Leaderboard",
    description: "Gain XP for every report and cleanup. Unlock badges like 'Plastic Slayer' and 'Ghost Net Buster'. Climb the leaderboard and become an Ocean Champion!",
    color: "bg-warning",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate("/volunteer");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen gradient-sea flex flex-col relative overflow-hidden">
      <AnimatedWaves />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="mb-8">
          <Logo size="md" />
        </div>

        <div className="w-full max-w-md">
          <Card variant="glass" className="backdrop-blur-xl overflow-hidden">
            <CardContent className="pt-8 pb-8 text-center">
              <div 
                key={currentStep}
                className="animate-slide-up"
              >
                <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl ${step.color} flex items-center justify-center shadow-lg animate-float`}>
                  <Icon className="h-12 w-12 text-primary-foreground" />
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-4">{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 px-4">
                  {step.description}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? "w-8 bg-primary" 
                        : index < currentStep 
                          ? "w-2 bg-primary/50" 
                          : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button variant="outline" size="lg" onClick={handlePrev} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button 
                  variant="ocean" 
                  size="lg" 
                  onClick={handleNext}
                  className={currentStep === 0 ? "w-full" : "flex-1"}
                >
                  {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <button 
            onClick={() => navigate("/volunteer")}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            Skip onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
