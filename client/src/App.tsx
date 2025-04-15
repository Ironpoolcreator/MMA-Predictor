import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FighterProfile from "@/pages/FighterProfile";
import Prediction from "@/pages/Prediction";
import Rankings from "@/pages/Rankings";
import Fights from "@/pages/Fights";
import Analytics from "@/pages/Analytics";
import FighterComparison from "@/pages/FighterComparison";
import BettingOdds from "@/pages/BettingOdds";
import HistoricalEvents from "@/pages/HistoricalEvents";
import FightPreparation from "@/pages/FightPreparation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/fighter/:id" component={FighterProfile} />
          <Route path="/prediction" component={Prediction} />
          <Route path="/rankings" component={Rankings} />
          <Route path="/fights" component={Fights} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/compare" component={FighterComparison} />
          <Route path="/betting-odds" component={BettingOdds} />
          <Route path="/events" component={HistoricalEvents} />
          <Route path="/fight-preparation" component={FightPreparation} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
