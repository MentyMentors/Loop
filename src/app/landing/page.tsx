import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhatIsLoop from "@/components/landing/WhatIsLoop";
import GameLounge from "@/components/landing/GameLounge";
import ChallengeSection from "@/components/landing/ChallengeSection";
import LearnSection from "@/components/landing/LearnSection";
import CommunityFeed from "@/components/landing/CommunityFeed";
import MentyConnection from "@/components/landing/MentyConnection";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

/**
 * LOOP public landing page. Fully static/serverless: no session lookups,
 * no database reads on this route. The gated feed (/feed) and the trivia
 * game (/games/trivia) it links to are unchanged.
 */
export default function LoopLandingPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <WhatIsLoop />
        <GameLounge />
        <ChallengeSection />
        <LearnSection />
        <CommunityFeed />
        <MentyConnection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}