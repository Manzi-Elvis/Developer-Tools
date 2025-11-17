"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function JSONPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const formatJSON = () => {
    setError("")
    setSuccess(false)

    if (!input.trim()) {
      setError("Please enter some JSON to format")
      setOutput("")
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
      setOutput("")
    }
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
    setSuccess(false)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="border-b border-border bg-card px-8 py-4">
        <h1 className="text-2xl font-bold text-foreground">JSON Formatter</h1>
        <p className="text-sm text-muted-foreground">Format and validate your JSON data</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-8">
        <div className="mb-4 flex items-center gap-4">
          <Button onClick={formatJSON} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Format JSON
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear All
          </Button>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>JSON formatted successfully!</span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-1/2 flex-col rounded-lg border border-border bg-card"
          >
            <div className="border-b border-border bg-muted px-4 py-2">
              <h2 className="text-sm font-semibold text-muted-foreground">Input</h2>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 resize-none bg-background p-4 font-mono text-sm text-foreground outline-none"
              placeholder='{"name": "John", "age": 30}'
            />
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex w-1/2 flex-col rounded-lg border border-border bg-card"
          >
            <div className="border-b border-border bg-muted px-4 py-2">
              <h2 className="text-sm font-semibold text-muted-foreground">Output</h2>
            </div>
            <pre className="flex-1 overflow-auto bg-background p-4 font-mono text-sm text-foreground">
              {output || "Formatted JSON will appear here..."}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
