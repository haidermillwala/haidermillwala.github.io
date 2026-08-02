import { PortfolioWorkspace } from "@/components/portfolio-workspace";
import { getWorkspace } from "@/lib/workspace";

export default function Home() {
  const workspace = getWorkspace();

  return <PortfolioWorkspace workspace={workspace} />;
}
