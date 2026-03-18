import { PublicSiteHeader } from "@/components/public-site-header";
import { PublicSiteFooter, PublicTemplateHeadLinks } from "@/components/public-template";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <PublicTemplateHeadLinks />
      <div className="site-template-shell">
        <PublicSiteHeader />
        {children}
        <PublicSiteFooter />
      </div>
    </>
  );
}
