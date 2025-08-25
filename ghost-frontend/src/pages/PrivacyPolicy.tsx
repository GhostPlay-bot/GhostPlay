import { VisitorsNavBar } from "../components/VisitorsNavBar";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            <VisitorsNavBar />

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                <h1 className="text-3xl font-bold">Privacy & Policy</h1>
                <p className="text-gray-400 text-sm">Date Edited: August 24, 2025</p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">
                        Introduction
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Ghost is a secure web platform that allows users to transfer, sell,
                        and buy game accounts with confidence. We value your trust and are
                        committed to protecting your privacy and handling your information
                        responsibly. This Privacy Policy explains how we collect, use, and
                        safeguard your data when you use Ghost.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li>Account details such as email, username, and authentication data.</li>
                        <li>Usage information (pages visited, actions taken) to improve Ghost.</li>
                        <li>
                            Voluntary submissions such as game guides, feedback, or support
                            requests.
                        </li>
                        <li>Transaction-related details when buying or selling accounts.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li>To enable secure account transfers between buyers and sellers.</li>
                        <li>To verify and protect user accounts from unauthorized access.</li>
                        <li>To provide customer support and respond to inquiries.</li>
                        <li>To improve Ghost’s features, security, and performance.</li>
                        <li>
                            To share community contributions (e.g., guides, achievements) with
                            proper credit.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Sharing & Disclosure</h2>
                    <p className="text-gray-300 text-sm">
                        We do not sell or rent your personal information. We may share data
                        only in the following cases:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mt-2">
                        <li>With trusted third-party services that power Ghost (e.g. Supabase).</li>
                        <li>With payment processors when completing transactions.</li>
                        <li>If required by law, legal process, or government request.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Security</h2>
                    <p className="text-gray-300 text-sm">
                        We implement strong technical and organizational measures to protect
                        your information. However, no system is 100% secure. We encourage
                        users to follow best practices such as enabling two-factor
                        authentication and never sharing private credentials outside the
                        platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
                    <p className="text-gray-300 text-sm">
                        You may request access to your data, correct inaccuracies, or delete
                        your account at any time. Contact us at{" "}
                        <span className="text-blue-400">support@ghost.gg</span> for such
                        requests.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
                    <p className="text-gray-300 text-sm">
                        Ghost integrates third-party APIs and services, such as:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mt-2">
                        <li>Supabase for authentication and database services.</li>
                        <li>X (formerly Twitter) API for news/announcements.</li>
                        <li>Affiliate partners (e.g., Amazon) for store listings.</li>
                    </ul>
                    <p className="text-gray-300 text-sm mt-2">
                        These services may collect limited data in accordance with their own
                        policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Changes to this Policy</h2>
                    <p className="text-gray-300 text-sm">
                        We may update this Privacy Policy from time to time to reflect
                        changes in features, practices, or legal requirements. We will
                        notify users of major updates via announcements.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                    <p className="text-gray-300 text-sm">
                        For any questions, concerns, or feedback regarding this Privacy
                        Policy, please contact us at{" "}
                        <span className="text-blue-400">support@ghost.gg</span>.
                    </p>
                </section>
            </div>
        </div>
    )
}