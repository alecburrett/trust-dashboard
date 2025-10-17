import { SecurityControl } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Badge from "../ui/Badge";
import { Shield, Activity, ShieldOff } from "lucide-react";

interface SecurityControlPanelProps {
  control: SecurityControl;
}

export default function SecurityControlPanel({
  control,
}: SecurityControlPanelProps) {
  const getStatusIcon = () => {
    switch (control.status) {
      case "active":
        return <Shield className="h-5 w-5 text-green-600" />;
      case "monitoring":
        return <Activity className="h-5 w-5 text-blue-600" />;
      case "inactive":
        return <ShieldOff className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusVariant = () => {
    switch (control.status) {
      case "active":
        return "success" as const;
      case "monitoring":
        return "default" as const;
      case "inactive":
        return "secondary" as const;
    }
  };

  const getStatusColor = () => {
    switch (control.status) {
      case "active":
        return "bg-green-100 border-green-200";
      case "monitoring":
        return "bg-blue-100 border-blue-200";
      case "inactive":
        return "bg-gray-100 border-gray-200";
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${getStatusColor()}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-start gap-3">
          {getStatusIcon()}
          <div>
            <CardTitle className="text-base">{control.name}</CardTitle>
            <p className="mt-1 text-xs text-gray-600">{control.category}</p>
          </div>
        </div>
        <Badge variant={getStatusVariant()} className="capitalize">
          {control.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{control.description}</p>
        {control.lastChecked && (
          <p className="mt-2 text-xs text-gray-500">
            Last checked: {new Date(control.lastChecked).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
