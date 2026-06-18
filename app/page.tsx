import { I18nProvider } from "@/lib/i18n"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ConverterTool } from "@/components/ConverterTool"
import { HowItWorks } from "@/components/HowItWorks"
import { WhyConvert } from "@/components/WhyConvert"
import { WhatItDoes } from "@/components/WhatItDoes"
import { BenefitsGrid } from "@/components/BenefitsGrid"
import { BlogSection } from "@/components/BlogSection"
import { FAQSection } from "@/components/FAQ"
import { FooterSection } from "@/components/Footer"

export default function Home() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <HeroSection />
        <ConverterTool />
        <HowItWorks />
        <WhyConvert />
        <WhatItDoes />
        <BenefitsGrid />
        <BlogSection />
        <FAQSection />
      </main>
      <FooterSection />
    </I18nProvider>
  )
}
