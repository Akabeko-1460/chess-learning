import { openingsModule } from "@/app/data/tutorials/openings";
import ModuleIndexContent from "@/app/components/tutorial/ModuleIndexContent";

export default function OpeningsPage() {
  return (
    <ModuleIndexContent module={openingsModule} categorySlug="openings" />
  );
}
