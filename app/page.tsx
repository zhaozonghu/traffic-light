import { categories } from "@/lib/data";
import NavBar from "@/components/NavBar";
import CategorySection from "@/components/CategorySection";
import TrafficLightLogo from "@/components/TrafficLightLogo";
import LightRays from "@/components/LightRays";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* 全屏光射线背景（reactbits.dev/backgrounds/light-rays） */}
      <div className="light-rays-layer pointer-events-none fixed inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      <NavBar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <div className="flex flex-col gap-14">
          {categories.map((cat, i) => (
            <CategorySection key={cat.name} category={cat} index={i} />
          ))}
        </div>
      </main>

      <footer className="border-t border-tl-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-sm text-tl-fg/40 sm:px-6">
          <TrafficLightLogo />
          <p>
            红绿灯 ·  一个有趣的导航网站
          </p>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
