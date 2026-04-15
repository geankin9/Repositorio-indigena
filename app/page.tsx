import { HolaMundo } from "@/components/HolaMundo";
import { readHomeData } from "@/lib/dataService";

export default function Home() {
  const data = readHomeData();

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <HolaMundo
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        description={data.hero.description}
      />
    </main>
  );
}
