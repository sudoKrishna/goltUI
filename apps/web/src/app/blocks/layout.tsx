import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BlockTabs from "@/components/BlockTabs"

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <BlockTabs />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
