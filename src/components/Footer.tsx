import Logo from '@/components/Logo';

const footerLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="space-y-3">
            <Logo variant="white" size={36} />
            <p className="text-sm text-white/60">
              Growth Engineering &amp; Automation
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-teal-light"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CLI easter egg */}
        <div className="mt-12 mb-8">
          <p className="font-mono text-xs text-white/20 select-none">
            $ hiraya --build growth
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Hiraya Digital</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/60">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white/60">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
