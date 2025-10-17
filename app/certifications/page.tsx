import BrandedHeader from "@/components/public/BrandedHeader";
import ComplianceCard from "@/components/public/ComplianceCard";
import AIChat from "@/components/public/AIChat";
import { db } from "@/lib/db";

export default function CertificationsPage() {
  const branding = db.getBrandingConfig()!;
  const certifications = db.getCertifications();

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader branding={branding} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certifications & Compliance
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We maintain rigorous security and compliance certifications to
            ensure the highest standards of data protection and operational
            excellence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <ComplianceCard key={cert.id} certification={cert} />
          ))}
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No certifications available at this time.
            </p>
          </div>
        )}
      </main>

      <AIChat />
    </div>
  );
}
