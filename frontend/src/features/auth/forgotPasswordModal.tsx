import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { authApi } from "../../api/auth.api";
import { useState } from "react";
// import Portal from "@/utils/Portal" Don't solve sovle this for now

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [sent,setSent] = useState(false);

  const ResetPasswordLinkHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await authApi.resetPasswordLink({
        email: formData.get("email") as string,
      });
      console.log("Reset link sent !", response);
      setSent(true);
    } catch (error) {
      console.error("Failed to send reset link", error);
    }
  };

  return (
    <Card className="w-full max-w-sm absolute backdrop-blur-[10px] p-6 rounded-lg self-center right-1/2">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to get a reset password link
        </CardDescription>
        <CardAction>
          <Link to="/signIn">
            <Button variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={ResetPasswordLinkHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
                <button
                  onClick={() => authApi.resetPasswordLink({ email: email })}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Resend Link
                </button>
              </div>
              <Input
                onBlur={(event) => setEmail(event.target.value)}
                id="email"
                name="email"
                type="text"
                required
                disabled={sent}
              />
            </div>
            <Button type="submit" className="w-full" disabled={sent}>
              {!sent ? "Send password reset link" : "Link sent !" }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordModal;
