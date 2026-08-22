import { Code, Globe, Server, Zap } from 'lucide-react';

const impact = [
  { icon: Zap, value: '30–40%', title: 'Lower API response time', text: 'Traced production bottlenecks and reduced latency across Permission.io services.' },
  { icon: Server, value: 'Thousands', title: 'Active users served', text: 'Built and operated production platforms across Web3, AI and enterprise applications.' },
  { icon: Code, value: '50+', title: 'Projects delivered', text: 'From custom SaaS and mobile products to e-commerce and complex business systems.' },
  { icon: Globe, value: '5 countries', title: 'Distributed delivery', text: 'Worked with remote teams and customers across the US, Norway, Germany, Czech Republic and Bahrain.' },
];

export default function Impact() {
  return (
    <section id="impact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label">SELECTED IMPACT</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Engineering measured by outcomes, not tool lists.</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">I work end-to-end: understand the bottleneck, design the system, ship the product, observe production, and improve what matters.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {impact.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
                <Icon className="text-emerald-500" size={22} />
                <p className="mt-5 text-3xl font-bold text-gray-950 dark:text-white">{item.value}</p>
                <h3 className="mt-2 font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
