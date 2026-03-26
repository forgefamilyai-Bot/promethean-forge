/* ============================================================
   PROMETHEAN FORGE — App Root
   Dark Forge Cosmos: Void Black | Forge Amber | Sovereign Cyan
   ============================================================ */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import RoadOracle from "./pages/RoadOracle";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/road-oracle"} component={RoadOracle} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            toastOptions={{
              style: {
                background: "oklch(0.10 0.006 285)",
                border: "1px solid oklch(0.72 0.18 72 / 0.3)",
                color: "oklch(0.92 0.005 65)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8125rem",
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
