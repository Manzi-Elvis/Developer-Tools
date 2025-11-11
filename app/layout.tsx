import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-context"
import { MobileMenuButton } from "@/components/mobile-menu-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dev Tools Hub",
  description: "A modern developer productivity suite",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="min-h-screen w-full flex-1 transition-all duration-300 lg:ml-20 lg:peer-[.w-64]:ml-64 lg:peer-[.w-72]:ml-72">
                <MobileMenuButton />
                <div className="p-4 pt-20 lg:p-8 lg:pt-8">{children}</div>
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
