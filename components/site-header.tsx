"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WalletButton } from "@/components/ui/wallet-button"
import Image from "next/image"
import { Menu, Briefcase, Tag, HelpCircle, FileText, Info, TestTube } from "lucide-react"

export function SiteHeader() {
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/freelancers", label: "Freelancers" },
    { href: "/#pricing", label: "Comisiones" },
    { href: "/test", label: "Test" },
    { href: "/faq", label: "FAQ" },
    { href: "/About", label: "Nosotros" },
  ]

  return (
    <header className="sticky top-0 z-50 py-4 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-8 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/spear-white.svg"
              alt="Spear logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-bold tracking-wide text-white text-lg">Spear</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-purple-300 hover:bg-purple-900/20 transition-all duration-200"
              >
                {/* <l.icon className="h-4 w-4" /> */}
                <span className="font-medium">{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-3">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-200/30 text-blue-200 font-medium rounded-lg px-6 py-3
                         hover:bg-blue-200/10 hover:border-blue-200/50 transition-all duration-200"
            >
              <Link href="/registro">Registrarse</Link>
            </Button>
            <WalletButton
              variant="default"
              size="lg"
              className="bg-blue-200 text-black font-medium rounded-lg px-8 py-3
                         hover:bg-blue-300 hover:shadow-lg hover:scale-[1.02]
                         transition-all duration-200"
              showAccount={true}
              showNetwork={false}
            />
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="liquid-glass border-gray-800 p-0 w-72 flex flex-col"
              >
                {/* Brand Header */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
                  <Image
                    src="/icons/spear-white.svg"
                    alt="Spear logo"
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                  <span className="font-bold tracking-wide text-white text-xl">Spear</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 mt-6 text-gray-200 px-4">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-4 px-4 py-3 rounded-lg 
                                 hover:bg-purple-900/20 hover:text-purple-300 
                                 transition-all duration-200"
                    >
                      {/* <span className="inline-flex items-center justify-center w-6 h-6 text-gray-400">
                        <l.icon className="h-5 w-5" />
                      </span> */}
                      <span className="text-base font-medium">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Buttons at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-6 space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-blue-200/30 text-blue-200 font-medium rounded-lg py-3
                               hover:bg-blue-200/10 hover:border-blue-200/50 transition-all duration-200"
                  >
                    <Link href="/registro">Registrarse</Link>
                  </Button>
                  <WalletButton
                    variant="default"
                    size="lg"
                    className="w-full bg-blue-200 text-black font-medium rounded-lg py-3
                               hover:bg-blue-300 hover:shadow-lg hover:scale-[1.02]
                               transition-all duration-200"
                    showAccount={false}
                    showNetwork={false}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
