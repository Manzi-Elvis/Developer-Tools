"use client"
import { FileText, Braces, Code2, Github, Sparkles } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    href: "/markdown",
    icon: FileText,
    title: "Markdown Previewer",
    description: "Write and preview markdown in real-time with syntax highlighting",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    href: "/json",
    icon: Braces,
    title: "JSON Formatter",
    description: "Format and validate JSON data with error detection",
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    href: "/snippets",
    icon: Code2,
    title: "Code Snippet Manager",
    description: "Save and organize your code snippets with syntax highlighting",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    href: "/github",
    icon: Github,
    title: "GitHub Repo Viewer",
    description: "Browse GitHub repositories and user profiles",
    color: "from-orange-500/10 to-red-500/10",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Developer Productivity Suite</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-primary">Dev Tools Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            A collection of essential developer tools to boost your productivity
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 sm:p-8"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${tool.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                    </div>
                    <h2 className="text-xl font-semibold text-card-foreground sm:text-2xl">{tool.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-base">{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
