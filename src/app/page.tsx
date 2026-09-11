import { JourneyShell } from "@/components/journey/JourneyShell";
import { journeyData } from "@/constants/journeyData";

export default function HomePage() {
  return <JourneyShell data={journeyData} />;
}
