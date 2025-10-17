"use client";

import { BrandingConfig } from "@/lib/types";
import Image from "next/image";

interface BrandedHeaderProps {
  branding: BrandingConfig;
}

export default function BrandedHeader({ branding }: BrandedHeaderProps) {
  return (
    <header
      className="relative w-full"
      style={{ borderBottomColor: branding.primaryColor }}
    >
      {/* Header Image */}
      {branding.headerImageUrl && (
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={branding.headerImageUrl}
            alt="Header"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Company Info */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {branding.logoUrl && (
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={branding.logoUrl}
                alt={branding.companyName}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <h1
              className="text-3xl font-bold"
              style={{
                color: branding.primaryColor,
                fontFamily: branding.fontFamily,
              }}
            >
              {branding.companyName}
            </h1>
            {branding.tagline && (
              <p className="mt-1 text-gray-600">{branding.tagline}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <a
              href="/"
              className="text-gray-900 hover:text-primary transition-colors"
            >
              Overview
            </a>
            <a
              href="/certifications"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Certifications
            </a>
            <a
              href="/security"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Security
            </a>
            <a
              href="/privacy"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="/reports"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Reports
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
