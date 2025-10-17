import BrandedHeader from "@/components/public/BrandedHeader";
import SecurityControlPanel from "@/components/public/SecurityControlPanel";
import AIChat from "@/components/public/AIChat";
import { db } from "@/lib/db";

export default function SecurityPage() {
  const branding = db.getBrandingConfig()!;
  const controls = db.getSecurityControls();

  const groupedControls = controls.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {} as Record<string, typeof controls>);

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader branding={branding} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Security Controls
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Real-time view of our active security controls and monitoring
            systems. We continuously monitor and update our security posture to
            protect your data.
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(groupedControls).map(([category, categoryControls]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {categoryControls.map((control) => (
                  <SecurityControlPanel key={control.id} control={control} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {controls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No security controls configured at this time.
            </p>
          </div>
        )}
      </main>

      <AIChat />
    </div>
  );
}
