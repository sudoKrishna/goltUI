import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ComponentsSidebar from "@/components/ComponentsSidebar"

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-6">
        <ComponentsSidebar />
        <main className="min-w-0 flex-1 md:pl-8">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
