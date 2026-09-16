import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserDetails = ({ user, onClose }) => {
  return (
    <Card className="mt-6 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Selected User</CardTitle>

          <Button
            variant="ghost"
            onClick={onClose}
            className="text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Close
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <UserField label="Full Name" value={user.name} />

          <UserField label="Username" value={`@${user.username}`} />

          <UserField label="Email" value={user.email} />

          <UserField label="Phone" value={user.phone || "Not provided"} />

          <UserField label="Role" value={user.role} />

          <div>
            <p className="text-xs text-zinc-500">Status</p>

            <Badge
              className={
                user.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
              }
            >
              {user.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserField = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>

      <p className="mt-1 break-all text-sm">{value}</p>
    </div>
  );
};

export default UserDetails;
