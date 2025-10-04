"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, Briefcase, Tag, HelpCircle, FileText, Info } from "lucide-react"

export function SiteHeader() {
  const links = [
    { href: "/", label: "Inicio", icon: Briefcase },
    { href: "/proyectos", label: "Proyectos", icon: Briefcase },
    { href: "/freelancers", label: "Freelancers", icon: Tag },
    { href: "/#pricing", label: "Comisiones", icon: Tag },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/About", label: "Nosotros", icon: Info },
  ]

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src="/icons/spear-white.svg"
              alt="Spear logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="font-semibold tracking-wide text-white">Spear</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-purple-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex gap-2">
            <Button
              asChild
              variant="outline"
              className="border-blue-200/30 text-blue-200 font-medium rounded-lg px-4 py-2.5
                         hover:bg-blue-200/10 transition-all"
            >
              <Link href="/registro">Registrarse</Link>
            </Button>
            <Button
              asChild
              className="bg-blue-200 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-blue-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/admin/login">Conectar Wallet</Link>
            </Button>
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
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="liquid-glass border-gray-800 p-0 w-64 flex flex-col"
              >
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                  <Image
                    src="/icons/spear-white.svg"
                    alt="Spear logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="font-semibold tracking-wide text-white text-lg">Spear</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-purple-300 transition-colors"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full bg-blue-200 text-black font-medium rounded-lg px-6 py-2.5
                               hover:bg-blue-300 hover:shadow-md hover:scale-[1.02]
                               transition-all"
                  >
                    <Link href="/admin/login">Conectar Wallet</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
