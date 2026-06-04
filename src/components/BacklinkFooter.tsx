export function BacklinkFooter() {
  return (
    <footer className="w-full border-t border-ink/10 bg-sand px-5 py-6 font-mono">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="m-0 text-[0.72rem] uppercase tracking-[0.06em] text-ink/60">
          Built by{' '}
          <a
            href="https://jacobbritten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lake no-underline hover:underline"
          >
            Jacob Britten
          </a>{' '}
          &mdash; Media Systems Architect
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Jacob Britten">
          {[
            { href: 'https://jacobbritten.com', label: 'Portfolio' },
            { href: 'https://jacobbritten.com/projects.html', label: 'Projects' },
            { href: 'https://jacobbritten.com/lab.html', label: 'The Lab' },
            { href: 'https://ko-fi.com/jacobbritten', label: 'Ko-fi' },
            {
              href: 'https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U',
              label: 'PayPal',
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.68rem] uppercase tracking-[0.07em] text-ink/70 no-underline transition-colors hover:text-lake"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
