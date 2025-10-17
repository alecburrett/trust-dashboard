import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { db } from "@/lib/db";
import { Shield, FileText, Palette, Users, Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Auth error:", error);
    redirect("/admin/login");
  }

  if (!session) {
    redirect("/admin/login");
  }

  const certifications = db.getCertifications();
  const controls = db.getSecurityControls();
  const documents = db.getDocuments();
  const accessRequests = db.getAccessRequests();

  const stats = [
    {
      title: "Certifications",
      value: certifications.length,
      icon: Shield,
      href: "/admin/certifications",
    },
    {
      title: "Security Controls",
      value: controls.length,
      icon: Shield,
      href: "/admin/controls",
    },
    {
      title: "Documents",
      value: documents.length,
      icon: FileText,
      href: "/admin/documents",
    },
    {
      title: "Access Requests",
      value: accessRequests.filter((r) => r.status === "pending").length,
      icon: Users,
      href: "/admin/access-requests",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Trust Dashboard Admin
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  View Public Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Manage your trust dashboard content and settings
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Link href={stat.href} className="text-sm text-primary hover:underline mt-1 inline-block">
                  Manage →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/branding">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>Customize colors, logo, and theme</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/certifications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>Manage compliance certifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/controls">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Security Controls</CardTitle>
                    <CardDescription>Manage active security controls</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/documents">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Manage reports and documents</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/access-requests">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Access Requests</CardTitle>
                    <CardDescription>Review document access requests</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Configure dashboard settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
