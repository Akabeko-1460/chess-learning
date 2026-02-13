import HeroSection from "./components/landing/HeroSection";
import TutorialModulesGrid from "./components/landing/TutorialModulesGrid";
import PracticePreview from "./components/landing/PracticePreview";
import FeaturesSection from "./components/landing/FeaturesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TutorialModulesGrid />
      <PracticePreview />
      <FeaturesSection />
    </>
  );
}
