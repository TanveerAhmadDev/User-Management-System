import React from "react";
import { LogOut, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const AdminHeader = ({ onLogout, user }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h1 className="font-semibold">Admin Dashboard</h1>

            <p className="hidden text-xs text-zinc-500 dark:text-zinc-500 sm:block">
              User Management
            </p>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{user?.name}</p>

            <p className="text-xs text-zinc-500">{user?.email}</p>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            className="border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <LogOut size={18} />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
