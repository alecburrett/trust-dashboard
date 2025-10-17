import { Certification } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Badge from "../ui/Badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ComplianceCardProps {
  certification: Certification;
}

export default function ComplianceCard({ certification }: ComplianceCardProps) {
  const getStatusIcon = () => {
    switch (certification.status) {
      case "active":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "expired":
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusVariant = () => {
    switch (certification.status) {
      case "active":
        return "success" as const;
      case "in-progress":
        return "warning" as const;
      case "expired":
        return "error" as const;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-3">
          {getStatusIcon()}
          <div>
            <CardTitle className="text-lg">{certification.name}</CardTitle>
            <p className="mt-1 text-sm text-gray-500">{certification.type}</p>
          </div>
        </div>
        <Badge variant={getStatusVariant()}>{certification.status}</Badge>
      </CardHeader>
      <CardContent>
        {certification.description && (
          <p className="text-sm text-gray-600 mb-3">
            {certification.description}
          </p>
        )}
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          {certification.issueDate && (
            <p>Issued: {formatDate(certification.issueDate)}</p>
          )}
          {certification.expiryDate && (
            <p>Expires: {formatDate(certification.expiryDate)}</p>
          )}
        </div>
        {certification.documentUrl && (
          <a
            href={certification.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            View Certificate →
          </a>
        )}
      </CardContent>
    </Card>
  );
}
