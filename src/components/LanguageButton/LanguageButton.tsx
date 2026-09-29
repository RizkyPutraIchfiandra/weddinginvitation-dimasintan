import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function LanguageButton() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggleLanguage}
      aria-label={t.language.aria}
      className="fixed top-5 left-5 z-[70] h-9 rounded-full border-antique-gold/35 bg-paper/80 px-3 font-opening-sans text-[0.6rem] tracking-[0.12em] text-ink uppercase shadow-sm backdrop-blur-md hover:bg-paper-muted sm:top-7 sm:left-7"
    >
      <Languages className="size-3.5" aria-hidden="true" />
      {t.language.button}
    </Button>
  );
}