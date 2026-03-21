import { redirect } from "next/navigation";
import { AuthButtons } from "@/components/auth-buttons";
import { getAuthSession } from "@/lib/auth";

type SignInPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getAuthSession();
  const resolvedSearchParams = (await searchParams) || {};
  const callbackUrl = resolvedSearchParams.callbackUrl || "/account";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <main className="site-shell sign-in-shell">
      <section className="dashboard-panel sign-in-card">
        <p className="eyebrow">Google login</p>
        <h1>Prijavi se da zavrsis rezervaciju</h1>
        <p>
          Za direktnu rezervaciju i pregled svojih termina koristimo jednostavan Google login.
        </p>
        <AuthButtons compact />
      </section>
    </main>
  );
}
