import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hiraya Digital',
  description: 'Privacy Policy for Hiraya Digital portfolio website. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Hiraya Digital (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
              located at{' '}
              <span className="text-hiraya-blue">portfolio.hiraya.digital</span> (the
              &quot;Website&quot;). This Privacy Policy explains how we collect, use, disclose, and
              safeguard your personal information when you visit our Website, use our contact or
              booking forms, or interact with our AI chatbot.
            </p>
            <p className="mt-3">
              We are committed to protecting your privacy and complying with the California Consumer
              Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA). By using
              our Website, you agree to the collection and use of information in accordance with
              this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              2.1 Information You Provide Directly
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white">Contact Form Submissions:</strong> When you submit
                our contact form, we collect your name, email address, company name, and project
                type.
              </li>
              <li>
                <strong className="text-white">Booking Form Submissions:</strong> When you schedule
                a call, we collect your name, email address, company name, and your preferred
                date/time.
              </li>
              <li>
                <strong className="text-white">AI Chatbot Conversations:</strong> When you interact
                with our AI-powered chatbot, the messages you send are processed in real time and
                stored in your browser session. Conversation data is not permanently stored on our
                servers.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              2.2 Information Collected Automatically
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white">Analytics Data:</strong> We use Google Analytics to
                collect anonymized usage data such as pages visited, time spent on site, browser
                type, device type, and referring URLs.
              </li>
              <li>
                <strong className="text-white">UTM and Referral Parameters:</strong> We track UTM
                parameters and referral sources via our LeadTracker component to understand how
                visitors discover our site. This data is sent to our internal analytics backend
                (Hiraya IQ).
              </li>
              <li>
                <strong className="text-white">IP Addresses:</strong> We collect IP addresses solely
                for rate limiting purposes to prevent abuse of our chatbot (limited to 30 requests
                per hour) and booking system (limited to 5 submissions per hour). IP addresses are
                not used for identification or marketing.
              </li>
              <li>
                <strong className="text-white">Cookies:</strong> We use session cookies and Google
                Analytics cookies. See our{' '}
                <Link href="/cookies" className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors">
                  Cookie Policy
                </Link>{' '}
                for details.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              2.3 Spam Prevention Data
            </h3>
            <p>
              Our forms include honeypot fields designed to detect automated spam submissions. Any
              data entered into these hidden fields is collected solely for spam detection and is
              immediately discarded. It is never stored or processed further.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>To respond to your inquiries and contact form submissions</li>
              <li>To schedule and confirm bookings for consultations</li>
              <li>To provide AI chatbot responses to your questions about our services</li>
              <li>To analyze website traffic and improve user experience</li>
              <li>To understand how visitors find and use our Website</li>
              <li>To prevent abuse and ensure the security of our systems</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information. We do not use your data for automated
              decision-making or profiling. We do not send marketing emails unless you have
              explicitly opted in.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Third-Party Services
            </h2>
            <p className="mb-4">
              We use the following third-party services that may process your data:
            </p>

            <div className="space-y-4">
              <div className="border border-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium">Google Analytics</h4>
                <p className="text-sm mt-1">
                  Website analytics and traffic measurement. Google may set cookies and collect
                  anonymized usage data. See{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium">Brevo (formerly Sendinblue)</h4>
                <p className="text-sm mt-1">
                  Transactional email delivery for contact form confirmations and booking
                  notifications. Your name and email address may be shared with Brevo to deliver
                  these messages. See{' '}
                  <a
                    href="https://www.brevo.com/legal/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                  >
                    Brevo&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium">Google Gemini AI (Gemini 2.5 Flash)</h4>
                <p className="text-sm mt-1">
                  Powers our AI chatbot. Messages you send to the chatbot are transmitted to
                  Google&apos;s Gemini API for processing. Conversation data is stored only in your
                  browser session and is not permanently retained on our servers. See{' '}
                  <a
                    href="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                  >
                    Gemini API Terms
                  </a>
                  .
                </p>
              </div>

              <div className="border border-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium">Cloudinary</h4>
                <p className="text-sm mt-1">
                  Content delivery network (CDN) for serving images and media assets. Cloudinary may
                  collect standard server logs including IP addresses. See{' '}
                  <a
                    href="https://cloudinary.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
                  >
                    Cloudinary&apos;s Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-white">Contact and booking submissions:</strong> Retained
                for up to 24 months from the date of submission, then permanently deleted.
              </li>
              <li>
                <strong className="text-white">Analytics data:</strong> Retained according to Google
                Analytics default retention settings (14 months).
              </li>
              <li>
                <strong className="text-white">AI chatbot conversations:</strong> Stored only in
                your browser session. Data is cleared when you close your browser or the session
                expires.
              </li>
              <li>
                <strong className="text-white">Rate limiting data (IP addresses):</strong> Retained
                in memory only for the duration of the rate limiting window (1 hour maximum) and
                then discarded.
              </li>
              <li>
                <strong className="text-white">UTM/referral tracking data:</strong> Retained for up
                to 24 months for attribution analysis.
              </li>
            </ul>
          </section>

          {/* Your Rights Under CCPA/CPRA */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Your Rights Under CCPA/CPRA
            </h2>
            <p>
              If you are a California resident, you have the following rights under the California
              Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                <strong className="text-white">Right to Know:</strong> You may request that we
                disclose what personal information we have collected about you, the categories of
                sources, the business purpose for collecting it, and the categories of third parties
                with whom we share it.
              </li>
              <li>
                <strong className="text-white">Right to Delete:</strong> You may request that we
                delete any personal information we have collected about you, subject to certain
                exceptions.
              </li>
              <li>
                <strong className="text-white">Right to Correct:</strong> You may request that we
                correct inaccurate personal information we maintain about you.
              </li>
              <li>
                <strong className="text-white">Right to Opt-Out of Sale/Sharing:</strong> We do not
                sell or share your personal information for cross-context behavioral advertising. No
                opt-out is necessary, but you may contact us to confirm.
              </li>
              <li>
                <strong className="text-white">Right to Non-Discrimination:</strong> We will not
                discriminate against you for exercising any of your privacy rights.
              </li>
              <li>
                <strong className="text-white">Right to Limit Use of Sensitive Personal Information:</strong>{' '}
                We do not collect sensitive personal information as defined under the CPRA.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{' '}
              <a
                href="mailto:contact@hiraya.digital"
                className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
              >
                contact@hiraya.digital
              </a>
              . We will respond to verifiable consumer requests within 45 days.
            </p>
          </section>

          {/* Do Not Track */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Do Not Track Disclosure</h2>
            <p>
              Our Website does not currently respond to &quot;Do Not Track&quot; (DNT) browser
              signals. This is because there is no uniform industry standard for recognizing or
              honoring DNT signals. However, you can manage your cookie preferences and opt out of
              Google Analytics tracking by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our Website is not directed to children under the age of 13. We do not knowingly
              collect personal information from children under 13. If we become aware that we have
              inadvertently collected personal information from a child under 13, we will take steps
              to delete that information as soon as possible. If you believe that a child under 13
              has provided us with personal information, please contact us at{' '}
              <a
                href="mailto:contact@hiraya.digital"
                className="text-hiraya-blue hover:text-hiraya-yellow underline transition-colors"
              >
                contact@hiraya.digital
              </a>
              .
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical security measures to
              protect your personal information against unauthorized access, alteration, disclosure,
              or destruction. These measures include encrypted data transmission (HTTPS/TLS), server
              access controls, and regular security reviews. However, no method of transmission over
              the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or applicable laws. When we make material changes, we will update the
              &quot;Last updated&quot; date at the top of this page. We encourage you to review this
              Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, wish to exercise your privacy
              rights, or have concerns about how we handle your data, please contact us:
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
            <Link href="/terms" className="hover:text-hiraya-blue transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookies" className="hover:text-hiraya-blue transition-colors">
              Cookie Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
