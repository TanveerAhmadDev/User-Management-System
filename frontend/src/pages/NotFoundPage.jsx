import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-lg text-center">
        {/* 404 */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold tracking-tight sm:text-9xl">404</h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">Page not found</h2>

          <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button onClick={() => navigate("/")} className="gap-2">
            <Home className="size-4" />
            Go Home
          </Button>
        </div>

        {/* Small footer text */}
        <p className="mt-10 text-xs text-muted-foreground">Admin Dashboard</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
