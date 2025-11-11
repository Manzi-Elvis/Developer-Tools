"use client"

import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { useSidebar } from "./sidebar-context"

export function MobileMenuButton() {
  const { toggleSidebar } = useSidebar()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleSidebar}
      className="fixed left-4 top-4 z-30 rounded-lg bg-primary p-2 text-primary-foreground shadow-lg lg:hidden"
      aria-label="Toggle menu"
    >
      <Menu className="h-6 w-6" />
    </motion.button>
  )
}
