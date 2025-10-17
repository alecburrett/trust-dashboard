export interface BrandingConfig {
  id: string;
  logoUrl?: string;
  headerImageUrl?: string;
  primaryColor: string;
  fontFamily: string;
  companyName: string;
  tagline?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  type: string; // SOC2, ISO27001, GDPR, etc.
  status: "active" | "in-progress" | "expired";
  issueDate?: Date;
  expiryDate?: Date;
  documentUrl?: string;
  badgeUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecurityControl {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive" | "monitoring";
  description: string;
  lastChecked?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  type: string; // report, policy, etc.
  fileUrl?: string;
  isGated: boolean;
  requiresNda: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessRequest {
  id: string;
  documentId: string;
  email: string;
  fullName: string;
  company?: string;
  status: "pending" | "approved" | "denied";
  ndaSigned: boolean;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  category: "product" | "region" | "industry" | "other";
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Subscription {
  id: string;
  email: string;
  preferences: {
    newCertifications: boolean;
    securityUpdates: boolean;
    newReports: boolean;
  };
  createdAt: Date;
}
