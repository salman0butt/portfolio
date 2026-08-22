const companies = ['Permission.io', 'MindManager / Corel', 'OffGrid Europe', 'Digital MedieXpert', 'Switcher Solutions'];

export default function TrustStrip() {
  return (
    <section aria-label="Companies and products" className="border-y border-gray-200 bg-white/60 py-7 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">Engineering experience across products and teams in the US, Europe &amp; Middle East</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {companies.map((company) => <span key={company} className="text-sm font-semibold text-gray-700 dark:text-gray-300">{company}</span>)}
        </div>
      </div>
    </section>
  );
}
