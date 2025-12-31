import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedWaves } from "@/components/WaveBackground";
import { FloatingElements3D } from "@/components/FloatingElements3D";
import { Mail, Lock, User, Building, ArrowRight, CheckCircle, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CoordinatorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    userContactNumber: "",
    coordinatorOrganization: "",
    coordinatorDepartment: "",
    coordinatorJobScope: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.userPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    toast({
      title: "Registration Submitted",
      description: "Your coordinator account is pending approval",
    });
  };

  if (success) {
    return (
      <div className="min-h-screen gradient-sea flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedWaves />
        <FloatingElements3D />
        <Card variant="glass" className="max-w-md w-full text-center animate-slide-up relative z-10">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-ocean flex items-center justify-center animate-pulse-soft">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">Registration Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Your coordinator registration is pending review. You will be notified once approved.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              The admin team will review your application within 1-2 business days.
            </p>
            <Button variant="ocean" onClick={() => navigate("/coordinator-login")}>
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-sea flex flex-col relative overflow-hidden">
      <AnimatedWaves />
      <FloatingElements3D />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Coordinator Registration
            </h1>
          </div>

          <Card variant="glass" className="backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle>Create Coordinator Account</CardTitle>
              <CardDescription>
                Registration requires approval from volunteer management
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        placeholder="Your username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userContactNumber">Contact Number</Label>
                    <Input
                      id="userContactNumber"
                      placeholder="+60123456789"
                      value={formData.userContactNumber}
                      onChange={(e) => handleChange("userContactNumber", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="your@organization.com"
                      className="pl-10"
                      value={formData.userEmail}
                      onChange={(e) => handleChange("userEmail", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="userPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.userPassword}
                        onChange={(e) => handleChange("userPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinatorOrganization">Organization</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="coordinatorOrganization"
                      placeholder="Organization name"
                      className="pl-10"
                      value={formData.coordinatorOrganization}
                      onChange={(e) => handleChange("coordinatorOrganization", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="coordinatorDepartment">Department</Label>
                    <Input
                      id="coordinatorDepartment"
                      placeholder="Department"
                      value={formData.coordinatorDepartment}
                      onChange={(e) => handleChange("coordinatorDepartment", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coordinatorJobScope">Job Scope</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="coordinatorJobScope"
                        placeholder="Your role"
                        className="pl-10"
                        value={formData.coordinatorJobScope}
                        onChange={(e) => handleChange("coordinatorJobScope", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm text-warning">
                    <strong>Note:</strong> Coordinator registrations require approval. You will be notified via email once your account is reviewed.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col gap-3">
                <Button 
                  type="submit" 
                  variant="ocean" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Registration"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/coordinator-login" className="text-primary font-medium hover:underline">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
