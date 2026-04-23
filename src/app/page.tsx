import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import InnovationSection from "@/components/InnovationSection";
import HowItWorks from "@/components/HowItWorks";
import PersonalizedJourney from "@/components/PersonalizedJourney";
import EligibilityChecker from "@/components/EligibilityChecker";
import ElectionTimeline from "@/components/ElectionTimeline";
import StepGuide from "@/components/StepGuide";
import PollingLocator from "@/components/PollingLocator";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020c1b]">
      <Hero />
      <ImpactSection />
      <PersonalizedJourney />
      <EligibilityChecker />
      <HowItWorks />
      <InnovationSection />
      <ElectionTimeline />
      <StepGuide />
      <PollingLocator />
      <ChatAssistant />
    </main>
  );
}
