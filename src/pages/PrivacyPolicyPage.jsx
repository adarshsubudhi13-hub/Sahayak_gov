/**
 * PrivacyPolicyPage – DPDP Act 2023 aligned, plain language.
 * Per the UI/UX Design Brief: accurate to what the product actually does.
 * Last updated: July 2026
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const LAST_UPDATED = 'July 31, 2026';
const CONTACT_EMAIL = 'privacy@sahayak.gov.in';

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

export function PrivacyPolicyPage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6 space-y-8">

      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-700 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-8 text-white space-y-2">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> Legal Document
        </div>
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-teal-100 text-sm">Sahayak — AI Government Scheme Navigator</p>
        <p className="text-teal-300 text-xs">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-8">

        {/* Plain-language summary */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-bold text-teal-900">Plain-Language Summary</h2>
          <ul className="text-xs text-teal-800 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>We collect only what is needed to match you to government schemes — your age, income band, state, and social category.</li>
            <li>We <Bold>never</Bold> collect your Aadhaar number, PAN number, or any national identity document.</li>
            <li>Your data is used exclusively to run the eligibility engine and AI assistant on your behalf.</li>
            <li>You can delete your account and all associated data at any time.</li>
            <li>We do not sell or share your personal data with any third party for commercial purposes.</li>
          </ul>
        </div>

        <Section title="1. Who We Are">
          <p>
            Sahayak is an AI-powered government scheme navigator built to help Indian citizens discover,
            understand, and apply for central and state government welfare schemes. The product is operated
            by the Sahayak team ("<Bold>we</Bold>", "<Bold>us</Bold>", or "<Bold>our</Bold>").
          </p>
          <p>
            For privacy questions, contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline font-medium">{CONTACT_EMAIL}</a>
          </p>
        </Section>

        <Section title="2. What Data We Collect">
          <p>We collect the following categories of personal data:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  {['Category', 'Examples', 'Purpose', 'Mandatory?'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-700 border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Identity',       'Verified mobile number',                       'Authentication via OTP',              'Yes'],
                  ['Profile',        'Age, gender, state, district, income band, occupation, social category, disability status', 'Scheme eligibility matching', 'Yes (for matching)'],
                  ['Usage',          'Schemes viewed, AI queries, applications submitted', 'B2G analytics dashboard; product improvement', 'Automatic'],
                  ['AI Chat Logs',   'Questions asked, answers received, confidence scores', 'Human review queue; quality assurance', 'Automatic'],
                  ['Device / Tech',  'Browser type, operating system, language',     'Performance monitoring',               'Automatic'],
                ].map(([cat, ex, pur, man]) => (
                  <tr key={cat} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold text-gray-900">{cat}</td>
                    <td className="px-4 py-2.5 text-gray-600">{ex}</td>
                    <td className="px-4 py-2.5 text-gray-600">{pur}</td>
                    <td className="px-4 py-2.5 text-gray-600">{man}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-red-700 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            ⚠ We do NOT collect: Aadhaar number, PAN number, passport number, bank account details,
            biometric data, or any government-issued identity number. This is a firm product principle,
            not merely an implementation gap.
          </p>
        </Section>

        <Section title="3. Legal Basis for Processing (DPDP Act 2023)">
          <p>
            Under India's Digital Personal Data Protection Act 2023 ("DPDP Act"), we process your
            personal data on the following bases:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><Bold>Consent</Bold> — for profile data, AI chat logs, and usage analytics. You provide explicit consent during onboarding and may withdraw it at any time.</li>
            <li><Bold>Legitimate use</Bold> — for authentication (OTP verification) to secure your account.</li>
            <li><Bold>Legal obligation</Bold> — if required by a competent authority under applicable Indian law.</li>
          </ul>
        </Section>

        <Section title="4. Consent — How We Obtain and Manage It">
          <p>
            Before we collect any personal data beyond what is strictly necessary for authentication,
            we display a clear consent notice explaining:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>What data will be collected and why.</li>
            <li>How long it will be retained.</li>
            <li>Your right to withdraw consent at any time from your profile settings.</li>
          </ul>
          <p>
            Consent records (timestamp, version of notice, channel) are stored server-side.
            Withdrawing consent stops new data collection; previously collected data is deleted
            within 30 days of withdrawal unless retention is required by law.
          </p>
        </Section>

        <Section title="5. How We Use Your Data">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Run the deterministic eligibility engine to match you to government schemes.</li>
            <li>Power the AI assistant's citation-grounded answers about scheme eligibility.</li>
            <li>Pre-fill application records when you choose to apply for a scheme.</li>
            <li>Generate aggregated (non-personally-identifiable) analytics for state government partners showing scheme demand and awareness-to-application gaps.</li>
            <li>Improve the quality and accuracy of AI answers through human review of flagged responses.</li>
          </ul>
          <p>
            We do <Bold>not</Bold> use your data for targeted advertising, credit scoring, insurance
            underwriting, or any profiling beyond government scheme eligibility.
          </p>
        </Section>

        <Section title="6. Data Sharing">
          <p>We share personal data only in these limited circumstances:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><Bold>Supabase (infrastructure provider)</Bold> — our managed database and authentication provider. Data is stored in their servers. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Supabase Privacy Policy</a>.</li>
            <li><Bold>OpenAI (AI provider)</Bold> — your AI chat queries are sent to OpenAI's API to generate answers. OpenAI processes these as per their <a href="https://openai.com/policies/api-data-usage-policies" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">API Data Usage Policy</a>. We do not send your name, phone number, or profile fields to OpenAI — only your question text.</li>
            <li><Bold>State government partners (B2G)</Bold> — only aggregated, anonymised statistical data is shared. No individual-level personal data is shared.</li>
            <li><Bold>Legal requirements</Bold> — if compelled by a court order or government authority under applicable Indian law.</li>
          </ul>
          <p>We do <Bold>not</Bold> sell your personal data to any third party.</p>
        </Section>

        <Section title="7. Data Retention">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><Bold>Account and profile data</Bold> — retained while your account is active, or until you request deletion.</li>
            <li><Bold>AI chat logs</Bold> — retained for 90 days for quality review, then purged.</li>
            <li><Bold>Application records</Bold> — retained for 2 years for audit and dispute resolution, then deleted.</li>
            <li><Bold>Telemetry events</Bold> — retained in aggregated form; raw events purged after 180 days.</li>
            <li><Bold>Consent records</Bold> — retained for 7 years as required by DPDP Act 2023.</li>
          </ul>
        </Section>

        <Section title="8. Data Localisation">
          <p>
            Our primary database is hosted within India via Supabase's India region wherever available.
            AI processing via OpenAI may involve data transfer outside India; we rely on OpenAI's
            standard contractual protections for such transfers. We will update this section as
            data residency options evolve.
          </p>
        </Section>

        <Section title="9. Your Rights (DPDP Act 2023)">
          <p>You have the following rights under the DPDP Act 2023:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['Right to Access',    'Request a copy of all personal data we hold about you.'],
              ['Right to Correction','Request correction of inaccurate or incomplete personal data.'],
              ['Right to Erasure',   'Request deletion of your personal data (account deletion).'],
              ['Right to Withdraw Consent', 'Withdraw consent for data processing at any time.'],
              ['Right to Grievance Redressal', 'Lodge a complaint with our Data Protection Officer.'],
              ['Right to Nominate', 'Nominate another person to exercise these rights on your behalf in case of death or incapacity.'],
            ].map(([right, desc]) => (
              <div key={right} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs font-bold text-teal-800">{right}</p>
                <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
          <p>
            To exercise any right, email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline font-medium">{CONTACT_EMAIL}</a>.
            We will respond within 30 days.
          </p>
        </Section>

        <Section title="10. Security">
          <p>We implement the following technical and organisational security measures:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All data in transit is encrypted via TLS (HTTPS).</li>
            <li>Data at rest is encrypted by our database provider.</li>
            <li>Row-Level Security (RLS) policies ensure users can only access their own data.</li>
            <li>OTP-based authentication — no passwords stored in our system.</li>
            <li>Rate limiting on authentication and API endpoints.</li>
            <li>Human review queue for AI responses flagged as potentially inaccurate.</li>
          </ul>
        </Section>

        <Section title="11. Breach Notification">
          <p>
            In the event of a personal data breach, we will notify affected users and the Data
            Protection Board of India within 72 hours of becoming aware, as required by the
            DPDP Act 2023. Notification will describe the nature of the breach, data involved,
            likely consequences, and remedial measures taken.
          </p>
        </Section>

        <Section title="12. Children's Data">
          <p>
            Sahayak is not directed at children under 18. We do not knowingly collect personal data
            from anyone under 18 without verifiable parental consent. If you believe a child has
            provided us personal data, contact us immediately at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline font-medium">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We will post any material changes to this policy on this page with an updated "Last
            updated" date. If changes are significant, we will notify you via SMS or in-app notice.
            Continued use of Sahayak after changes constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="14. Data Protection Officer / Grievance Officer">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-1">
            <p className="font-bold text-gray-900">Sahayak Data Protection Officer</p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">{CONTACT_EMAIL}</a></p>
            <p>Response time: Within 30 days of receiving a request.</p>
          </div>
        </Section>

      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 pb-8">
        <Link to="/terms" className="text-teal-700 hover:underline font-semibold">Terms of Service</Link>
        <span>·</span>
        <Link to="/" className="hover:underline">Home</Link>
      </div>
    </div>
  );
}
