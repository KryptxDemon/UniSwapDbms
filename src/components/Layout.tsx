import React from "react";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./theme/theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
  user?: { role: "student" | "admin" } | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation user={user} />
      <main className="flex-1 ml-64 px-8 py-6 max-w-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};
