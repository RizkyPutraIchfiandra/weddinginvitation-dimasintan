import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/InvitationPage";
import { weddingConfig } from "@/data/weddingConfig";

const { couple, event } = weddingConfig;
const TITLE = `${couple.groomName} & ${couple.brideName} — Wedding Invitation`;
const DESC = `Undangan pernikahan / wedding invitation of ${couple.groomFullName} & ${couple.brideFullName}, ${event.weddingDayLabel} at ${event.venueName}, Kota Baru, Karawang.`;

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
