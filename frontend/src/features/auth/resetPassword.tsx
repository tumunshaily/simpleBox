import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useRouter } from "@tanstack/react-router"
import {authApi } from "../../api/auth.api"
import { useState } from "react"
// import Portal from "@/utils/Portal" Don't solve sovle this for now


const ResetPasswordModal = ({token}:{token:string}) => {

    const [error,setError] = useState(false);
    const router= useRouter();

  const ResetPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmedPassword");

    if(newPassword === confirmPassword){
        try {
              const response = await authApi.resetPassword(token,{
                newPassword: confirmPassword as string,
              });
              console.log("Password reseted!", response);
              router.navigate({to:"/signIn"})
              
            } catch (error) {
              console.error("Failed to reset password !", error);
            }
    } else {
      setError(true);
      console.log("Password not matched!");
      
    }
    
    
  }

  return (
    <Card className="w-full max-w-sm absolute backdrop-blur-[10px] p-6 rounded-lg self-center right-1/2">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new Password below
        </CardDescription>
        <CardAction>
          <Link to="/signIn"><Button variant="link">Sign In</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={ResetPasswordHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmedPassword">Confirm</Label>
              <Input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                required
              />
              {error && <span className=" text-red-800">Passwords didn't matched !</span>}
            </div>
            <Button type="submit" className="w-full">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordModal