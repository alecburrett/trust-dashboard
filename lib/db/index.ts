import type {
  BrandingConfig,
  Certification,
  SecurityControl,
  Document,
  AccessRequest,
  Tag,
  AdminUser,
  Subscription,
} from "../types";

// Simple in-memory database (can be replaced with Vercel Postgres)
class Database {
  private brandingConfig: BrandingConfig | null = null;
  private certifications: Map<string, Certification> = new Map();
  private securityControls: Map<string, SecurityControl> = new Map();
  private documents: Map<string, Document> = new Map();
  private accessRequests: Map<string, AccessRequest> = new Map();
  private tags: Map<string, Tag> = new Map();
  private adminUsers: Map<string, AdminUser> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    // Default branding
    this.brandingConfig = {
      id: "default",
      companyName: "Your Company",
      tagline: "Building trust through transparency",
      primaryColor: "#AC55FF",
      fontFamily: "Arial, sans-serif",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Default certifications
    const defaultCerts: Omit<Certification, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "SOC 2 Type II",
        type: "SOC2",
        status: "active",
        description: "Service Organization Control 2 certification",
      },
      {
        name: "ISO 27001",
        type: "ISO27001",
        status: "active",
        description: "Information Security Management certification",
      },
      {
        name: "GDPR Compliant",
        type: "GDPR",
        status: "active",
        description: "General Data Protection Regulation compliance",
      },
    ];

    defaultCerts.forEach((cert, index) => {
      const id = `cert-${index}`;
      this.certifications.set(id, {
        ...cert,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Default security controls
    const defaultControls: Omit<SecurityControl, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "Multi-Factor Authentication",
        category: "Access Control",
        status: "active",
        description: "MFA required for all user accounts",
      },
      {
        name: "Data Encryption at Rest",
        category: "Data Security",
        status: "active",
        description: "AES-256 encryption for all stored data",
      },
      {
        name: "Regular Security Audits",
        category: "Compliance",
        status: "active",
        description: "Quarterly security assessments and audits",
      },
      {
        name: "Intrusion Detection System",
        category: "Network Security",
        status: "monitoring",
        description: "24/7 monitoring for suspicious activity",
      },
    ];

    defaultControls.forEach((control, index) => {
      const id = `control-${index}`;
      this.securityControls.set(id, {
        ...control,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  // Branding Config Methods
  getBrandingConfig(): BrandingConfig | null {
    return this.brandingConfig;
  }

  updateBrandingConfig(config: Partial<BrandingConfig>): BrandingConfig {
    this.brandingConfig = {
      ...this.brandingConfig!,
      ...config,
      updatedAt: new Date(),
    };
    return this.brandingConfig;
  }

  // Certification Methods
  getCertifications(): Certification[] {
    return Array.from(this.certifications.values());
  }

  getCertification(id: string): Certification | undefined {
    return this.certifications.get(id);
  }

  createCertification(
    cert: Omit<Certification, "id" | "createdAt" | "updatedAt">
  ): Certification {
    const id = `cert-${Date.now()}`;
    const newCert: Certification = {
      ...cert,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.certifications.set(id, newCert);
    return newCert;
  }

  updateCertification(
    id: string,
    updates: Partial<Certification>
  ): Certification | null {
    const cert = this.certifications.get(id);
    if (!cert) return null;

    const updated = { ...cert, ...updates, updatedAt: new Date() };
    this.certifications.set(id, updated);
    return updated;
  }

  deleteCertification(id: string): boolean {
    return this.certifications.delete(id);
  }

  // Security Control Methods
  getSecurityControls(): SecurityControl[] {
    return Array.from(this.securityControls.values());
  }

  getSecurityControl(id: string): SecurityControl | undefined {
    return this.securityControls.get(id);
  }

  createSecurityControl(
    control: Omit<SecurityControl, "id" | "createdAt" | "updatedAt">
  ): SecurityControl {
    const id = `control-${Date.now()}`;
    const newControl: SecurityControl = {
      ...control,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.securityControls.set(id, newControl);
    return newControl;
  }

  updateSecurityControl(
    id: string,
    updates: Partial<SecurityControl>
  ): SecurityControl | null {
    const control = this.securityControls.get(id);
    if (!control) return null;

    const updated = { ...control, ...updates, updatedAt: new Date() };
    this.securityControls.set(id, updated);
    return updated;
  }

  deleteSecurityControl(id: string): boolean {
    return this.securityControls.delete(id);
  }

  // Document Methods
  getDocuments(): Document[] {
    return Array.from(this.documents.values());
  }

  getDocument(id: string): Document | undefined {
    return this.documents.get(id);
  }

  createDocument(
    doc: Omit<Document, "id" | "createdAt" | "updatedAt">
  ): Document {
    const id = `doc-${Date.now()}`;
    const newDoc: Document = {
      ...doc,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.documents.set(id, newDoc);
    return newDoc;
  }

  updateDocument(id: string, updates: Partial<Document>): Document | null {
    const doc = this.documents.get(id);
    if (!doc) return null;

    const updated = { ...doc, ...updates, updatedAt: new Date() };
    this.documents.set(id, updated);
    return updated;
  }

  deleteDocument(id: string): boolean {
    return this.documents.delete(id);
  }

  // Access Request Methods
  getAccessRequests(): AccessRequest[] {
    return Array.from(this.accessRequests.values());
  }

  getAccessRequest(id: string): AccessRequest | undefined {
    return this.accessRequests.get(id);
  }

  createAccessRequest(
    request: Omit<AccessRequest, "id" | "createdAt" | "updatedAt">
  ): AccessRequest {
    const id = `req-${Date.now()}`;
    const newRequest: AccessRequest = {
      ...request,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.accessRequests.set(id, newRequest);
    return newRequest;
  }

  updateAccessRequest(
    id: string,
    updates: Partial<AccessRequest>
  ): AccessRequest | null {
    const request = this.accessRequests.get(id);
    if (!request) return null;

    const updated = { ...request, ...updates, updatedAt: new Date() };
    this.accessRequests.set(id, updated);
    return updated;
  }

  // Admin User Methods
  getAdminUser(email: string): AdminUser | undefined {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.email === email
    );
  }

  createAdminUser(
    user: Omit<AdminUser, "id" | "createdAt">
  ): AdminUser {
    const id = `admin-${Date.now()}`;
    const newUser: AdminUser = {
      ...user,
      id,
      createdAt: new Date(),
    };
    this.adminUsers.set(id, newUser);
    return newUser;
  }

  updateAdminUser(id: string, updates: Partial<AdminUser>): AdminUser | null {
    const user = this.adminUsers.get(id);
    if (!user) return null;

    const updated = { ...user, ...updates };
    this.adminUsers.set(id, updated);
    return updated;
  }

  // Tag Methods
  getTags(): Tag[] {
    return Array.from(this.tags.values());
  }

  createTag(tag: Omit<Tag, "id" | "createdAt">): Tag {
    const id = `tag-${Date.now()}`;
    const newTag: Tag = {
      ...tag,
      id,
      createdAt: new Date(),
    };
    this.tags.set(id, newTag);
    return newTag;
  }

  deleteTag(id: string): boolean {
    return this.tags.delete(id);
  }

  // Subscription Methods
  getSubscription(email: string): Subscription | undefined {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.email === email
    );
  }

  createSubscription(
    sub: Omit<Subscription, "id" | "createdAt">
  ): Subscription {
    const id = `sub-${Date.now()}`;
    const newSub: Subscription = {
      ...sub,
      id,
      createdAt: new Date(),
    };
    this.subscriptions.set(id, newSub);
    return newSub;
  }

  updateSubscription(
    email: string,
    preferences: Subscription["preferences"]
  ): Subscription | null {
    const sub = this.getSubscription(email);
    if (!sub) return null;

    sub.preferences = preferences;
    this.subscriptions.set(sub.id, sub);
    return sub;
  }
}

// Export singleton instance
export const db = new Database();
