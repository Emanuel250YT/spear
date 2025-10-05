import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Cómo funciona Spear?",
      answer: "Spear es una plataforma descentralizada que conecta clientes con freelancers utilizando blockchain. Los pagos son seguros, transparentes y los contratos inteligentes garantizan que tanto freelancers como clientes estén protegidos."
    },
    {
      question: "¿Qué comisiones cobra Spear?",
      answer: "Nuestras comisiones son transparentes y competitivas. Para freelancers nuevos: 10% los primeros $1,000, 8% hasta $10,000, 5% hasta $50,000, y 3% en adelante. La protección básica es gratuita, mientras que la protección premium tiene costos adicionales."
    },
    {
      question: "¿Cómo me protege la blockchain?",
      answer: "Los contratos inteligentes aseguran que los pagos se liberen automáticamente cuando se cumplan las condiciones del proyecto. Esto elimina disputas y garantiza pagos justos y puntuales para ambas partes."
    },
    {
      question: "¿Puedo trabajar con criptomonedas?",
      answer: "Sí, Spear acepta pagos en PAS en la red Polkadot Asset Hub. Los contratos inteligentes aseguran transacciones transparentes y automáticas."
    },
    {
      question: "¿Qué tipos de servicios puedo ofrecer?",
      answer: "Puedes ofrecer cualquier servicio digital: desarrollo web y móvil, diseño UI/UX, marketing digital, desarrollo blockchain, análisis de datos, y más. Spear está diseñada para cualquier talento tecnológico."
    },
    {
      question: "¿Cómo verifico mi identidad?",
      answer: "El proceso de verificación incluye KYC estándar y verificación de habilidades. Los freelancers verificados reciben un badge especial y acceso a proyectos premium con mejores tarifas."
    },
    {
      question: "¿Qué pasa si hay problemas con un proyecto?",
      answer: "Tenemos un sistema de resolución de disputas automatizado basado en contratos inteligentes. Si es necesario, mediadores humanos especializados pueden intervenir para resolver casos complejos."
    },
    {
      question: "¿Puedo trabajar con equipos?",
      answer: "Absolutamente. Spear permite crear equipos y colaborar en proyectos grandes. Los pagos se pueden distribuir automáticamente entre miembros del equipo según acuerdos predefinidos."
    },
    {
      question: "¿Hay límites en los proyectos?",
      answer: "No hay límites en el tamaño o duración de los proyectos. Desde tareas de $50 hasta contratos empresariales de millones de dólares, Spear puede manejar cualquier escala de proyecto."
    },
    {
      question: "¿Cómo empiezo como freelancer?",
      answer: "Regístrate, completa tu perfil, verifica tu identidad y habilidades, y comienza a aplicar a proyectos. Los nuevos freelancers tienen acceso a recursos de onboarding y soporte especializado."
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Preguntas <span className="text-blue-200">Frecuentes</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Todo lo que necesitas saber sobre Spear, la plataforma blockchain
              para freelancers que está revolucionando el trabajo remoto.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-8 lg:p-12">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm px-6"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-blue-200 py-6 text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-200/20 rounded-3xl backdrop-blur-xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                ¿Tienes más preguntas?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos en menos de 24 horas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@spear.com"
                  className="bg-blue-200 hover:bg-blue-300 text-black font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 inline-block"
                >
                  Contactar Soporte
                </a>
                <a
                  href="/login"
                  className="border border-blue-200/50 text-blue-200 hover:bg-blue-200/10 hover:border-blue-200 px-8 py-3 rounded-xl transition-all inline-block"
                >
                  Iniciar Sesión
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </div>
  )
}
<p className="text-neutral-300">
  Pricing is based on animation length, complexity, number of renders, and modeling requirements. You
  can view our detailed pricing on our{" "}
  <a href="/pricing" className="text-blue-200 underline">
    pricing page
  </a>
  .
</p>
                </section >

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">5. Can we request changes after delivery?</h2>
                  <p className="text-neutral-300">
                    Yes. All revisions are covered under our{" "}
                    <a href="/revisions" className="text-blue-200 underline">
                      revision policy
                    </a>
                    , which ensures smooth updates without unexpected scope creep.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    6. Will the renders match our brand’s visual style?
                  </h2>
                  <p className="text-neutral-300">
                    Absolutely. We customize lighting, materials, camera angles, and animation pacing to fit your
                    brand’s identity and marketing needs.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">7. What formats do you deliver in?</h2>
                  <p className="text-neutral-300">
                    We typically deliver in MP4 (H.264) for videos and high-resolution PNG/JPG for stills. Other formats
                    like MOV, ProRes, or transparent-background renders are available on request.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    8. Can you handle large-scale projects or bulk renders?
                  </h2>
                  <p className="text-neutral-300">
                    Yes, we regularly work on bulk orders for 10+ animations or 50+ renders. We optimize workflows to
                    maintain quality and meet tight deadlines.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">
                    9. Do you offer creative direction or only technical execution?
                  </h2>
                  <p className="text-neutral-300">
                    We do both. Our team can develop creative concepts, storyboards, and camera moves, or simply execute
                    your pre-approved vision.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">10. How do we get started?</h2>
                  <p className="text-neutral-300">
                    Simply{" "}
                    <a href="/contact" className="text-blue-200 underline">
                      contact us
                    </a>{" "}
                    with your project details, references, and timeline. We’ll provide a proposal and next steps.
                  </p>
                </section>
              </div >
            </div >
          </div >
        </div >
      </section >
  <AppverseFooter />
    </>
  )
}
