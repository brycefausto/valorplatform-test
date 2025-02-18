import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function loader() {
  return redirect("/login");
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // return (
  //   <>
  //     <Navbar appName={loaderData.appName} />
  //     <HeroSection appName={loaderData.appName} />
  //   </>
  // );

  return (
    <>
    </>
  );
}
