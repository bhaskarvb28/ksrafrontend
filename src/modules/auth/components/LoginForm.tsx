import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { useAuthStore } from "@/shared/store/auth.store"

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react"

import { useLogin } from "../hooks/useLogin"

import { loginSchema, type LoginSchema } from "../schemas/login.schema"

import { cn } from "@/shared/lib/utils"

import { Button } from "@/shared/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field"

import { Input } from "@/shared/components/ui/input"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = useLogin()

  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const setSession = useAuthStore((state) => state.setSession)

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setSession(response.data.token, response.data.user)
      },

      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Card className="border-border/60 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">KSRA Account Login</CardTitle>

          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="codeorigin.ai@gmail.com"
                  className="h-11"
                  {...register("email")}
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className="h-11 pr-10"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <ViewOffSlashIcon size={18} />
                    ) : (
                      <ViewIcon size={18} />
                    )}
                  </button>
                </div>
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              className="h-11 w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Access is restricted to authorized members only.
      </p>
    </div>
  )
}
