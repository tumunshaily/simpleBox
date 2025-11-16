import { authApi } from "@/api/auth.api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useRouter } from "@tanstack/react-router"
import { useState } from "react"
// import Portal from "@/utils/Portal" Don't solve sovle this for now


const SignUpModal = () => {

  const router = useRouter();
  const [error,setError] = useState("")
  const SignupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Asdasdads");
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Asdasdads");
    console.log(formData.get("email") as string);
    try {
      const response = await authApi.signup({
        email: formData.get("email") as string,
        name:formData.get("username") as string,
        password: formData.get("password") as string,
      });
      console.log("Registered successfull successful:", response);
      router.navigate({to:"/"})
    } catch (error) {
      console.error("Registeration failed:", error);
      setError(error);
    }
  };
  return (
    <Card className="w-full max-w-sm absolute backdrop-blur-[10px] p-6 rounded-lg self-center right-1/2 ">
      <CardHeader>
        <CardTitle>Register your account</CardTitle>
        <CardDescription>
          Enter your deatils below to register your account
        </CardDescription>
        <CardAction>
          <Link to="/signIn"><Button variant="link">Sign In</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={SignupHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="tumun shaily"
                required
              />
            </div>   
              <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tumun@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
              {error && <span>Error Creating the account {error as string}</span>}
            </div>
                              <Button type="submit" className="w-full">
          Create Account
        </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" disabled className="w-full">
          Sign in with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SignUpModal