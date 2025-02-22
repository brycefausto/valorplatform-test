import { PropsWithChildren } from "react";
import Footer from "../Footer";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}
