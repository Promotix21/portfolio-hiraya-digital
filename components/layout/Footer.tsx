import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-hiraya-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Hiraya Digital Logo"
                width={250}
                height={70}
                className="object-contain h-16 md:h-14 w-auto"
              />
            </Link>
            <p className="text-slate-600 text-sm max-w-sm">
              Growth Engineering, Automation and Product Development partner. We build systems that scale revenue.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Capabilities</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#capabilities" className="hover:text-hiraya-blue transition-colors">Growth Engineering</Link></li>
              <li><Link href="#capabilities" className="hover:text-hiraya-blue transition-colors">Marketing Automation</Link></li>
              <li><Link href="#capabilities" className="hover:text-hiraya-blue transition-colors">AI Solutions</Link></li>
              <li><Link href="#capabilities" className="hover:text-hiraya-blue transition-colors">Custom Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="https://linkedin.com/company/hiraya-digital" target="_blank" rel="noopener noreferrer" className="hover:text-hiraya-blue transition-colors">LinkedIn</Link></li>
              <li><Link href="https://github.com/Promotix21" target="_blank" rel="noopener noreferrer" className="hover:text-hiraya-blue transition-colors">GitHub</Link></li>
              <li><Link href="#contact" className="hover:text-hiraya-blue transition-colors">Contact Us</Link></li>
              <li><Link href="/book" className="hover:text-hiraya-blue transition-colors font-medium">Book a Call</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Hiraya Digital. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-hiraya-blue transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-hiraya-blue transition-colors">Terms &amp; Conditions</Link>
            <Link href="/cookies" className="hover:text-hiraya-blue transition-colors">Cookie Policy</Link>
            <span className="hidden md:inline">|</span>
            <span>Hiraya Digital, California, USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
