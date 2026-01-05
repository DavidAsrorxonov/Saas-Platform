"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ClerkThemeSync({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  console.log(resolvedTheme);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        signIn: {
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        },
        pricingTable: {
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkThemeSync>{children}</ClerkThemeSync>
    </ThemeProvider>
  );
}
