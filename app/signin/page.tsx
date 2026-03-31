import { redirect } from "next/navigation";
import { AuthButtons } from "@/components/auth-buttons";
import { getAuthSession, getDefaultPostLoginPath, sanitizeCallbackUrl } from "@/lib/auth";

type SignInPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

const signInOptions = [
  {
    callbackUrl: "/account",
    description:
      "Za klijente i posetioce sajta koji zele da posalju direktan upit, potvrde rezervaciju i vide svoje boravke.",
    eyebrow: "Posetioci",
    title: "Prijava klijenta"
  },
  {
    callbackUrl: "/admin/staff",
    description:
      "Za radnike i operativni tim koji prate ciscenje, dolaske i dnevne zadatke u staff panelu.",
    eyebrow: "Radnici",
    title: "Uloguj se kao staff"
  },
  {
    callbackUrl: "/admin/owner",
    description:
      "Za vlasnika ili admin email koji otvara owner panel, sobe, rezervacije i Booking.com administraciju.",
    eyebrow: "Admin",
    title: "Uloguj se kao owner"
  }
] as const;

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getAuthSession();
  const resolvedSearchParams = (await searchParams) || {};
  const callbackUrl = sanitizeCallbackUrl(resolvedSearchParams.callbackUrl);

  if (session?.user) {
    redirect(callbackUrl || getDefaultPostLoginPath(session.user.role));
  }

  return (
    <main className="site-shell sign-in-shell">
      <section className="dashboard-panel sign-in-card">
        <p className="eyebrow">Google login</p>
        <h1>Prijava za goste, radnike i admin korisnike</h1>
        <p>
          Google nalog je jedini login. Rola se automatski dodeljuje po email adresi:
          email iz `OWNER_EMAILS` ide u owner panel, email iz `STAFF_EMAILS` ide u staff
          panel, a svi ostali ulaze kao gosti sajta.
        </p>
        <p className="inline-note">
          Prijava za klijente je aktivna odmah. Kada posaljes owner i staff mejlove, samo cemo ih
          dodati u role mapiranje i isti Google login ce ih voditi u odgovarajuci panel.
        </p>
        {callbackUrl ? (
          <p className="inline-note">
            Pokusali ste da otvorite: <strong>{callbackUrl}</strong>
          </p>
        ) : null}
      </section>

      <section className="sign-in-grid">
        {signInOptions.map((option) => (
          <article key={option.callbackUrl} className="dashboard-panel sign-in-option-card">
            <p className="eyebrow">{option.eyebrow}</p>
            <h2>{option.title}</h2>
            <p>{option.description}</p>
            <AuthButtons
              callbackUrl={option.callbackUrl}
              compact
              label="Nastavi preko Google-a"
            />
            <span className="sign-in-option-card__hint">
              Posle prijave bicete odvedeni na {option.callbackUrl}.
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}
