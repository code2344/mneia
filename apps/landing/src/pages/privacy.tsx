import logo from "@/assets/mneia-icon.svg";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Effective 13 November, 2026
          </p>
        </header>

        <div className="legal-content mt-10">
          <div className="space-y-2">
            <p>
              This Privacy Policy explains how mneia collects, uses, stores, and discloses personal information.
            </p>
            <p>
              mneia is operated by SuperCode Studios, ABN 18 569 024 361.
            </p>
          </div>
          <div className="mt-6 space-y-6">
            <section>
              <h2>
                1. Information we collect
              </h2>
              <p>
                At the waitlist stage, we collect:
              </p>
              <ul>
                <li>your email address;</li>
                <li>the date and time you joined the waitlist;</li>
                <li>technical information neccesary to operate and protect the website; and</li>
                <li>information you voluntarily provide when contacting us.</li>
              </ul>
              <p>
                When user accounts and the main application become available, we may also collect information such as:
              </p>
              <ul>
                <li>your name and account email address;</li>
                <li>authentication and session information;</li>
                <li>flashcards, decks, assessments, and other content you create or upload;</li>
                <li>study activity and progress; and</li>
                <li>support requests and feedback.</li>
              </ul>
              <p>
                Please do not submit sensitive personal information unless the service specifically asks for it.
              </p>
            </section>
            <section>
              <h2>
                2. How we use information
              </h2>
              <p>
                We may use personal information to:
              </p>
              <ul>
                <li>operate and maintain the website;</li>
                <li>manage the mneia waitlist;</li>
                <li>notify you about early access and product updates;</li>
                <li>create and manage user accounts;</li>
                <li>provide study features;</li>
                <li>respond to enquiries and support requests;</li>
                <li>detect abuse, fraud, and security issues;</li>
                <li>improve the service; and</li>
                <li>comply with legal obligations.</li>
              </ul>
              <p>
                We will not use your waitlist email for unrelated marketing without consent. 
              </p>
            </section>
            <section>
              <h2>
                3. Email communications
              </h2>
              <p>
                If you join the waitlist, we may send you a confirmation email and occasional updates about mneia.
              </p>
              <p>
                Every marketing email will include an unsubscribe option. You may also contact us to unsubscribe.
              </p>
              <p>
                Unsubscribing from marketing emails does not necessarily stop essential service or account-related emails once the application becomes available.
              </p>
            </section>
            <section>
              <h2>
                4. Service providers
              </h2>
              <p>
                We use third-party providers to help operate mneia. These may include:
              </p>
              <ul>
                <li><strong className="font-semibold"><a href="https://loops.so">Loops</a></strong> for contact management, mailing lists, and email delivery;</li>
                <li><strong className="font-semibold"><a href="https://vercel.com">Vercel</a></strong> for website, API hosting, and, where enabled, analytics;</li>
                <li><strong className="font-semibold"><a href="https://vercel.com">Prisma Postgres</a></strong> for database hosting; and</li>
                <li>other providers reasonably required to operate, secure, and improve the service.</li>
              </ul>
              <p>
                These providers may process information in countries outside Australia. We take reasonable steps to select providers and configure services appropriately for the information they process.
              </p>
            </section>
            <section>
              <h2>
                5. Disclosure of information
              </h2>
              <p>
                We may disclose personal information:
              </p>
              <ul>
                <li>to service providers that operate parts of mneia;</li>
                <li>to professional advisers where reasonably necessary;</li>
                <li>where required or authorised by law; or</li>
                <li>in connection with a merger, sale, restructuring, or transfer of the business.</li>
              </ul>
              <p><strong className="font-bold">We do not and never will sell your personal information as a standalone product, dataset, or source of revenue.</strong> If mneia is acquired, merged, reorganised, or its assets are transferred, personal information may be transferred to the successor organisation as part of that transaction. Any successor will be expected to handle that information consistently with this Privacy Policy or provide notice of material changes.</p>
            </section>
            <section>
              <h2>
                6. Data retention
              </h2>
              <p>
                We retain information only for as long as reasonably necessary for the purposes described in this Policy, unless a longer period is required by law.
              </p>
              <p>
                You may ask us to delete your waitlist information at any time. We may retain limited information where necessary to maintain suppression records, resolve disputes, prevent abuse, or comply with legal obligations.
              </p>
            </section>
            <section>
              <h2>
                7. Access and correction
              </h2>
              <p>
                You may ask us to access or correct personal information we hold about you.
              </p>
              <p>
                To make a request, contact:
              </p>
              <p>
                <a href="mailto:hello@mneia.net">hello@mneia.net</a>
              </p>
              <p>
                We may need to verify your identity before completing a request.
              </p>
            </section>
            <section>
              <h2>
                8. Security
              </h2>
              <p>
                We use reasonable technical and organisational measures to protect personal information from unauthorised access, loss, misuse, alteration, or disclosure, however no online service can guarantee absolute security. Always use a secure and unique password for every service.
              </p>
            </section>
            <section>
              <h2>
                9. Children
              </h2>
              <p>
                mneia is not knowingly intended for children under the age of 13.
              </p>
              <p>
                If you believe a child has provided personal information to us, contact us so that we can review and delete it where appropriate.
              </p>
            </section>
            <section>
              <h2>
                10. Privacy complaints
              </h2>
              <p>
                If you have a concern with how we handle your personal information, contact us first:
              </p>
              <p><strong className="font-semibold"><a href="mailto:hello@mneia.net">hello@mneia.net</a></strong></p>
              <p>
                We will review and respond to your complaint within a reasonable period.
              </p>
              <p>
                If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner. The OAIC expects covered organisations to make a clear privacy policy available and explain how privacy complaints can be made and handled.
              </p>
            </section>
            <section>
              <h2>11. Changes to this Policy</h2>
              <p>
                We may update this Privacy Policy when our practices, services, or legal obligations change.
              </p>
              <p>
                The latest version will always be published on this page with its effective date.
              </p>
            </section>
            <section>
              <h2>
                11. Contact
              </h2>
              <p>
                For privacy questions, requests, or concerns, please contact:
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
