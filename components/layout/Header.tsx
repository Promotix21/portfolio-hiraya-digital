import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="w-full z-50 bg-transparent absolute top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Hiraya Digital Logo"
            width={220}
            height={60}
            className="object-contain h-14 md:h-20 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#capabilities" className="hover:text-hiraya-blue transition-colors">Capabilities</Link>
          <Link href="#results" className="hover:text-hiraya-blue transition-colors">Results</Link>
          <Link href="#process" className="hover:text-hiraya-blue transition-colors">Process</Link>
          <Link href="/book" className="hover:text-hiraya-blue transition-colors">Book a Call</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <Link href="/book">
              Book a Call
            </Link>
          </Button>
          <Button className="font-semibold" asChild>
            <Link href="#contact">
              Start Project
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
