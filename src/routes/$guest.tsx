import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "@/components/InvitationPage";
import { weddingConfig } from "@/data/weddingConfig";
import { slugToName } from "@/lib/guestSlug";

const { couple, event } = weddingConfig;
const TITLE = `${couple.groomName} & ${couple.brideName} — Wedding Invitation`;
const DESC = `Undangan pernikahan / wedding invitation of ${couple.groomFullName} & ${couple.brideFullName}, ${event.weddingDayLabel} at ${event.venueName}, Kota Baru, Karawang.`;

export const Route = createFileRoute("/$guest")({
  head: ({ params }) => {
    const name = slugToName(params.guest);
    const title = name ? `${name} — ${TITLE}` : TITLE;
    return {
      meta: [
        { title },
        { name: "description", content: DESC },
        { property: "og:title", content: title },
        { property: "og:description", content: DESC },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: GuestInvitation,
});

function GuestInvitation() {
  const { guest } = Route.useParams();
  return <InvitationPage initialGuestName={slugToName(guest)} />;
}
