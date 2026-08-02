/**
 * TermsOfServicePage — accurate to what the product actually does.
 * Per the PRD/UI Design Brief: never misrepresent capability.
 * Last updated: July 2026
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const LAST_UPDATED = 'July 31, 2026';
const CONTACT_EMAIL = 'legal@sahayak.gov.in';

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">{title}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Bold({ children }) {
  return <span className="font-semibold text-gray-900">{children}</span>;
}

export function TermsOfServicePage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6 space-y-8">

      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-700 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-3xl p-8 text-white space-y-2">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
          <FileText className="w-4 h-4" /> Legal Document
        </div>
        <h1 className="text-3xl font-extrabold">Terms of Service</h1>
        <p className="text-teal-100 text-sm">Sahayak — AI Government Scheme Navigator</p>
        <p className="text-teal-300 text-xs">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-8">

        {/* Important notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-bold text-amber-900">Important — Read Before Using Sahayak</h2>
          <p className="text-xs text-amber-800 leading-relaxed">
            Sahayak is an <Bold>information and navigation tool</Bold>, not a government portal.
            Scheme information is verified to the best of our ability but may not reflect the
            most current government notifications. <Bold>Always verify eligibility and application
            details directly on the official government portal before applying.</Bold>
          </p>
        </div>

        <Section title="1. What Sahayak Is (and Is Not)">
          <p>
            Sahayak is a citizen-facing tool that helps you discover, understand, and prepare
            applications for Indian central and state government welfare schemes. It is{' '}
            <Bold>not</Bold>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>An official government portal or a substitute for one.</li>
            <li>A legal advisor, financial advisor, or medical advisor.</li>
            <li>A guarantee of scheme eligibility — eligibility determinations are made solely by the relevant government authority.</li>
            <li>Responsible for decisions made by any government body regarding your application.</li>
          </ul>
        </Section>

        <Section title="2. Acceptance of Terms">
          <p>
            By accessing or using Sahayak, you agree to these Terms of Service and our{' '}
            <Link to="/privacy" className="text-teal-700 underline">Privacy Policy</Link>.
            If you do not agree, do not use Sahayak.
          </p>
          <p>
            You must be 18 years of age or older to create an account. Users under 18 may use
            Sahayak only with verifiable parental consent.
          </p>
        </Section>

        <Section title="3. Account and Authentication">
          <p>
            Authentication is via OTP sent to your registered Indian mobile number.
            You are responsible for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Ensuring your mobile number is active and accessible.</li>
            <li>Not sharing your OTP with anyone.</li>
            <li>Notifying us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">{CONTACT_EMAIL}</a>{' '}
              if you suspect unauthorized access to your account.
            </li>
          </ul>
        </Section>

        <Section title="4. AI Assistant — Limitations and Accuracy">
          <p>
            The Sahayak AI assistant generates answers grounded in official government scheme
            documents. However:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>AI-generated answers may contain errors, omissions, or outdated information.</li>
            <li>When the assistant's confidence is below its threshold, it will direct you to the official government portal — this is by design, not a malfunction.</li>
            <li>Answers are not legal advice. Always cross-verify with the scheme's official notification (Government Order / GO).</li>
            <li>Sahayak is not liable for any financial loss, rejection of application, or other consequence arising from reliance on AI-generated content.</li>
          </ul>
        </Section>

        <Section title="5. Scheme Data Accuracy">
          <p>
            We maintain a "last verified" timestamp on all scheme data. Scheme terms — including
            income limits, deadlines, benefit amounts, and eligibility criteria — change frequently.
            You acknowledge that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Sahayak scheme data may lag behind the most recent government notification.</li>
            <li>A scheme being listed on Sahayak does not guarantee it is currently open or funded.</li>
            <li>You will verify the current status of any scheme directly with the relevant government department before submitting an official application.</li>
          </ul>
        </Section>

        <Section title="6. Application Records">
          <p>
            The "Apply" feature in Sahayak creates an <Bold>internal record</Bold> of your intent
            to apply. This is <Bold>not</Bold> a submission to the government. To actually apply
            for a scheme, you must:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Visit the official government portal linked on each scheme's detail page, or</li>
            <li>Visit your nearest Common Service Centre (CSC) / e-Seva centre.</li>
          </ul>
        </Section>

        <Section title="7. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Provide false information in your profile to fraudulently match schemes you do not qualify for.</li>
            <li>Attempt to reverse-engineer, scrape, or automate access to Sahayak's APIs.</li>
            <li>Use Sahayak to impersonate any government official or body.</li>
            <li>Submit content that is abusive, defamatory, or violates any applicable law.</li>
            <li>Attempt to circumvent rate limits or authentication mechanisms.</li>
          </ul>
          <p>
            Violation of these terms may result in immediate account suspension and, where applicable,
            reporting to relevant authorities.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            Government scheme data reproduced on Sahayak originates from publicly available
            government notifications and is not claimed as proprietary. The Sahayak platform,
            including its eligibility engine, RAG pipeline, and interface design, is the
            intellectual property of the Sahayak team. You may not reproduce, distribute, or
            create derivative works without written permission.
          </p>
        </Section>

        <Section title="9. B2G Analytics Data">
          <p>
            Aggregated, anonymised usage data (scheme demand heatmaps, awareness-to-application
            gaps) may be shared with state government departments to help improve welfare scheme
            delivery. No personally identifiable information is included in such reports.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Sahayak and its team shall not be
            liable for any indirect, incidental, consequential, or punitive damages arising from:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Reliance on scheme information or AI-generated content.</li>
            <li>Rejection of a government scheme application.</li>
            <li>Service interruptions, data loss, or security incidents beyond our reasonable control.</li>
          </ul>
          <p>
            Our total aggregate liability to any user for any claim shall not exceed ₹10,000 (Ten
            Thousand Rupees) or the amount you paid to use Sahayak in the preceding 12 months,
            whichever is lower.
          </p>
        </Section>

        <Section title="11. Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of India. Any dispute shall first be addressed
            through good-faith negotiation. Unresolved disputes shall be subject to the exclusive
            jurisdiction of the courts of Hyderabad, Telangana, India.
          </p>
        </Section>

        <Section title="12. Changes to Terms">
          <p>
            We may update these Terms at any time. Material changes will be communicated via SMS
            or in-app notification at least 15 days before they take effect. Continued use of
            Sahayak after the effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="13. Contact">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-1">
            <p className="font-bold text-gray-900">Sahayak Legal Team</p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">{CONTACT_EMAIL}</a></p>
          </div>
        </Section>

      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 pb-8">
        <Link to="/privacy" className="text-teal-700 hover:underline font-semibold">Privacy Policy</Link>
        <span>·</span>
        <Link to="/" className="hover:underline">Home</Link>
      </div>
    </div>
  );
}
