import BrandedHeader from "@/components/public/BrandedHeader";
import ComplianceCard from "@/components/public/ComplianceCard";
import SecurityControlPanel from "@/components/public/SecurityControlPanel";
import AIChat from "@/components/public/AIChat";
import { db } from "@/lib/db";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  const branding = db.getBrandingConfig()!;
  const certifications = db.getCertifications().slice(0, 3);
  const controls = db.getSecurityControls().slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader branding={branding} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Security & Compliance Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, real-time view of our security posture and compliance
            certifications. We believe in building trust through openness.
          </p>
        </section>

        {/* Certifications Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Certifications & Compliance
            </h2>
            <Link href="/certifications">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <ComplianceCard key={cert.id} certification={cert} />
            ))}
          </div>
        </section>

        {/* Security Controls Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Active Security Controls
            </h2>
            <Link href="/security">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {controls.map((control) => (
              <SecurityControlPanel key={control.id} control={control} />
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/privacy"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Privacy Policy
              </h3>
              <p className="text-sm text-gray-600">
                Learn how we protect and handle your data
              </p>
            </Link>
            <Link
              href="/reports"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Security Reports
              </h3>
              <p className="text-sm text-gray-600">
                Access detailed security and audit reports
              </p>
            </Link>
            <Link
              href="/admin"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Admin Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Manage your trust dashboard content
              </p>
            </Link>
          </div>
        </section>
      </main>

      <AIChat />

      <footer className="border-t border-gray-200 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} {branding.companyName}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
