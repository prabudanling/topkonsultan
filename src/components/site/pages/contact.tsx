"use client";

import { Link, useRoute } from "@/lib/router";
import ContactSection from "@/components/landing/contact";
import OfficeClocks from "@/components/site/office-clocks";
import { CTABand } from "@/components/site/ui";

export default function ContactPage() {
  const route = useRoute();
  const role = route.query.get("role");

  return (
    <>
      {/* Breadcrumb rail */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 pt-32 text-xs sm:px-6 lg:px-8"
      >
        <Link to="/" className="font-medium text-slate-9000 transition-colors hover:text-violet-600">
          Beranda
        </Link>
        <span className="text-slate-400" aria-hidden="true">
          /
        </span>
        <span className="font-semibold text-violet-700">Konsultasi dengan Dewan</span>
      </nav>

      <div className="pt-4">
        <ContactSection initialRole={role} />
      </div>

      <OfficeClocks />
      <CTABand />
    </>
  );
}
