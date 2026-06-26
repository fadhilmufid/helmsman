import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Features } from "@/components/features";
import { Modes } from "@/components/modes";
import { GateFlow } from "@/components/gate-flow";
import { Comparison } from "@/components/comparison";
import { CodeTabs } from "@/components/code-tabs";
import { GetStarted } from "@/components/get-started";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <Modes />
        <GateFlow />
        <Comparison />
        <CodeTabs />
        <GetStarted />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
