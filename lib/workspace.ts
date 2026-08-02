import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WorkspaceFile = {
  id: string;
  folder: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  content: string;
};

export type WorkspaceFolder = {
  name: string;
  accent: string;
  files: WorkspaceFile[];
};

export type Workspace = {
  folders: WorkspaceFolder[];
  files: WorkspaceFile[];
  stats: {
    experienceYears: string;
    role: string;
    location: string;
    focus: string[];
  };
};

const folderOrder = [
  "Overview",
  "Experience",
  "Projects",
  "Resume",
  "Contact"
];

const folderAccents: Record<string, string> = {
  Overview: "text-teal-300",
  Experience: "text-amber-300",
  Projects: "text-teal-300",
  Resume: "text-orange-300",
  Contact: "text-cyan-300"
};

const fileOrder: Record<string, string[]> = {
  Overview: ["Overview.md"],
  Experience: ["PublicisSapient.md", "Amdocs.md", "TCS.md", "Hexaware.md"],
  Projects: ["COMS.md", "NotificationPortal.md", "PANPortal.md"],
  Resume: ["Resume.md"],
  Contact: ["Contact.md"]
};

export function getWorkspace(): Workspace {
  const root = process.cwd();

  const folders = folderOrder.map((folderName) => {
    const folderPath = path.join(root, folderName);
    const fileNames = fs
      .readdirSync(folderPath)
      .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
      .sort((a, b) => {
        const order = fileOrder[folderName] ?? [];
        const aIndex = order.indexOf(a);
        const bIndex = order.indexOf(b);

        if (aIndex >= 0 || bIndex >= 0) {
          return (aIndex >= 0 ? aIndex : Number.MAX_SAFE_INTEGER) -
            (bIndex >= 0 ? bIndex : Number.MAX_SAFE_INTEGER);
        }

        return a.localeCompare(b);
      });

    const files = fileNames.map((fileName) => {
      const fullPath = path.join(folderPath, fileName);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const title = String(parsed.data.title ?? fileName.replace(/\.(mdx|md)$/i, ""));
      const description = String(parsed.data.description ?? "");
      const tags = Array.isArray(parsed.data.tags)
        ? parsed.data.tags.map((tag) => String(tag))
        : [];

      return {
        id: `${folderName}/${fileName}`,
        folder: folderName,
        name: fileName,
        title,
        description,
        tags,
        accent: folderAccents[folderName] ?? "text-slate-300",
        content: parsed.content.trim()
      };
    });

    return {
      name: folderName,
      accent: folderAccents[folderName] ?? "text-slate-300",
      files
    };
  });

  return {
    folders,
    files: folders.flatMap((folder) => folder.files),
    stats: {
      experienceYears: "8+",
      role: "Senior Software Engineer",
      location: "Pune, India",
      focus: ["Java", "Spring Boot", "GCP", "GKE", "Kafka", "Pub/Sub"]
    }
  };
}
