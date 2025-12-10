import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { AnimatedWaves } from "@/components/WaveBackground";
import { ArrowRight, Waves, Users, BarChart3, MapPin, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="relative z-20 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="ocean" asChild>
              <Link to="/register">Join Now</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-12 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Coastal Cleanup</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Protect Terengganu's{" "}
            <span className="text-gradient-ocean">Beautiful Coastline</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the T-COAST movement. Report marine debris with AI classification, 
            participate in organized cleanups, and track your environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="ocean" size="xl" asChild>
              <Link to="/register">
                Become a Volunteer
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/login">
                Coordinator Login
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-ocean flex items-center justify-center">
              <Waves className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">AI Classification</h3>
            <p className="text-sm text-muted-foreground">
              Instant debris identification using TensorFlow Lite for accurate reporting
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center">
              <MapPin className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Hotspot Mapping</h3>
            <p className="text-sm text-muted-foreground">
              Real-time pollution hotspot visualization for targeted cleanup operations
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-warning flex items-center justify-center">
              <BarChart3 className="h-7 w-7 text-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Track Impact</h3>
            <p className="text-sm text-muted-foreground">
              Gamified engagement with XP, badges, and leaderboards for volunteers
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary">2,450+</p>
            <p className="text-sm text-muted-foreground mt-1">Reports Submitted</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary">1,230kg</p>
            <p className="text-sm text-muted-foreground mt-1">Debris Collected</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary">340+</p>
            <p className="text-sm text-muted-foreground mt-1">Active Volunteers</p>
          </div>
        </div>
      </section>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <AnimatedWaves />
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
    </div>
  );
}
