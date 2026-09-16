import React from "react";
import { Users, UserCheck, UserX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const AdminStats = ({ totalUsers, activeUsers, inactiveUsers }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total */}
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Total Users
            </p>

            <p className="mt-2 text-2xl font-semibold">{totalUsers}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Users size={21} className="text-zinc-600 dark:text-zinc-300" />
          </div>
        </CardContent>
      </Card>

      {/* Active */}
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Active Users
            </p>

            <p className="mt-2 text-2xl font-semibold">{activeUsers}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10">
            <UserCheck
              size={21}
              className="text-green-600 dark:text-green-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inactive */}
      <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Inactive Users
            </p>

            <p className="mt-2 text-2xl font-semibold">{inactiveUsers}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10">
            <UserX size={21} className="text-red-600 dark:text-red-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
