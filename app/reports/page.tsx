import BrandedHeader from "@/components/public/BrandedHeader";
import AIChat from "@/components/public/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { db } from "@/lib/db";
import { FileText, Lock } from "lucide-react";

export default function ReportsPage() {
  const branding = db.getBrandingConfig()!;
  const documents = db.getDocuments();

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandedHeader branding={branding} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Security Reports & Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Access our security reports, audit documents, and compliance
            certifications. Some documents may require approval to access.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      {doc.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {doc.isGated && (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{doc.type}</Badge>
                  <Button
                    size="sm"
                    variant={doc.isGated ? "outline" : "primary"}
                  >
                    {doc.isGated ? "Request Access" : "Download"}
                  </Button>
                </div>
                {doc.requiresNda && (
                  <p className="mt-3 text-xs text-gray-500">
                    * Requires NDA signature
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {documents.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No documents are currently available.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Check back later or contact us for specific reports.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <AIChat />
    </div>
  );
}
