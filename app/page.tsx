"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const SECTIONS = [
  { id: "intro", label: "Intro", chapter: "01" },
  { id: "work", label: "Work", chapter: "02" },
  { id: "projects", label: "Projects", chapter: "03" },
  { id: "connect", label: "Contact", chapter: "04" },
] as const

function SectionDivider() {
  return (
    <div className="my-14 flex items-center gap-4 sm:my-20" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="font-mono text-[10px] text-muted-foreground/45">◆</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
    </div>
  )
}


function ThemeToggleButton({
  isDark,
  toggleTheme,
  className,
}: {
  isDark: boolean
  toggleTheme: () => void
  className?: string
}) {
  return (
    <button type="button" onClick={toggleTheme} className={className} aria-label="Toggle theme">
      {isDark ? (
        <svg
          className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}

const SECRET_CODE = ["n","i","k","a"]

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [gearFifth, setGearFifth] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const konamiProgress = useRef(0)

  useEffect(() => {
    console.log(
      "%c\"I'm gonna be the King of the Pirates!\" - Monkey D. Luffy",
      "color:#c084fc;font-size:14px;font-weight:bold;"
    )
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === SECRET_CODE[konamiProgress.current]) {
        konamiProgress.current++
        if (konamiProgress.current === SECRET_CODE.length) {
          konamiProgress.current = 0
          setGearFifth(true)
          document.documentElement.classList.add("gear-fifth")
          setTimeout(() => {
            document.documentElement.classList.remove("gear-fifth")
            setGearFifth(false)
          }, 10000)
        }
      } else {
        konamiProgress.current = e.key.toLowerCase() === SECRET_CODE[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-app-mesh text-foreground">
      {gearFifth && (
        <>
          <div className="gear-fifth-chibi pointer-events-none fixed bottom-28 right-6 z-[200] sm:bottom-32 sm:right-10">
            <img
              src="/avatar.gif"
              alt=""
              className="h-28 w-28 drop-shadow-lg sm:h-36 sm:w-36"
            />
          </div>
          <div className="gear-fifth-toast pointer-events-none fixed bottom-24 left-1/2 z-[200] -translate-x-1/2">
            <p className="rounded-full border border-primary/30 bg-background/90 px-5 py-2 font-mono text-sm font-medium tracking-wider text-foreground shadow-lg backdrop-blur">
              Gear Fifth activated
            </p>
          </div>
        </>
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <span className="text-sm font-medium text-primary">Karanjot Singh</span>
        <ThemeToggleButton
          isDark={isDark}
          toggleTheme={toggleTheme}
          className="group rounded-lg border border-border p-3 transition-all duration-300 hover:border-muted-foreground/50"
        />
      </header>

      <nav className="fixed left-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-label="Section navigation">
        <div className="flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`h-8 w-2 rounded-full transition-all duration-500 ${
                activeSection === section.id ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              title={`${section.chapter} - ${section.label}`}
              aria-label={`Navigate to ${section.label}`}
            />
          ))}
        </div>
      </nav>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-4xl px-6 pb-28 pt-20 sm:px-8 lg:px-16 lg:pb-0 lg:pt-0"
      >
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="flex min-h-screen scroll-mt-20 items-center opacity-0 lg:scroll-mt-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-5">
                <div className="font-mono text-sm tracking-wider text-primary/80">
                  <span className="text-muted-foreground/70">01</span>
                  <span className="mx-2 text-muted-foreground/35">-</span>
                  PORTFOLIO / 2026
                </div>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="min-w-0 space-y-3">
                    <h1 className="text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
                      Karanjot
                      <br />
                      <span className="text-primary/75">Singh</span>
                    </h1>
                    <p className="text-xs font-medium tracking-[0.35em] text-muted-foreground/75" lang="ja">
                      ソフトウェアエンジニア
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Software Engineer pursuing Master's in Computer Science, specializing in
                  <span className="font-medium text-primary"> full-stack development</span>,
                  <span className="text-foreground"> cloud solutions</span>, and
                  <span className="text-foreground"> data engineering</span>.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400/85 motion-reduce:animate-none dark:bg-emerald-400/65" />
                      Available for work
                    </div>
                    <div>Edmonton, AB</div>
                  </div>
                  <a
                    href="/resume.pdf"
                    download="Karanjot-Singh-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary/25 px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-primary/45 hover:bg-primary/10"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download résumé (PDF)
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Fullstack Software Developer</div>
                  <div className="text-muted-foreground">@ Government of Alberta</div>
                  <div className="text-xs text-muted-foreground">May 2025 - Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "C#", ".NET", "React", "SQL", "GenAI", "RAG"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <SectionDivider />

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen scroll-mt-20 py-20 opacity-0 sm:py-32 lg:scroll-mt-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted-foreground/90">02 - Experience</p>
                <h2 className="text-3xl font-light sm:text-4xl">Experience</h2>
              </div>
              <div className="font-mono text-sm text-muted-foreground">2023 - 2026</div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  year: "2025",
                  role: "Fullstack Software Developer",
                  company: "Government of Alberta",
                  description:
                    "Fixed critical billing defects protecting $1B+ in annual revenue; modernized legacy .NET flows and led STRIDE threat modeling across the internal platform.",
                  tech: [".NET", "React", "TypeScript", "SQL", "DevSecOps"],
                },
                {
                  year: "2024",
                  role: "Software Developer",
                  company: "NielsenIQ",
                  description:
                    "Built a Dynamics 365 plugin automating workflows for 10,000+ users; cut API costs by 35% and reduced manual effort by 70%.",
                  tech: [".NET", "Power Apps", "JavaScript", "Azure DevOps"],
                },
                {
                  year: "2023",
                  role: "Software Engineer Intern",
                  company: "NielsenIQ",
                  description:
                    "Rewrote data pipelines in Scala (2,000 → 200 lines, 30% faster); optimized API calls by 88% using Python.",
                  tech: ["Scala", "Python", "Apache Airflow", "Azure Databricks"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="cel-panel group grid gap-4 rounded-xl border border-border/60 bg-muted/10 p-5 transition-colors duration-500 hover:border-border sm:gap-8 sm:p-6 lg:grid-cols-12 lg:p-8"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen scroll-mt-20 py-20 opacity-0 sm:py-32 lg:scroll-mt-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="space-y-1">
              <p className="font-mono text-xs text-muted-foreground/90">03 - Projects</p>
              <h2 className="text-3xl font-light sm:text-4xl">Selected Projects</h2>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "SpaceNeuro Atlas",
                  excerpt:
                    "Full-stack GenAI research software with RAG pipeline (PDF parsing → embeddings → FAISS retrieval) for answering questions over NASA bioscience papers. Real-time EEG visualizer streaming Muse 2 signals via FastAPI WebSockets.",
                  tech: ["Next.js", "TypeScript", "FastAPI", "WebSockets", "FAISS", "Gemini"],
                  links: { demo: "https://drive.google.com/drive/folders/1LzrS061o0e1dw1adCR3qg03t9T6BRj2r?usp=sharing", github: "https://github.com/karanjotsingh-max/NeuroEthica" },
                  image: "/images/spaceneuro-atlas.jpg",
                },
                {
                  title: "CineViz - Data Visualization Website",
                  excerpt:
                    "React.js and Plotly.js platform for Anime, Movies, and TV Series, processing 70K+ CSV records with 8+ interactive charts including World Map, Treemap, and Bar charts.",
                  tech: ["JavaScript", "React", "Plotly.js", "HTML/CSS"],
                  links: { demo: "https://karanjotsingh-max.github.io/CineViz/", github: "https://github.com/karanjotsingh-max/CineViz" },
                  image: "/images/cineviz.jpg",
                },
                {
                  title: "Driving Monitoring System",
                  excerpt:
                    "Real-time drowsiness detection system integrating YOLOv8 for face detection and Haar Cascade for eye tracking, achieving 40ms response time and 30 FPS processing.",
                  tech: ["Python", "YOLOv8", "Computer Vision", "PyGame"],
                  links: { demo: "https://drive.google.com/drive/folders/18D2Eu7TqX7rOHfaQJu2afYyHM7uprurl?usp=sharing", github: "https://github.com/karanjotsingh-max/Driving-Simulator" },
                  image: "/images/driving-monitor.jpg",
                },
                {
                  title: "Semantic Aware Video Clipper",
                  excerpt:
                    "Automated clipper using SpeechRecognition toolkit to remove 2s+ silent intervals, reducing video processing time by 40%. Published at ICIVC 2022 (Springer).",
                  tech: ["Python", "SpeechRecognition"],
                  links: { paper: "https://link.springer.com/chapter/10.1007/978-3-031-31164-2_35", github: "https://github.com/karanjotsingh-max/sementic_video_clipper-master" },
                  image: "/images/video-clipper.jpg",
                },
              ].map((project, index) => {
                const primaryUrl =
                  project.links.demo || project.links.github || project.links.paper || ""
                return (
                  <article
                    key={index}
                    className="cel-panel group relative overflow-hidden rounded-xl border border-border/70 bg-muted/10 transition-all duration-500 hover:border-muted-foreground/50 hover:shadow-lg"
                  >
                    {primaryUrl ? (
                      <a
                        href={primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-0"
                        aria-label={`Open ${project.title}`}
                      />
                    ) : null}

                    <div className="pointer-events-none relative z-10">
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                      </div>

                      <div className="space-y-4 p-6 sm:p-8">
                        <h3 className="text-lg font-medium transition-colors duration-300 group-hover:text-muted-foreground sm:text-xl">
                          {project.title}
                        </h3>

                        <p className="leading-relaxed text-muted-foreground">{project.excerpt}</p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-muted-foreground/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="relative z-20 flex flex-wrap items-center gap-4 pt-2 text-sm pointer-events-auto">
                          {project.links.demo && (
                            <Link
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            >
                              <span>Live Demo</span>
                              <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </Link>
                          )}
                          {project.links.github && (
                            <Link
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            >
                              <span>GitHub</span>
                            </Link>
                          )}
                          {project.links.paper && (
                            <Link
                              href={project.links.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                            >
                              <span>Paper</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section
          id="connect"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="scroll-mt-20 py-20 opacity-0 sm:py-32 lg:scroll-mt-0"
        >
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-1">
                <p className="font-mono text-xs text-muted-foreground/90">04 - Contact</p>
                <h2 className="text-3xl font-light sm:text-4xl">Let&apos;s Connect</h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and
                  software engineering.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:singhkaranjot212@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">singhkaranjot212@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href="tel:+14036811823"
                    className="text-base text-muted-foreground transition-colors duration-300 hover:text-foreground sm:text-lg"
                  >
                    403-681-1823
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@karanjotsingh-max", url: "https://github.com/karanjotsingh-max" },
                  { name: "LinkedIn", handle: "karanjots1", url: "https://www.linkedin.com/in/karanjots1/" },
                  { name: "LeetCode", handle: "@lelouch_01", url: "https://leetcode.com/u/lelouch_01/" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cel-panel group rounded-lg border border-border/70 bg-muted/5 p-4 transition-all duration-300 hover:border-muted-foreground/50 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Karanjot Singh. All rights reserved.</div>
              <div className="text-xs text-muted-foreground/70">Psst... try typing "nika"</div>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <ThemeToggleButton
                isDark={isDark}
                toggleTheme={toggleTheme}
                className="group rounded-lg border border-border p-3 transition-all duration-300 hover:border-muted-foreground/50"
              />

              <button
                type="button"
                onClick={() => scrollToSection("connect")}
                className="group rounded-lg border border-border p-3 transition-all duration-300 hover:border-muted-foreground/50"
                aria-label="Go to contact section"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-md lg:hidden"
        aria-label="Section navigation"
      >
        <div className="flex justify-around gap-1 px-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[11px] font-medium transition-colors sm:text-xs ${
                activeSection === section.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="font-mono text-[9px] text-muted-foreground/55" aria-hidden>
                {section.chapter}
              </span>
              <span
                className={`h-1 w-1 rounded-full transition-colors ${
                  activeSection === section.id ? "bg-foreground" : "bg-muted-foreground/40"
                }`}
                aria-hidden
              />
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent lg:h-24" />
    </div>
  )
}
