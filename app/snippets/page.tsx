"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus, X, Copy, Check } from "lucide-react"

interface Snippet {
  id: string
  title: string
  language: string
  code: string
  createdAt: string
}

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load snippets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("devtools-snippets")
    if (stored) {
      setSnippets(JSON.parse(stored))
    }
  }, [])

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    if (snippets.length > 0) {
      localStorage.setItem("devtools-snippets", JSON.stringify(snippets))
    }
  }, [snippets])

  const addSnippet = () => {
    if (!title.trim() || !code.trim()) return

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title,
      language,
      code,
      createdAt: new Date().toISOString(),
    }

    setSnippets([newSnippet, ...snippets])
    resetForm()
  }

  const updateSnippet = () => {
    if (!editingId || !title.trim() || !code.trim()) return

    setSnippets(snippets.map((s) => (s.id === editingId ? { ...s, title, language, code } : s)))
    resetForm()
  }

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter((s) => s.id !== id))
  }

  const editSnippet = (snippet: Snippet) => {
    setTitle(snippet.title)
    setLanguage(snippet.language)
    setCode(snippet.code)
    setEditingId(snippet.id)
  }

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const resetForm = () => {
    setTitle("")
    setLanguage("javascript")
    setCode("")
    setEditingId(null)
  }

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all snippets?")) {
      setSnippets([])
      localStorage.removeItem("devtools-snippets")
      resetForm()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="border-b border-border bg-card px-4 py-4 lg:px-8">
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">Code Snippet Manager</h1>
        <p className="text-sm text-muted-foreground">Save and organize your code snippets</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-b border-border bg-card p-4 lg:w-2/5 lg:border-b-0 lg:border-r lg:p-6"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Snippet title..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="language" className="text-sm font-medium text-foreground">
                Language
              </Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
              </select>
            </div>

            <div>
              <Label htmlFor="code" className="text-sm font-medium text-foreground">
                Code
              </Label>
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="mt-1 h-48 w-full resize-none rounded-md border border-input bg-background p-3 font-mono text-sm text-foreground outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring lg:h-64"
              />
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <>
                  <Button onClick={updateSnippet} className="flex-1">
                    Update Snippet
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button onClick={addSnippet} className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Snippet
                </Button>
              )}
            </div>

            {snippets.length > 0 && (
              <Button onClick={clearAll} variant="destructive" className="w-full">
                Clear All Snippets
              </Button>
            )}
          </div>
        </motion.div>

        {/* Snippets List */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {snippets.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-muted-foreground">No snippets yet. Add your first snippet!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {snippets.map((snippet) => (
                  <motion.div
                    key={snippet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-foreground">{snippet.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {snippet.language} • {new Date(snippet.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <Button
                          onClick={() => copyToClipboard(snippet.code, snippet.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          {copiedId === snippet.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button onClick={() => editSnippet(snippet)} variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteSnippet(snippet.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-md border border-border bg-muted">
                      <pre className="p-4">
                        <code className="font-mono text-sm text-foreground">{snippet.code}</code>
                      </pre>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
