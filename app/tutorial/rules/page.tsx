import { rulesModule } from "@/app/data/tutorials/rules";
import ModuleIndexContent from "@/app/components/tutorial/ModuleIndexContent";

export default function RulesPage() {
  return <ModuleIndexContent module={rulesModule} categorySlug="rules" />;
}
