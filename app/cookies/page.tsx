import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Hiraya Digital',
  description: 'Cookie Policy for the Hiraya Digital portfolio website. Learn about the cookies we use and how to manage your preferences.',
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <Link
            href="/"
            className="text-hiraya-blue hover:text-hiraya-yellow transition-colors text-sm mb-8 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed">
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you
              visit a website. They are widely used to make websites work more efficiently, provide a
              better user experience, and give website operators information about how visitors use
              their site.
            </p>
            <p className="mt-3">
              This Cookie Policy explains what cookies we use on{' '}
              <span className="text-hiraya-blue">portfolio.hiraya.digital</span> (the
              &quot;Website&quot;), why we use them, and how you can manage your cookie preferences.
            </p>
          </section>

          {/* Cookies We Use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Cookies We Use</h2>
            <p className="mb-6">
              We use the following categories of cookies on our Website:
            </p>

            {/* Essential Cookies */}
            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              2.1 Essential (Strictly Necessary) Cookies
            </h3>
            <p className="mb-4">
              These cookies are necessary for the Website to function properly. They cannot be
              disabled without affecting site functionality.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left p-3 border-b border-slate-800">Cookie</th>
                    <th className="text-left p-3 border-b border-slate-800">Purpose</th>
                    <th className="text-left p-3 border-b border-slate-800">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="p-3 font-mono text-xs text-hiraya-blue">session</td>
                    <td className="p-3">
                      Maintains your browsing session state, including AI chatbot conversation
                      context and form submission status
                    </td>
                    <td className="p-3">Browser session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analytics Cookies */}
            <h3 className="text-lg font-medium text-white mt-8 mb-3">2.2 Analytics Cookies</h3>
            <p className="mb-4">
              These cookies help us understand how visitors interact with our Website by collecting
              and reporting information anonymously.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left p-3 border-b border-slate-800">Cookie</th>
                    <th className="text-left p-3 border-b border-slate-800">Purpose</th>
                    <th className="text-left p-3 border-b border-slate-800">Duration</th>
                    <th className="text-left p-3 border-b border-slate-800">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="p-3 font-mono text-xs text-hiraya-blue">_ga</td>
                    <td className="p-3">
                      Distinguishes unique users by assigning a randomly generated number as a
                      client identifier. Used to calculate visitor, session, and campaign data for
                      analytics reports.
                    </td>
                    <td className="p-3">2 years</td>
                    <td className="p-3">Google Analytics</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="p-3 font-mono text-xs text-hiraya-blue">_ga_*</td>
                    <td className="p-3">
                      Used by Google Analytics 4 to persist session state across page loads.
                    </td>
                    <td className="p-3">2 years</td>
                    <td className="p-3">Google Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Functional Cookies */}
            <h3 className="text-lg font-medium text-white mt-8 mb-3">2.3 Functional Cookies</h3>
            <p className="mb-4">
              These cookies enable enhanced functionality and personalization on the Website.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left p-3 border-b border-slate-800">Cookie</th>
                    <th className="text-left p-3 border-b border-slate-800">Purpose</th>
                    <th className="text-left p-3 border-b border-slate-800">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="p-3 font-mono text-xs text-hiraya-blue">utm_source</td>
                    <td className="p-3">
                      Stores the referral/UTM source parameter from your initial visit to attribute
                      how you discovered the Website. Used for internal analytics only.
                    </td>
                    <td className="p-3">Browser session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we use cookies set by third-party services that we
              have integrated into our Website:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-2 mt-4">
              <li>
                <strong className="text-white">Google Analytics:</strong> Google sets the{' '}
                <span className="font-mono text-xs text-hiraya-blue">_ga</span> and{' '}
                <span className="font-mono text-xs text-hiraya-blue">_ga_*</span> cookies to
                measure how you interact with our Website. This data is processed by Google in
                accordance with{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  Google&apos;s Privacy Policy
                </a>
                . Google Analytics data is anonymized and we do not enable any advertising features
                or demographic reporting.
              </li>
            </ul>
          </section>

          {/* How to Manage Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. How to Manage and Disable Cookies
            </h2>
            <p>
              You have several options for managing cookies:
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              4.1 Browser Settings
            </h3>
            <p>
              Most web browsers allow you to control cookies through their settings. You can
              typically find these settings in your browser&apos;s &quot;Options,&quot;
              &quot;Preferences,&quot; or &quot;Settings&quot; menu. The following links provide
              instructions for common browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-slate-400">
              Please note that disabling cookies may affect the functionality of the Website. In
              particular, disabling session cookies will prevent the AI chatbot from maintaining
              conversation context within your visit.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              4.2 Google Analytics Opt-Out
            </h3>
            <p>
              You can opt out of Google Analytics tracking across all websites by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              . This add-on instructs the Google Analytics JavaScript not to send any visit
              information to Google Analytics.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              4.3 Private/Incognito Browsing
            </h3>
            <p>
              You can use your browser&apos;s private or incognito mode to browse the Website without
              cookies being stored permanently. Cookies set during a private browsing session are
              automatically deleted when you close the private window.
            </p>
          </section>

          {/* Impact of Disabling Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Impact of Disabling Cookies
            </h2>
            <p>
              If you choose to disable or block cookies, some features of the Website may not
              function as intended:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                The AI chatbot may lose conversation context between page navigations
              </li>
              <li>
                We will be unable to analyze aggregate site usage, which helps us improve the
                Website
              </li>
              <li>
                Referral source attribution may not function correctly
              </li>
            </ul>
            <p className="mt-3">
              Core Website functionality, including viewing content, submitting contact forms, and
              booking calls, will continue to work without cookies.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Updates to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in the cookies we
              use or for operational, legal, or regulatory reasons. When we make changes, we will
              update the &quot;Last updated&quot; date at the top of this page. We encourage you to
              review this Cookie Policy periodically to stay informed about our use of cookies.
            </p>
          </section>

          {/* More Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. More Information</h2>
            <p>
              For more details about how we handle your personal information, please read our{' '}
              <Link
                href="/privacy"
                className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-3">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="mt-4 border border-slate-800 rounded-lg p-5">
              <p className="text-white font-medium">Hiraya Digital</p>
              <p className="mt-1">California, USA</p>
              <p className="mt-1">
                Email:{' '}
                <a
                  href="mailto:contact@hiraya.digital"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  contact@hiraya.digital
                </a>
              </p>
              <p className="mt-1">
                Website:{' '}
                <a
                  href="https://portfolio.hiraya.digital"
                  className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                >
                  portfolio.hiraya.digital
                </a>
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Hiraya Digital. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-hiraya-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-hiraya-blue transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
