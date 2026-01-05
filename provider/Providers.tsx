"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    >
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
