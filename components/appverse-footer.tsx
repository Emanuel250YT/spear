"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Twitter, MessageCircle, Github, Linkedin } from "lucide-react"
import Image from "next/image"
import { SmartLoginButton } from "@/components/ui/smart-login-button"

interface FooterContent {
  tagline: string
  copyright: string
}

const defaultContent: FooterContent = {
  tagline: "La primera plataforma blockchain para freelancers latinoamericanos. Trabaja sin comisiones, con protección descentralizada.",
  copyright: "© 2025 — Spear Platform",
}

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent)

  return (
    <section className="text-white">
      {/* Contact CTA */}
      <div className="container mx-auto px-4 pt-12 sm:pt-16">
        <div className="flex justify-center">
          <SmartLoginButton
            className="rounded-full bg-blue-200 px-6 py-2 text-sm font-medium text-black shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:bg-blue-300"
          >
            Conectar Wallet
          </SmartLoginButton>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="border-t border-white/10 bg-gradient-to-b from-black to-gray-900 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/icons/spear-white.svg"
                  alt="Spear logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold">Spear</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {content.tagline}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://twitter.com/speardev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-300 transition-colors"
                  aria-label="Follow Spear on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/speardev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-300 transition-colors"
                  aria-label="Follow Spear on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/speardev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-300 transition-colors"
                  aria-label="Spear on GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/speardev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-300 transition-colors"
                  aria-label="Spear on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Plataforma
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link href="/como-funciona" className="hover:text-blue-300 transition-colors">
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-blue-300 transition-colors">
                    Comisiones
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-blue-300 transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-300 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categorías */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Categorías
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link href="/categorias/desarrollo-web" className="hover:text-blue-300 transition-colors">
                    Desarrollo Web
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/diseno-ux-ui" className="hover:text-blue-300 transition-colors">
                    Diseño UX/UI
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/backend" className="hover:text-blue-300 transition-colors">
                    Backend
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/blockchain" className="hover:text-blue-300 transition-colors">
                    Blockchain
                  </Link>
                </li>
                <li>
                  <Link href="/categorias/marketing" className="hover:text-blue-300 transition-colors">
                    Marketing Digital
                  </Link>
                </li>
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Soporte
              </h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link href="/faq" className="hover:text-blue-300 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-300 transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/disputas" className="hover:text-blue-300 transition-colors">
                    Centro de Disputas
                  </Link>
                </li>
                <li>
                  <Link href="/seguridad" className="hover:text-blue-300 transition-colors">
                    Seguridad
                  </Link>
                </li>
                <li>
                  <Link href="/whitepaper" className="hover:text-blue-300 transition-colors">
                    Whitepaper
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-200 mb-1">500+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Freelancers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-200 mb-1">1000+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Proyectos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-200 mb-1">$50K+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Procesados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-200 mb-1">0%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Comisión Base</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              <Link href="/terminos" className="hover:text-blue-300 transition-colors">
                Términos de Uso
              </Link>
              <Link href="/privacidad" className="hover:text-blue-300 transition-colors">
                Privacidad
              </Link>
              <Link href="/smart-contracts" className="hover:text-blue-300 transition-colors">
                Smart Contracts
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
