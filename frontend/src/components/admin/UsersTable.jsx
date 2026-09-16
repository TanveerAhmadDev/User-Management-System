import React from "react";
import { Eye, Pen, Search, Trash2, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import AddUserDialog from "./AddUserDialog";

const UsersTable = ({
  users,
  search,
  setSearch,
  onAddUser,
  newUser,
  setNewUser,
  onViewUser,
  onDeleteUser,
  onEditUser,
}) => {
  return (
    <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Users</CardTitle>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              View and manage registered users.
            </p>
          </div>

          <AddUserDialog
            newUser={newUser}
            setNewUser={setNewUser}
            onSubmit={onAddUser}
          />
        </div>
      </CardHeader>

      <CardContent>
        {/* Search */}
        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, username or email..."
            className="h-11 border-zinc-200 bg-zinc-50 pl-10 dark:border-zinc-800 dark:bg-zinc-800"
          />
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 md:block">
          <table className="w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  User
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Role
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Status
                </th>

                <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium">{user.name}</p>

                    <p className="text-xs text-zinc-500">@{user.username}</p>
                  </td>

                  <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {user.email}
                  </td>

                  <td className="px-4 py-4">
                    <Badge variant="outline">{user.role}</Badge>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEditUser(user)}
                      >
                        <Pen size={15} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewUser(user)}
                      >
                        <Eye size={16} />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDeleteUser(user)}
                        className="border-red-200 text-red-500 hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {users.map((user) => (
            <div
              key={user._id}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{user.name}</p>

                  <p className="text-xs text-zinc-500">@{user.username}</p>
                </div>

                <StatusBadge status={user.status} />
              </div>

              <p className="mt-3 break-all text-sm text-zinc-600 dark:text-zinc-400">
                {user.email}
              </p>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEditUser(user)}
                >
                  <Pen size={15} />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onViewUser(user)}
                >
                  <Eye size={16} />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDeleteUser(user)}
                  className="border-red-200 text-red-500 hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {users.length === 0 && (
          <div className="py-12 text-center">
            <Users
              size={35}
              className="mx-auto text-zinc-300 dark:text-zinc-700"
            />

            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              No users found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <Badge
      className={
        status === "Active"
          ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/10"
          : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/10"
      }
    >
      {status}
    </Badge>
  );
};

export default UsersTable;
