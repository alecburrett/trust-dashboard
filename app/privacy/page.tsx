import BrandedHeader from "@/components/public/BrandedHeader";
import AIChat from "@/components/public/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { db } from "@/lib/db";

export default function PrivacyPage() {
  const branding = db.getBrandingConfig()!;

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader branding={branding} />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We collect only the information necessary to provide our
                services. This includes account information, usage data, and any
                content you create or upload. All data collection is done in
                accordance with applicable privacy laws including GDPR and CCPA.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your data is protected using industry-standard encryption both
                in transit (TLS 1.3) and at rest (AES-256). We implement strict
                access controls and regularly audit our security practices to
                ensure your data remains secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We retain your data only for as long as necessary to provide
                our services and comply with legal obligations. You can request
                deletion of your data at any time, subject to our legal
                retention requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We use carefully vetted third-party service providers to help
                deliver our services. All third parties are required to maintain
                appropriate security measures and use your data only for the
                purposes we specify.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have any questions about our privacy practices or wish to
                exercise your data rights, please contact us at{" "}
                <a
                  href="mailto:privacy@example.com"
                  className="text-primary hover:underline"
                >
                  privacy@example.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <AIChat />
    </div>
  );
}
