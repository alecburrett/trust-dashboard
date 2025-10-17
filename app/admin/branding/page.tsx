"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrandingPage() {
  const [branding, setBranding] = useState({
    companyName: "",
    tagline: "",
    primaryColor: "#AC55FF",
    fontFamily: "Arial, sans-serif",
    logoUrl: "",
    headerImageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/branding")
      .then((res) => res.json())
      .then((data) => setBranding(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/branding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branding),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to update branding:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Branding</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Branding updated successfully!
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Customize Your Trust Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Company Name"
                value={branding.companyName}
                onChange={(e) =>
                  setBranding({ ...branding, companyName: e.target.value })
                }
                required
              />

              <Input
                label="Tagline"
                value={branding.tagline || ""}
                onChange={(e) =>
                  setBranding({ ...branding, tagline: e.target.value })
                }
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Primary Color"
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) =>
                    setBranding({ ...branding, primaryColor: e.target.value })
                  }
                />

                <Input
                  label="Font Family"
                  value={branding.fontFamily}
                  onChange={(e) =>
                    setBranding({ ...branding, fontFamily: e.target.value })
                  }
                  placeholder="Arial, sans-serif"
                />
              </div>

              <Input
                label="Logo URL"
                value={branding.logoUrl || ""}
                onChange={(e) =>
                  setBranding({ ...branding, logoUrl: e.target.value })
                }
                placeholder="https://example.com/logo.png"
              />

              <Input
                label="Header Image URL"
                value={branding.headerImageUrl || ""}
                onChange={(e) =>
                  setBranding({ ...branding, headerImageUrl: e.target.value })
                }
                placeholder="https://example.com/header.jpg"
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Link href="/" target="_blank">
                  <Button type="button" variant="outline">
                    Preview Public Site
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-6 rounded-lg border-2"
              style={{ borderColor: branding.primaryColor }}
            >
              <div className="flex items-center gap-4 mb-4">
                {branding.logoUrl && (
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                )}
                <div>
                  <h2
                    className="text-2xl font-bold"
                    style={{
                      color: branding.primaryColor,
                      fontFamily: branding.fontFamily,
                    }}
                  >
                    {branding.companyName || "Your Company"}
                  </h2>
                  {branding.tagline && (
                    <p className="text-gray-600">{branding.tagline}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
