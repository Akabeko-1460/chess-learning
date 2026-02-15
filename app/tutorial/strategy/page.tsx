import { strategyModule } from "@/app/data/tutorials/strategy";
import ModuleIndexContent from "@/app/components/tutorial/ModuleIndexContent";

export default function StrategyPage() {
  return (
    <ModuleIndexContent module={strategyModule} categorySlug="strategy" />
  );
}
