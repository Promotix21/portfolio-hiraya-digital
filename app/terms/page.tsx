import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Hiraya Digital',
  description: 'Terms and Conditions for the Hiraya Digital portfolio website. Read our terms of use, intellectual property rights, and service terms.',
};

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm">Last updated: March 2026</p>
        </header>

        <div className="space-y-10 leading-relaxed">
          {/* Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website located at{' '}
              <span className="text-hiraya-blue">portfolio.hiraya.digital</span> (the
              &quot;Website&quot;), operated by Hiraya Digital (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), you agree to be bound by these Terms and Conditions
              (&quot;Terms&quot;). If you do not agree to these Terms, you must not use the Website.
            </p>
            <p className="mt-3">
              We reserve the right to modify these Terms at any time. Changes take effect
              immediately upon posting to the Website. Your continued use of the Website after
              changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Use of the Website */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of the Website</h2>
            <p>You agree to use the Website only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Violate any applicable local, state, national, or international law or regulation</li>
              <li>Infringe upon the rights of any third party</li>
              <li>
                Attempt to gain unauthorized access to any portion of the Website, its servers, or
                any systems connected to the Website
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the Website or its
                underlying infrastructure
              </li>
              <li>
                Use any automated system, including bots, scrapers, or crawlers, to access the
                Website in a manner that sends more requests than a human could reasonably produce
              </li>
              <li>
                Submit false, misleading, or fraudulent information through any forms on the Website
              </li>
              <li>
                Attempt to bypass rate limiting, spam prevention, or other security measures
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
            <p>
              All content on this Website, including but not limited to text, graphics, logos,
              images, case studies, code snippets, design mockups, icons, and the overall look and
              feel, is the property of Hiraya Digital or its licensors and is protected by United
              States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works of, publicly
              display, publicly perform, republish, download, store, or transmit any content from
              this Website without our prior written consent, except as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                You may temporarily store copies of materials in your browser cache for personal,
                non-commercial viewing purposes
              </li>
              <li>
                You may print or download one copy of a reasonable number of pages for your own
                personal, non-commercial use and not for further reproduction, publication, or
                distribution
              </li>
            </ul>
            <p className="mt-3">
              The Hiraya Digital name, logo, and all related names, logos, product and service names,
              designs, and slogans are trademarks of Hiraya Digital. You must not use such marks
              without our prior written permission.
            </p>
          </section>

          {/* Contact Form and Booking Submissions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Contact Form and Booking Submissions
            </h2>
            <p>
              When you submit information through our contact or booking forms, you represent and
              warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>All information you provide is accurate, current, and complete</li>
              <li>You have the authority to provide such information</li>
              <li>
                Your submission does not violate any applicable law or the rights of any third party
              </li>
            </ul>
            <p className="mt-3">
              Submitting a contact or booking form does not create a binding contract for services.
              All engagements are subject to separate written agreements between you and Hiraya
              Digital. Booking a call is a request for a consultation and does not guarantee
              availability or create any obligation on either party.
            </p>
            <p className="mt-3">
              We reserve the right to decline or cancel any booking request at our sole discretion,
              and to refuse service to anyone for any lawful reason.
            </p>
          </section>

          {/* AI Chatbot */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. AI Chatbot Disclaimer</h2>
            <p>
              Our Website features an AI-powered chatbot that uses Google&apos;s Gemini 2.5 Flash
              API to provide information about our services, answer common questions, and assist
              visitors.
            </p>
            <p className="mt-3">
              <strong className="text-white">
                You acknowledge and agree to the following regarding the AI chatbot:
              </strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                The chatbot provides general information only and does not constitute professional
                advice, a binding quote, or a contractual commitment of any kind
              </li>
              <li>
                Responses are generated by artificial intelligence and may contain inaccuracies,
                errors, or outdated information. You should independently verify any information
                provided by the chatbot before relying on it
              </li>
              <li>
                Conversations are stored in your browser session only and are not permanently
                retained on our servers. However, messages are transmitted to Google&apos;s Gemini
                API for processing
              </li>
              <li>
                You must not submit sensitive personal information (such as passwords, financial
                account numbers, or government identification numbers) to the chatbot
              </li>
              <li>
                The chatbot is rate-limited to 30 requests per hour per user to prevent abuse
              </li>
              <li>
                We are not liable for any decisions you make or actions you take based on information
                provided by the chatbot
              </li>
            </ul>
          </section>

          {/* Rate Limiting */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Rate Limiting and Abuse Prevention</h2>
            <p>
              To protect the integrity and availability of our Website, we enforce rate limits on
              certain features:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>
                <strong className="text-white">AI Chatbot:</strong> 30 requests per hour per IP
                address
              </li>
              <li>
                <strong className="text-white">Booking Form:</strong> 5 submissions per hour per IP
                address
              </li>
            </ul>
            <p className="mt-3">
              If you exceed these limits, your access to the affected feature may be temporarily
              restricted. Repeated attempts to circumvent rate limiting may result in permanent
              blocking of your IP address.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Links</h2>
            <p>
              Our Website may contain links to third-party websites or services that are not owned or
              controlled by Hiraya Digital. We have no control over, and assume no responsibility
              for, the content, privacy policies, or practices of any third-party websites or
              services. You acknowledge and agree that Hiraya Digital shall not be responsible or
              liable, directly or indirectly, for any damage or loss caused or alleged to be caused
              by or in connection with the use of or reliance on any such content, goods, or services
              available on or through any such third-party websites or services.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="uppercase text-sm">
              The Website is provided on an &quot;as is&quot; and &quot;as available&quot; basis
              without any warranties of any kind, either express or implied, including but not
              limited to implied warranties of merchantability, fitness for a particular purpose,
              non-infringement, or course of performance. Hiraya Digital does not warrant that the
              Website will function uninterrupted, secure, or error-free, that defects will be
              corrected, or that the Website or its servers are free of viruses or other harmful
              components.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, in no event shall Hiraya Digital,
              its officers, directors, employees, agents, or affiliates be liable for any indirect,
              incidental, special, consequential, or punitive damages, including without limitation
              loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
              <li>Your access to or use of, or inability to access or use, the Website</li>
              <li>Any conduct or content of any third party on the Website</li>
              <li>Any content obtained from the Website, including AI chatbot responses</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p className="mt-3">
              In no event shall our total liability to you for all claims arising out of or relating
              to the use of the Website exceed one hundred U.S. dollars (USD $100.00).
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Hiraya Digital, its officers,
              directors, employees, and agents from and against any claims, liabilities, damages,
              judgments, awards, losses, costs, expenses, or fees (including reasonable
              attorneys&apos; fees) arising out of or relating to your violation of these Terms or
              your use of the Website.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State
              of California, United States of America, without regard to its conflict of law
              provisions. Any legal action or proceeding arising under these Terms shall be brought
              exclusively in the state or federal courts located in California, and you hereby
              consent to the personal jurisdiction and venue of such courts.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, such provision
              will be modified to the minimum extent necessary to make it enforceable, and the
              remaining provisions will continue in full force and effect.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
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
            <Link href="/cookies" className="hover:text-hiraya-blue transition-colors">
              Cookie Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
