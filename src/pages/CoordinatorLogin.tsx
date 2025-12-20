import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingElements3D } from "@/components/FloatingElements3D";
import { Mail, Lock, ArrowRight, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CoordinatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome, Coordinator!",
      description: "Successfully logged in to T-COAST Dashboard",
    });
    
    navigate("/coordinator");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col relative overflow-hidden">
      <FloatingElements3D />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Coordinator Portal
            </h1>
            <p className="text-muted-foreground">
              T-COAST Management Dashboard
            </p>
          </div>

          <Card className="backdrop-blur-xl border-primary/20">
            <CardHeader className="text-center pb-4">
              <CardTitle>Coordinator Login</CardTitle>
              <CardDescription>
                Access the cleanup coordination dashboard
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="coordinator@tcoast.gov.my"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
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
                  {isLoading ? "Signing in..." : "Access Dashboard"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Link 
                  to="/login"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Volunteer Login
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
