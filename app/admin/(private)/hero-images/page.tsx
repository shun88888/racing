import heroImages from "@/content/hero-images.json";
import { HeroImagesEditor } from "@/components/admin/editors/HeroImagesEditor";

export default function HeroImagesPage() {
  return <HeroImagesEditor initial={heroImages.featureImages} />;
}
