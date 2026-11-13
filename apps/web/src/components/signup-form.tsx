import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/auth/use-auth";
import { SiGithub, SiGoogle } from "react-icons/si";
import { FieldSeparator } from "@/components/ui/field";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const githubEnabled =
    import.meta.env.VITE_AUTH_GITHUB_ENABLED === "true";
  
  const googleEnabled =
    import.meta.env.VITE_AUTH_GOOGLE_ENABLED === "true";
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName,
            email,
            password,
          }),
        },
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error ?? "Registration failed");
      }
  
      await refreshUser();
      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <Card {...props}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {(githubEnabled || googleEnabled) && (
                <>
                  <Field>
                    {googleEnabled && (
                      <Button variant="outline" type="button">
                        <SiGoogle />
                        Sign up with Google
                      </Button>
                    )}
              
                    {githubEnabled && (
                      <Button variant="outline" type="button">
                        <SiGithub />
                        Sign up with GitHub
                      </Button>
                    )}
                  </Field>
              
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                </>
              )}
              <Field>
                <FieldLabel htmlFor="name">First Name</FieldLabel>
                <Input id="name" type="text" placeholder="John" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="correct horse battery staple"
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <FieldDescription>Please confirm your password.</FieldDescription>
              </Field>
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to="/login">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="https://mneia.net/terms">Terms of Service</a>{" "}
        and <a href="https://mneia.net/privacy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
