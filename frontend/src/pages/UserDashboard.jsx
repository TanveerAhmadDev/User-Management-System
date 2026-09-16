import React from "react";
import { Mail, Phone, User, ShieldCheck, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  // const user = {
  //   name: "Tanveer Ahmad",
  //   username: "tanveerahmad",
  //   email: "tanveer@example.com",
  //   phone: "+92 300 1234567",
  //   role: "User",
  //   status: "Active",
  //   accountId: "USR-00125",
  //   createdAt: "September 16, 2026",
  // };
  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/", { replace: true });
  };
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Header Title */}
          <div>
            <h1 className="text-lg font-semibold sm:text-xl">User Dashboard</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              View your account information
            </p>
          </div>
          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Welcome, {user.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here is your account information.
          </p>
        </div>
        {/* Profile + Personal Information */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <User size={26} className="text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg"> {user.name} </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-5" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Account Status
                </span>
                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10 dark:text-green-400">
                  {user.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex items-start gap-3">
                  <User size={19} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="mt-1 text-sm"> {user.name} </p>
                  </div>
                </div>
                {/* Username */}
                <div className="flex items-start gap-3">
                  <User size={19} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Username</p>
                    <p className="mt-1 text-sm"> @{user.username} </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail size={19} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="mt-1 break-all text-sm">{user.email}</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone size={19} className="mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="mt-1 text-sm"> {user.phone} </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Account Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Account ID */}
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 text-muted-foreground"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Account ID</p>
                  <p className="mt-1 text-sm"> {user?._id} </p>
                </div>
              </div>
              {/* Role */}
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 text-muted-foreground"
                />
                <div>
                  <p className="text-xs text-muted-foreground"> Role </p>
                  <p className="mt-1 text-sm"> {user.role} </p>
                </div>
              </div>
              {/* Created */}
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={20}
                  className="mt-0.5 text-muted-foreground"
                />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Account Created
                  </p>
                  <p className="mt-1 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default UserDashboard;
