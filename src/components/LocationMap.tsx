import { contact } from "@/lib/services";
import { useLocale } from "@/lib/i18n";

export function LocationMap() {
  const { t, locale } = useLocale();

  return (
    <section className="location-block rise" aria-label={t("location.title")}>
      <div className="location-copy">
        <p className="location-eyebrow">{t("location.eyebrow")}</p>
        <h2 className="location-title font-arabic text-gold-gradient">{t("location.title")}</h2>
        <p className="location-desc">{t("location.desc")}</p>
        <div className="location-meta">
          <strong>{contact.clinic[locale]}</strong>
          <span>{contact.address[locale]}</span>
        </div>
        <div className="location-actions">
          <a
            href={contact.maps}
            target="_blank"
            rel="noreferrer"
            className="location-btn primary"
          >
            {t("location.openMaps")}
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${contact.lat},${contact.lng}`}
            target="_blank"
            rel="noreferrer"
            className="location-btn ghost"
          >
            {t("location.directions")}
          </a>
        </div>
      </div>

      <div className="location-frame">
        <iframe
          title={contact.clinic[locale]}
          src={contact.mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
