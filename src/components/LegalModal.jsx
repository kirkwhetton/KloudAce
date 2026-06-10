import { useState } from "react";
import "./LegalModal.css";

const LAST_UPDATED = "5 June 2026";
const CONTACT_EMAIL = "hello@kloudace.com";
const COMPANY = "KloudAce";

function TermsContent() {
  return (
    <div className="legal-body">
      <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

      <h3>1. About {COMPANY}</h3>
      <p>{COMPANY} ("we", "us", "our") is an online learning platform providing Azure cloud certification study materials, interactive practice questions, labs, and learning games. By using the service you agree to these terms.</p>

      <h3>2. Accounts</h3>
      <p>You must provide a valid email address to create an account. You are responsible for maintaining the security of your account credentials and for all activity under your account. We may suspend or terminate accounts that violate these terms.</p>

      <h3>3. Free and Premium tiers</h3>
      <p>A Free tier is available with no payment required. It includes a subset of content as described on the pricing page. A Premium subscription unlocks all content across all exams. Premium features are clearly labelled in the application.</p>

      <h3>4. Payment and subscriptions</h3>
      <p>Premium subscriptions are not currently available for purchase. When Premium launches, subscriptions will be billed monthly or annually as selected at checkout, with payments processed by a third-party Merchant of Record who will handle all applicable taxes including UK VAT and EU VAT. You will be able to cancel at any time through your account settings, with access continuing until the end of the paid billing period. No partial refunds will be provided except where required by applicable law.</p>

      <h3>5. Acceptable use</h3>
      <p>You may not: scrape, copy, or redistribute our content; share account credentials; attempt to circumvent premium access controls; use the service for any unlawful purpose; or interfere with the service's infrastructure. Violation may result in immediate account termination.</p>

      <h3>6. Intellectual property</h3>
      <p>All content on {COMPANY} — including questions, explanations, diagrams, and game content — is our intellectual property or used under licence. Nothing in these terms transfers ownership of that content to you. You receive a personal, non-transferable licence to access the content for your own study purposes.</p>

      <h3>7. Disclaimer</h3>
      <p>{COMPANY} is an independent study platform and is not affiliated with, endorsed by, or a partner of Microsoft Corporation, Amazon Web Services, or Google LLC. Azure, AZ-900, AZ-104, AZ-305, AZ-700, and related marks are trademarks of Microsoft Corporation. We make no guarantee that use of our platform will result in passing any certification examination.</p>

      <h3>8. Limitation of liability</h3>
      <p>To the maximum extent permitted by law, {COMPANY} is not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.</p>

      <h3>9. Changes to these terms</h3>
      <p>We may update these terms. We will notify registered users by email of material changes at least 14 days before they take effect. Continued use of the service after that date constitutes acceptance of the updated terms.</p>

      <h3>10. Governing law</h3>
      <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

      <h3>11. Contact</h3>
      <p>Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-body">
      <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

      <h3>1. Who we are</h3>
      <p>{COMPANY} is the data controller for personal data processed through this service. Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>

      <h3>2. Data we collect</h3>
      <ul>
        <li><strong>Account data:</strong> email address and display name provided at registration.</li>
        <li><strong>Study progress:</strong> which cards you have studied, flagged, or mastered — stored in your browser's localStorage and linked to your account in our database.</li>
        <li><strong>Usage data:</strong> exam selections, streak activity, and daily goal completions, used to power your readiness dashboard.</li>
        <li><strong>Payment data:</strong> we do not store card details. Payments are handled entirely by LemonSqueezy; we receive only an order confirmation and your email address from them.</li>
      </ul>

      <h3>3. How we use your data</h3>
      <ul>
        <li>To provide and personalise the study service.</li>
        <li>To track your subscription status and unlock premium content.</li>
        <li>To send transactional emails (password reset, subscription confirmations).</li>
        <li>To improve content and identify gaps in the question bank using aggregated, anonymised usage patterns.</li>
      </ul>

      <h3>4. Legal basis (GDPR)</h3>
      <p>Processing is based on: (a) performance of a contract — to deliver the service you signed up for; (b) legitimate interests — to improve the service using anonymised analytics; (c) legal obligation — where required by applicable law.</p>

      <h3>5. Data processors and third parties</h3>
      <ul>
        <li><strong>Supabase</strong> — authentication and database (EU data centres).</li>
        <li><strong>Microsoft Azure</strong> — static web app hosting (UK South region).</li>
        <li><strong>LemonSqueezy</strong> — payment processing (Merchant of Record).</li>
      </ul>
      <p>We do not sell or share your personal data with any third party for marketing purposes.</p>

      <h3>6. Data retention</h3>
      <p>Account data is retained while your account is active and for 30 days after deletion to allow recovery. Study progress data is deleted when your account is deleted. Anonymised aggregate analytics may be retained indefinitely.</p>

      <h3>7. Your rights</h3>
      <p>Under UK GDPR and the Data Protection Act 2018, you have the right to: access your personal data; request correction of inaccurate data; request erasure ("right to be forgotten"); data portability; object to processing; withdraw consent where processing is based on consent. To exercise any right, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>

      <h3>8. Cookies and local storage</h3>
      <p>We use browser localStorage (not cookies) to store your study preferences and progress on your device. This data remains on your device and is not transmitted to our servers except when you are signed in and your progress syncs to your account.</p>

      <h3>9. Security</h3>
      <p>We use industry-standard security practices including TLS encryption in transit, Supabase Row Level Security policies, and hashed password storage. No system is completely secure; we will notify affected users in the event of a data breach as required by law.</p>

      <h3>10. Supervisory authority</h3>
      <p>You have the right to lodge a complaint with the UK Information Commissioner's Office (ICO): <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>

      <h3>11. Changes to this policy</h3>
      <p>We will notify registered users by email of material changes at least 14 days before they take effect.</p>
    </div>
  );
}

export default function LegalModal({ initialTab = "terms", onClose }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="legal-overlay" onClick={onClose}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-header">
          <div className="legal-tabs">
            <button
              className={`legal-tab${tab === "terms" ? " active" : ""}`}
              onClick={() => setTab("terms")}
            >
              Terms of Service
            </button>
            <button
              className={`legal-tab${tab === "privacy" ? " active" : ""}`}
              onClick={() => setTab("privacy")}
            >
              Privacy Policy
            </button>
          </div>
          <button className="legal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="legal-content">
          {tab === "terms" ? <TermsContent /> : <PrivacyContent />}
        </div>
      </div>
    </div>
  );
}
