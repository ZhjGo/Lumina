import { HomeContent } from "@/components/features/HomeContent";
import { wallpapers } from "@/data/wallpapers";

// export const revalidate = 0; // Removed for Static Export compatibility

export default function Home() {
  // Server-side random selection
  // This ensures the HTML arrives with the image URL already set, 
  // preventing the "white/black flash" waiting for client-side JS to execute.
  const randomBg = wallpapers[Math.floor(Math.random() * wallpapers.length)];

  return <HomeContent initialBg={randomBg} />;
}
