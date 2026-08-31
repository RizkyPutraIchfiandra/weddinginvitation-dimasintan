import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { OpeningScreen } from "@/components/OpeningScreen/OpeningScreen";
import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { Quote } from "@/components/Quote/Quote";
import { Couple } from "@/components/Couple/Couple";
import { LoveStory } from "@/components/LoveStory/LoveStory";
import { Countdown } from "@/components/Countdown/Countdown";
import { EventDetails } from "@/components/EventDetails/EventDetails";
import { Gallery } from "@/components/Gallery/Gallery";
import { VideoSection } from "@/components/Video/VideoSection";
import { DressCode } from "@/components/DressCode/DressCode";
import { Gift } from "@/components/Gift/Gift";
import { RSVP } from "@/components/RSVP/RSVP";
import { Closing } from "@/components/Closing/Closing";
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { weddingConfig } from "@/data/weddingConfig";

export function InvitationPage({ initialGuestName = "" }: { initialGuestName?: string }) {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState(
    initialGuestName || (weddingConfig.guest.guestName as string),
  );

  useEffect(() => {
    if (initialGuestName) return;
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) setGuestName(decodeURIComponent(to.replace(/\+/g, " ")));
  }, [initialGuestName]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative">
      <AnimatePresence>
        {!opened && (
          <OpeningScreen key="opening" guestName={guestName} onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <Navigation />
          <MusicPlayer autoStart />
          <main>
            <Hero />
            <Quote />
            <Couple />
            <LoveStory />
            <Countdown />
            <EventDetails />
            <Gallery />
            <VideoSection />
            <DressCode />
            <Gift />
            <RSVP guestName={guestName} />
          </main>
          <Closing />
        </>
      )}
    </div>
  );
}
