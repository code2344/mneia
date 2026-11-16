import logo from "@/assets/mneia-icon.svg";

export default function TermsPage() {
  return (
    <main className="min-h-svh bg-background px-6 py-12 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-3 font-heading text-xl font-semibold text-foreground">
          <img src={logo} alt="" className="size-9" />
          <span>mneia</span>
        </a>

        <header className="mt-8 border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Effective 13 November, 2026
          </p>
        </header>

        <div className="legal-content mt-10">
          <div className="space-y-2">
            <p>
              These Terms of Service (“Terms”) govern your use of the mneia website and
              waitlist.
            </p>
            <p>
              By using the website or joining the waitlist, you agree to these Terms.
            </p>
          </div>
          <div className="mt-6 space-y-6">
            <section>
              <h2>
                1. About mneia
              </h2>
              <p>
                mneia is a study platform being developed to provide flashcards, spaced repetition, study planning, and other related services.
              </p>
              <p>
                The website may contain information about planned or upcoming features. Features, designs, availability, and related dates may change.
              </p>
            </section>
            <section>
              <h2>
                2. Waitlist
              </h2>
              <p>
                Joining the waitlist does not create an account and does not guarantee access to the product.
              </p>
              <p>
                By joining the waitlist you agree that we may contact you about:
              </p>
              <ul>
                <li>mneia early access;</li>
                <li>product updates;</li>
                <li>launch information; and</li>
                <li>important changes relating to the service.</li>
              </ul>
              <p>
                You may unsubscribe from these emails at any time using the unsubscribe link included in the email or by contacting us.
              </p>
            </section>
            <section>
              <h2>
                3. Acceptable use
              </h2>
              <p>
                You must not use the website to:
              </p>
              <ul>
                <li>break the law;</li>
                <li>interfere with the website or its infrastructure;</li>
                <li>attempt to gain unauthorised access;</li>
                <li>submit another person's email address without permission;</li>
                <li>distribute spam, malware, or harmful content; or</li>
                <li>scrape or copy the website in a way that places unreasonable load on our systems.</li>
              </ul>
            </section>
            <section>
              <h2>
                4. Intellectual Property
              </h2>
              <p>
                The mneia name, logo, visual identity, website, software, and original content are owned by or licensed to mneia and are protected by applicable intellectual-property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or commercially exploit these materials without written permission.
              </p>
            </section>
            <section>
              <h2>
                5. Availability
              </h2>
              <p>
                We may modify, suspend, or discontinue the website or waitlist at any time.
              </p>
              <p>
                We do not guarantee that the website will always be available, uninterrupted, or error-free.
              </p>
            </section>
            <section>
              <h2>
                6. Third-party services
              </h2>
              <p>
                mneia may use third-party services for hosting, databases, email delivery, analytics, and other infrastructure. Your use of the website may therefore involve those providers processing information as described in our Privacy Policy.
              </p>
            </section>
            <section>
              <h2>
                7. Disclaimers
              </h2>
              <p>
                The website and waitlist are provided on an “as available” basis.
              </p>
              <p>
                Information about planned features is provided for general information and is not a promise that a particular feature or service will be released.
              </p>
            </section>
            <section>
              <h2>
                8. Liability
              </h2>
              <p>
                To the maximum extent permitted by law, mneia is not responsible for indirect, incidental, or consequential loss arising from your use of, or inability to use, the website.
              </p>
              <p>
                Nothing in these Terms excludes, restricts, or modifies any right or remedy that cannot legally be excluded, including rights under the Australian Consumer Law.
              </p>
            </section>
            <section>
              <h2>
                9. Changes to these Terms
              </h2>
              <p>
                We may update these Terms from time to time. The updated version will be published on this page with a new effective date.
              </p>
            </section>
            <section>
              <h2>
                10. Governing law
              </h2>
              <p>
                These Terms are governed by the laws of Tasmania, Australia. You submit to the courts of Tasmania and the applicable courts of Australia.
              </p>
            </section>
            <section>
              <h2>
                11. Contact
              </h2>
              <p>
                For questions about these Terms, please contact:
              </p>
              <p>
                Email: <a href="mailto:hello@mneia.net">hello@mneia.net</a>
              </p>
              <p>
                Operator: SuperCode Studios
              </p>
              <p>
                Address: 35 New Town Rd, New Town TAS, 7008 AUSTRALIA
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
