import { Suspense } from "react"

import { RouterProvider } from "react-router-dom"

import { router } from "./router"

import { ThemeProvider } from "./providers/ThemeProvider"

import AuthProvider from "./providers/AuthProvider"

import { Toaster } from "@/shared/components/ui/sonner"

import { TooltipProvider } from "@/shared/components/ui/tooltip"

import QueryProvider from "./providers/QueryProvider"

import { PageLoader } from "@/shared/components/loaders/PageLoader"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <TooltipProvider>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <RouterProvider router={router} />
            </Suspense>
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
