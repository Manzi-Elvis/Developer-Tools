import { useState } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const defaultMarkdown = `# Welcome to Markdown Previewer

## Features

This markdown previewer supports:

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)
- Lists (ordered and unordered)

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("Developer");
\`\`\`

### Tables

| Feature | Supported |
|---------|-----------|
| Headers | ✓ |
| Lists | ✓ |
| Code | ✓ |

### Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

---

Try editing the markdown on the left to see the live preview!
`

export default function MarkdownPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="border-b border-border bg-card px-8 py-4">
        <h1 className="text-2xl font-bold text-foreground">Markdown Previewer</h1>
        <p className="text-sm text-muted-foreground">Write markdown and see the live preview</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex h-1/2 flex-col border-b border-border lg:h-full lg:w-1/2 lg:border-b-0 lg:border-r"
        >
          <div className="border-b border-border bg-muted px-4 py-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Editor</h2>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 resize-none bg-background p-4 font-mono text-sm text-foreground outline-none lg:p-6"
            placeholder="Write your markdown here..."
          />
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex h-1/2 flex-col lg:h-full lg:w-1/2"
        >
          <div className="border-b border-border bg-muted px-4 py-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Preview</h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-muted prose-pre:text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    return !inline ? (
                      <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4">
                        <code className="font-mono text-sm text-foreground">{children}</code>
                      </pre>
                    ) : (
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
