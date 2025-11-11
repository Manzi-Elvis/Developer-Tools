"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, GitFork, ExternalLink, Users, MapPin, LinkIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  followers: number
  following: number
  public_repos: number
  location: string
  blog: string
  html_url: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export default function GitHubPage() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username")
      return
    }

    setLoading(true)
    setError("")
    setUser(null)
    setRepos([])

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        throw new Error("User not found")
      }
      const userData = await userResponse.json()
      setUser(userData)

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const reposData = await reposResponse.json()
      setRepos(reposData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchGitHubData()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-8 py-4">
        <h1 className="text-2xl font-bold text-foreground">GitHub Repo Viewer</h1>
        <p className="text-sm text-muted-foreground">Browse GitHub repositories and user profiles</p>
      </div>

      <div className="p-8">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter GitHub username..."
              className="flex-1"
            />
            <Button onClick={fetchGitHubData} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-destructive">
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* User Profile */}
        <AnimatePresence>
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto mt-8 max-w-4xl"
            >
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.name || user.login}
                      width={120}
                      height={120}
                      className="rounded-full border-2 border-border"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-foreground">{user.name || user.login}</h2>
                      <p className="text-muted-foreground">@{user.login}</p>
                    </div>

                    {user.bio && <p className="mb-4 text-foreground">{user.bio}</p>}

                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {user.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      {user.blog && (
                        <a
                          href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <LinkIcon className="h-4 w-4" />
                          <span>{user.blog}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{user.followers}</span>
                        <span className="text-muted-foreground">followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">{user.following}</span>
                        <span className="text-muted-foreground">following</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-foreground">{user.public_repos}</span>
                        <span className="text-muted-foreground">repositories</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repositories */}
              {repos.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-bold text-foreground">Recent Repositories</h3>
                  <div className="space-y-4">
                    {repos.map((repo) => (
                      <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group mb-2 flex items-center gap-2"
                            >
                              <h4 className="text-lg font-semibold text-primary group-hover:underline">{repo.name}</h4>
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </a>
                            {repo.description && (
                              <p className="mb-3 text-sm text-muted-foreground">{repo.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              {repo.language && (
                                <span className="flex items-center gap-1">
                                  <span className="h-3 w-3 rounded-full bg-primary"></span>
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="h-4 w-4" />
                                {repo.forks_count}
                              </span>
                              <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
