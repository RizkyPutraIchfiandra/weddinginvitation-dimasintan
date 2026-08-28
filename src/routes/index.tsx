import { createFileRoute } from "@tanstack/react-router";
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

const { couple, event } = weddingConfig;
const TITLE = `${couple.groomName} & ${couple.brideName} — Undangan Pernikahan`;
const DESC = `Dengan sukacita kami mengundang Anda ke pernikahan ${couple.groomFullName} & ${couple.brideFullName}, ${event.weddingDayLabel} di ${event.venueName}, Yogyakarta.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState(weddingConfig.guest.guestName as string);

  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) setGuestName(decodeURIComponent(to.replace(/\+/g, " ")));
  }, []);

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
