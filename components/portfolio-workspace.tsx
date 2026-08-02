"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Github,
  GitBranch,
  Mail,
  Menu,
  Network,
  PanelLeft,
  Phone,
  Search,
  Server,
  Terminal,
  X
} from "lucide-react";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Workspace, WorkspaceFile, WorkspaceFolder } from "@/lib/workspace";

const folderIcons: Record<string, ComponentType<{ className?: string }>> = {
  Experience: BriefcaseBusiness,
  Projects: Code2,
  SystemDesign: Network,
  LowLevelDesign: Cpu,
  Blogs: FileText,
  Resume: Database,
  Contact: Mail
};

export function PortfolioWorkspace({ workspace }: { workspace: Workspace }) {
  const initialFile =
    workspace.files.find((file) => file.id === "Resume/Resume.md") ?? workspace.files[0];
  const [activeId, setActiveId] = useState(initialFile.id);
  const [openIds, setOpenIds] = useState<string[]>([
    "Resume/Resume.md",
    "Experience/PublicisSapient.md",
    "Projects/COMS.md"
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeFile = useMemo(
    () => workspace.files.find((file) => file.id === activeId) ?? initialFile,
    [activeId, initialFile, workspace.files]
  );

  const openFiles = openIds
    .map((id) => workspace.files.find((file) => file.id === id))
    .filter(Boolean) as WorkspaceFile[];

  const openFile = (file: WorkspaceFile) => {
    setActiveId(file.id);
    setOpenIds((current) => (current.includes(file.id) ? current : [...current, file.id]));
    setSidebarOpen(false);
  };

  const closeFile = (fileId: string) => {
    setOpenIds((current) => {
      const next = current.filter((id) => id !== fileId);
      if (activeId === fileId) {
        setActiveId(next[next.length - 1] ?? initialFile.id);
      }
      return next.length ? next : [initialFile.id];
    });
  };

  return (
    <main className="min-h-screen p-3 text-slate-100 sm:p-5 lg:p-7">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1500px] flex-col overflow-hidden rounded-lg border border-slate-700/80 bg-slate-950/82 shadow-editor backdrop-blur sm:min-h-[calc(100vh-2.5rem)] lg:min-h-[calc(100vh-3.5rem)]">
        <TitleBar onToggleSidebar={() => setSidebarOpen((value) => !value)} />
        <div className="grid min-h-0 flex-1 grid-cols-[48px_1fr] lg:grid-cols-[56px_300px_1fr]">
          <ActivityBar />
          <aside
            className={cn(
              "fixed inset-y-3 left-[calc(0.75rem+48px)] z-30 w-[min(82vw,320px)] border-r border-slate-800 bg-slate-950 transition-transform sm:inset-y-5 sm:left-[calc(1.25rem+48px)] lg:static lg:z-auto lg:block lg:w-auto lg:translate-x-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
            )}
          >
            <Explorer
              folders={workspace.folders}
              activeId={activeFile.id}
              onOpen={openFile}
            />
          </aside>
          {sidebarOpen ? (
            <button
              aria-label="Close explorer"
              className="fixed inset-0 z-20 bg-black/55 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          ) : null}
          <section className="min-w-0 bg-[#111820]">
            <Tabs
              files={openFiles}
              activeId={activeFile.id}
              onOpen={openFile}
              onClose={closeFile}
            />
            <Editor file={activeFile} workspace={workspace} />
          </section>
        </div>
        <StatusBar file={activeFile} />
      </div>
    </main>
  );
}

function TitleBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="flex h-11 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-3">
      <div className="flex items-center gap-2">
        <Button
          aria-label="Toggle explorer"
          className="lg:hidden"
          size="icon"
          variant="ghost"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="hidden gap-1.5 sm:flex">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-1 flex min-w-0 items-center gap-2">
          <Code2 className="h-4 w-4 text-teal-300" />
          <span className="truncate text-sm font-medium text-slate-300">
            haider-millwala-portfolio
          </span>
        </div>
      </div>
      <div className="hidden min-w-0 max-w-[42vw] items-center gap-2 rounded border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-500 md:flex">
        <Search className="h-3.5 w-3.5" />
        <span className="truncate">Senior Software Engineer - Java, Spring Boot, GCP, Kubernetes</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <GitBranch className="h-4 w-4 text-emerald-300" />
        <span className="hidden sm:inline">main</span>
      </div>
    </header>
  );
}

function ActivityBar() {
  const items = [
    { icon: FileText, label: "Explorer", active: true },
    { icon: Search, label: "Search" },
    { icon: GitBranch, label: "Source Control" },
    { icon: Terminal, label: "Terminal" },
    { icon: PanelLeft, label: "Panels" }
  ];

  return (
    <nav className="flex flex-col items-center border-r border-slate-800 bg-slate-950 py-3">
      {items.map((item) => (
        <button
          key={item.label}
          aria-label={item.label}
          title={item.label}
          className={cn(
            "relative mb-3 grid h-10 w-10 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200",
            item.active && "text-teal-300"
          )}
        >
          {item.active ? <span className="absolute left-0 h-6 w-0.5 rounded bg-teal-300" /> : null}
          <item.icon className="h-5 w-5" />
        </button>
      ))}
    </nav>
  );
}

function Explorer({
  folders,
  activeId,
  onOpen
}: {
  folders: WorkspaceFolder[];
  activeId: string;
  onOpen: (file: WorkspaceFile) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-11 items-center justify-between border-b border-slate-800 px-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Explorer
        </span>
        <span className="rounded bg-slate-800 px-2 py-1 font-mono text-[11px] text-slate-400">
          MDX
        </span>
      </div>
      <div className="editor-scroll min-h-0 flex-1 overflow-auto px-2 py-3">
        {folders.map((folder) => (
          <div key={folder.name} className="mb-3">
            <div className="flex items-center gap-1 px-2 py-1 font-mono text-xs font-semibold uppercase text-slate-400">
              <ChevronDown className="h-3.5 w-3.5" />
              <Folder className={cn("h-4 w-4", folder.accent)} />
              <span>{folder.name}</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {folder.files.map((file) => (
                <button
                  key={file.id}
                  className={cn(
                    "flex w-full items-center gap-2 rounded px-7 py-1.5 text-left font-mono text-[13px] text-slate-400 transition-colors hover:bg-slate-800/80 hover:text-slate-100",
                    activeId === file.id && "bg-slate-800 text-white"
                  )}
                  onClick={() => onOpen(file)}
                >
                  <FileText className={cn("h-3.5 w-3.5 shrink-0", file.accent)} />
                  <span className="min-w-0 truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tabs({
  files,
  activeId,
  onOpen,
  onClose
}: {
  files: WorkspaceFile[];
  activeId: string;
  onOpen: (file: WorkspaceFile) => void;
  onClose: (fileId: string) => void;
}) {
  return (
    <div className="editor-scroll flex h-11 overflow-x-auto border-b border-slate-800 bg-slate-900/70">
      {files.map((file) => (
        <div
          key={file.id}
          className={cn(
            "group flex h-11 min-w-[170px] max-w-[220px] items-center justify-between border-r border-slate-800 px-3 text-sm transition-colors",
            activeId === file.id ? "bg-[#111820] text-white" : "bg-slate-900 text-slate-400"
          )}
        >
          <button className="flex min-w-0 items-center gap-2" onClick={() => onOpen(file)}>
            <FileText className={cn("h-3.5 w-3.5 shrink-0", file.accent)} />
            <span className="truncate font-mono text-xs">{file.name}</span>
          </button>
          <button
            aria-label={`Close ${file.name}`}
            className="ml-2 grid h-5 w-5 shrink-0 place-items-center rounded text-slate-500 opacity-70 hover:bg-slate-700 hover:text-white group-hover:opacity-100"
            onClick={() => onClose(file.id)}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function Editor({ file, workspace }: { file: WorkspaceFile; workspace: Workspace }) {
  return (
    <div className="grid h-[calc(100vh-8.25rem)] min-h-[720px] grid-rows-[1fr_auto] lg:h-[calc(100vh-9.25rem)]">
      <div className="editor-scroll min-h-0 overflow-auto">
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="mx-auto grid max-w-6xl gap-8 px-5 py-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8"
        >
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500">
              <span>{file.folder}</span>
              <span>/</span>
              <span className="text-slate-300">{file.name}</span>
            </div>
            <MarkdownRenderer content={file.content} />
          </article>
          <aside className="space-y-5">
            <ProfilePanel workspace={workspace} />
            <ContextPanel file={file} />
            <VisualPanel />
          </aside>
        </motion.div>
      </div>
      <TerminalPanel file={file} />
    </div>
  );
}

function ProfilePanel({ workspace }: { workspace: Workspace }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/72 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-300">
            README.md
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">Haider Millwala</h2>
          <p className="mt-1 text-sm text-slate-400">{workspace.stats.role}</p>
        </div>
        <Server className="h-7 w-7 text-amber-300" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Metric label="Experience" value={workspace.stats.experienceYears} />
        <Metric label="Location" value={workspace.stats.location} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap gap-2">
        {workspace.stats.focus.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button asChild size="sm">
          <a href="/Haider_Millwala_Resume.pdf" download>
            <Download className="h-4 w-4" />
            Resume
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href="mailto:haidermillwala@hotmail.com">
            <Mail className="h-4 w-4" />
            Email
          </a>
        </Button>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2">
      <p className="font-mono text-[11px] uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function ContextPanel({ file }: { file: WorkspaceFile }) {
  const Icon = folderIcons[file.folder] ?? FileText;

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/72 p-4">
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-1 h-5 w-5", file.accent)} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{file.title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{file.description}</p>
        </div>
      </div>
      {file.tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {file.tags.map((tag) => (
            <Badge key={tag} className="bg-slate-900/80">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function VisualPanel() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/72">
      <Image
        src="/workspace-preview.png"
        alt="Developer workspace visual"
        width={1536}
        height={864}
        className="aspect-video w-full object-cover"
        priority
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-slate-400">
        <span className="font-mono">workspace-preview.png</span>
        <ExternalLink className="h-4 w-4 text-teal-300" />
      </div>
    </section>
  );
}

function TerminalPanel({ file }: { file: WorkspaceFile }) {
  return (
    <div className="hidden border-t border-slate-800 bg-slate-950/95 px-4 py-3 font-mono text-xs text-slate-400 md:block">
      <div className="flex items-center gap-2 text-slate-500">
        <Terminal className="h-4 w-4 text-emerald-300" />
        <span>portfolio-cli</span>
        <span className="text-slate-700">$</span>
        <span className="truncate text-slate-300">
          open {file.folder}/{file.name}
        </span>
      </div>
    </div>
  );
}

function StatusBar({ file }: { file: WorkspaceFile }) {
  return (
    <footer className="flex h-7 items-center justify-between gap-3 bg-teal-700 px-3 font-mono text-[11px] text-white">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex items-center gap-1">
          <Github className="h-3.5 w-3.5" />
          github-pages
        </span>
        <span className="hidden sm:inline">TypeScript</span>
      </div>
      <div className="min-w-0 truncate">
        {file.folder}/{file.name}
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <a className="flex items-center gap-1" href="mailto:haidermillwala@hotmail.com">
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
        <a className="flex items-center gap-1" href="tel:+918989552007">
          <Phone className="h-3.5 w-3.5" />
          Call
        </a>
      </div>
    </footer>
  );
}
