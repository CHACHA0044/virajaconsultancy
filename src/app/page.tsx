import { AddressPreview } from '@/components/sections/address-preview'
import { ContactPreview } from '@/components/sections/contact-preview'
import { Hero } from '@/components/sections/hero'
import { ServicesPreview } from '@/components/sections/services-preview'
import { VisionPreview } from '@/components/sections/vision-preview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <VisionPreview />
      <ContactPreview />
      <AddressPreview />
    </>
  )
}
