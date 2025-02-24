import AppNavbar from "@/components/AppNavbar"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { deleteSession, getUserFromSession } from "@/lib/session"
import { UserProvider } from "@/providers/user.provider"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = (await cookies()).get("session")?.value;
  const user = await getUserFromSession(cookie)

  if (!user) {
    await deleteSession()
    redirect("/login")
  }

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <AppNavbar />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider >
    </UserProvider>
  )
}