import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUserDialog = ({ user, open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "User",
    status: "Active",
  });

  const roles = ["User", "Admin"];
  const statuses = ["Active", "Inactive"];

  /*
   * When the dialog receives a user,
   * copy that user's data into the form.
   */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        role: user.role || "User",
        status: user.status || "Active",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onSubmit(formData);

    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-1.5rem)]
          max-w-[calc(100%-1.5rem)]
          gap-0
          overflow-hidden
          border-zinc-200
          bg-white
          p-0
          text-zinc-900
          dark:border-zinc-800
          dark:bg-zinc-900
          dark:text-zinc-100
          sm:max-w-125
        "
      >
        {/* Header */}
        <DialogHeader className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <DialogTitle className="text-lg">Edit User</DialogTitle>
        </DialogHeader>

        {/* Scrollable form */}
        <div className="custom-scrollbar max-h-[calc(100dvh-7rem)] overflow-y-auto px-5 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>

              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ali Khan"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>

              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="ali123"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>

              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="ali@example.com"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>

              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+92 300 1234567"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password</Label>

              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Leave empty to keep current password"
                className="h-10 rounded-xl"
              />

              <p className="text-xs text-zinc-500">
                Leave empty if you don't want to change the password.
              </p>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Role</Label>

              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value)}
              >
                <SelectTrigger className="h-10 w-full rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="h-10 w-full rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-10 w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
