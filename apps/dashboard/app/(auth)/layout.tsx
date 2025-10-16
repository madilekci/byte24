import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-muted">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={200}
        height={200}
        className="mb-4"
      />
      {children}
      <div className="mt-4 text-muted-foreground text-xs">
        <p>
          &copy; {new Date().getFullYear()} BYTE24. Alle rechten voorbehouden.
        </p>
      </div>
    </div>
  );
}
