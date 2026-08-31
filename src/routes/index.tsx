import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/InvitationPage";
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
  return <InvitationPage />;
}
