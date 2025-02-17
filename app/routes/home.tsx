import HeroSection from "~/components/home/hero-section";
import Navbar from "~/components/navbar/navbar";
import type { Route } from "./+types/home";
import { APP_NAME } from "~/config";

export function loader() {
  return { appName: APP_NAME };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Navbar appName={loaderData.appName} />
      <HeroSection appName={loaderData.appName} />
    </>
  );
}
