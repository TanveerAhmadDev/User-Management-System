import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        { email, password },
        { withCredentials: true },
      );
      const user = result?.data?.data?.user;
      if (!user) {
        setError("User information was not found.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user)); // Clear form
      setEmail("");
      setPassword("");
      if (user.role === "Admin") {
        navigate("/Admin-Dashboard");
      } else {
        navigate("/User-Dashboard");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground transition-colors sm:px-6">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      {/* Login Card */}
      <div className="w-full max-w-120 rounded-xl border border-border bg-card px-5 py-7 text-card-foreground shadow-sm sm:px-8 sm:py-9 md:px-10 md:py-10">
        {/* Header */}
        <div className="mb-7 text-center sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Login to your admin account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email"> Email </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="h-11 sm:h-12"
              />
            </Field>
            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password"> Password </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="h-11 pr-11 sm:h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </Field>
            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm text-red-500">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            {/* Forgot Password */}
            <div className="-mt-2 flex justify-end">
              <button
                type="button"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
              >
                Forgot password?
              </button>
            </div>
            {/* Login */}
            <Field className="mt-1">
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full sm:h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
