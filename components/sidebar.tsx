"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Braces, Code2, Github, Moon, Sun, Home, ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useSidebar } from "./sidebar-context"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/markdown", icon: FileText, label: "Markdown" },
  { href: "/json", icon: Braces, label: "JSON" },
  { href: "/snippets", icon: Code2, label: "Snippets" },
  { href: "/github", icon: Github, label: "GitHub" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isOpen, isCollapsed, toggleCollapse, closeSidebar } = useSidebar()

  useEffect(() => {
    setMounted(true)
  }, [])

  const sidebarWidth = isCollapsed ? "w-20" : "w-64 lg:w-72"

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -300,
          opacity: 1,
        }}
        className={`fixed left-0 top-0 z-50 h-screen border-r border-border bg-sidebar transition-all duration-300 ${sidebarWidth} ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
              onClick={() => {
                if (window.innerWidth < 1024) closeSidebar()
              }}
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <code className="text-lg font-bold text-primary">{"</>"}</code>
              </div>
              {!isCollapsed && <span className="text-lg font-bold text-sidebar-foreground">DevTools</span>}
            </Link>

            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeSidebar()
                } else {
                  toggleCollapse()
                }
              }}
              className="rounded-lg p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent lg:hover:bg-sidebar-accent"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {window.innerWidth < 1024 ? (
                <X className="h-5 w-5" />
              ) : isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative block"
                  onClick={() => {
                    if (window.innerWidth < 1024) closeSidebar()
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="h-2 w-2 rounded-full bg-primary-foreground"
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                          />
                        )}
                      </>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="border-t border-sidebar-border p-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                isCollapsed ? "justify-center" : ""
              }`}
              aria-label="Toggle theme"
              title={isCollapsed ? "Toggle theme" : undefined}
            >
              {mounted && (
                <>
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5" />
                      {!isCollapsed && <span>Light Mode</span>}
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      {!isCollapsed && <span>Dark Mode</span>}
                    </>
                  )}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
