export default function Footer() {
  return (
    <footer className="relative border-t border-border px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}
          />
          <span className="font-display font-extrabold text-[17px] text-ink">Mitul</span>
          <span className="font-mono text-[12px] text-ink-3 ml-1.5">Senior UI/UX Designer</span>
        </div>
        <div className="flex items-center gap-5 sm:gap-6 font-mono text-[12px] uppercase tracking-[0.04em]">
          {[
            ['Dribbble', 'https://dribbble.com/mitul690'],
            ['Behance', 'https://www.behance.net/mitul690'],
            ['Email', 'mailto:hello@mitul.design'],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              target={h.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              className="text-ink-3 no-underline hover:text-ink transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <span className="font-mono text-[12px] text-ink-4">© 2026</span>
      </div>
    </footer>
  );
}
