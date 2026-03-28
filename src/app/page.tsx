'use client'

import { MdSpeed, MdSecurity, MdSupportAgent, MdWeb, MdSearch, MdCampaign } from 'react-icons/md'

import { Navbar }       from '@/components/organisms/Navbar'
import { Hero }         from '@/components/organisms/Hero'
import { LogoStrip }    from '@/components/organisms/LogoStrip'
import { Features }     from '@/components/organisms/Features'
import { About }        from '@/components/organisms/About'
import { Services }     from '@/components/organisms/Services'
import { Stats }        from '@/components/organisms/Stats'
import { Testimonials } from '@/components/organisms/Testimonials'
import { Team }         from '@/components/organisms/Team'
import { Pricing }      from '@/components/organisms/Pricing'
import { Faq }          from '@/components/organisms/Faq'
import { CtaSection }   from '@/components/organisms/CtaSection'
import { Blog }         from '@/components/organisms/Blog'
import { Portfolio }    from '@/components/organisms/Portfolio'
import { Contact }      from '@/components/organisms/Contact'
import { Footer }       from '@/components/organisms/Footer'

const navItems = [
  { label: 'Home',      href: '/' },
  { label: 'Diensten',  href: '/diensten' },
  { label: 'Over ons',  href: '/over-ons' },
  { label: 'Contact',   href: '/contact' },
]

export default function Home() {
  return (
    <>
      <Navbar
        variant="default"
        logo={{ src: '/next.svg', alt: 'Bedrijfsnaam', width: 120, height: 36 }}
        items={navItems}
        cta={{ label: 'Gratis offerte', href: '/contact' }}
        currentPath="/"
      />

      <main id="main-content" className="flex-1">

        <Hero
          variant="default"
          badge="Gratis adviesgesprek"
          headline="Meer klanten, minder gedoe"
          subtext="Wij bouwen websites die converteren. Snel, betaalbaar en op maat voor jouw bedrijf."
          primaryCTA={{ label: 'Gratis offerte aanvragen', href: '/contact' }}
          secondaryCTA={{ label: 'Bekijk ons werk', href: '/portfolio' }}
          image={{ src: '/next.svg', alt: 'Hero afbeelding' }}
        />

        <LogoStrip
          variant="default"
          label="Vertrouwd door meer dan 200 bedrijven"
          logos={[
            { src: '/next.svg', alt: 'Klant A', width: 100, height: 32 },
            { src: '/next.svg', alt: 'Klant B', width: 100, height: 32 },
            { src: '/next.svg', alt: 'Klant C', width: 100, height: 32 },
            { src: '/next.svg', alt: 'Klant D', width: 100, height: 32 },
            { src: '/next.svg', alt: 'Klant E', width: 100, height: 32 },
          ]}
        />

        <Features
          variant="default"
          sectionLabel="Waarom wij"
          heading="Alles wat jouw bedrijf nodig heeft"
          subtext="Van ontwerp tot lancering — wij regelen het voor je."
          features={[
            { icon: MdSpeed,        title: 'Razendsnel',        description: 'Websites die laden in minder dan 1 seconde, ook op mobiel.' },
            { icon: MdSecurity,     title: 'Veilig & betrouwbaar', description: 'SSL, regelmatige backups en 99.9% uptime gegarandeerd.' },
            { icon: MdSupportAgent, title: 'Altijd support',    description: 'Persoonlijk contact en snelle reactietijden, altijd.' },
          ]}
        />

        <About
          variant="default"
          sectionLabel="Over ons"
          heading="Wij geloven in eerlijk digitaal werk"
          body="Al meer dan 10 jaar helpen wij MKB-bedrijven met websites die écht werken. Geen wollig taalgebruik, geen verborgen kosten — gewoon resultaat."
          stats={[
            { value: '10+',  label: 'Jaar ervaring' },
            { value: '200+', label: 'Projecten afgerond' },
            { value: '98%',  label: 'Tevreden klanten' },
          ]}
          cta={{ label: 'Maak kennis met ons team', href: '/team' }}
          image={{ src: '/next.svg', alt: 'Ons team aan het werk' }}
          imagePosition="right"
        />

        <Services
          variant="default"
          sectionLabel="Wat wij doen"
          heading="Onze diensten"
          subtext="Alles onder één dak voor jouw online succes."
          services={[
            { icon: MdWeb,      title: 'Webdesign',        description: 'Op maat gemaakte websites die converteren.', href: '/diensten/webdesign' },
            { icon: MdSearch,   title: 'SEO',              description: 'Beter gevonden in Google, meer organisch verkeer.', href: '/diensten/seo' },
            { icon: MdCampaign, title: 'Online marketing', description: 'Meer bezoekers, meer leads, meer omzet.', href: '/diensten/marketing' },
          ]}
          cta={{ label: 'Alle diensten bekijken', href: '/diensten' }}
        />

        <Stats
          variant="default"
          stats={[
            { value: '500+', label: 'Tevreden klanten' },
            { value: '10+',  label: 'Jaar ervaring' },
            { value: '99%',  label: 'Uptime' },
            { value: '4u',   label: 'Gemiddelde reactietijd' },
          ]}
          background="primary"
        />

        <Testimonials
          variant="default"
          sectionLabel="Wat klanten zeggen"
          heading="Beoordeeld met een 9.2"
          testimonials={[
            { quote: 'Binnen 3 weken live, precies wat we wilden. De samenwerking was prettig en het resultaat spreekt voor zich.', authorName: 'Jan Bakker', authorRole: 'Eigenaar Bakkerij De Wit', rating: 5 },
            { quote: 'Eindelijk een bureau dat gewoon doet wat ze beloven. Onze omzet is met 30% gestegen na de nieuwe website.', authorName: 'Lisa van den Berg', authorRole: 'Directeur Groen Installatietechniek', rating: 5 },
            { quote: 'Super professioneel en altijd bereikbaar. We werken nu al 3 jaar samen en zouden niet anders willen.', authorName: 'Marco Hendriks', authorRole: 'Marketing Manager Hendriks Vastgoed', rating: 4 },
          ]}
        />

        <Team
          variant="default"
          sectionLabel="Ons team"
          heading="De mensen achter het werk"
          subtext="Een klein maar gedreven team met grote ambities."
          members={[
            { name: 'Anna de Vries',   role: 'Oprichter & Designer', image: { src: '/next.svg', alt: 'Anna de Vries' },   bio: 'Gepassioneerd door goede UX en heldere communicatie.' },
            { name: 'Bas Janssen',     role: 'Lead Developer',       image: { src: '/next.svg', alt: 'Bas Janssen' },     bio: 'Bouwt snelle, veilige en schaalbare websites.' },
            { name: 'Chantal Peters', role: 'SEO Specialist',        image: { src: '/next.svg', alt: 'Chantal Peters' }, bio: 'Zorgt dat jouw klanten je altijd weten te vinden.' },
          ]}
        />

        <Pricing
          variant="default"
          sectionLabel="Tarieven"
          heading="Transparante prijzen"
          subtext="Geen verrassingen achteraf. Kies het pakket dat past bij jouw bedrijf."
          tiers={[
            {
              name: 'Starter',
              price: '€ 799',
              period: 'eenmalig',
              description: 'Perfect voor starters en zzp\'ers.',
              features: [
                { text: '5 pagina\'s', included: true },
                { text: 'Mobielvriendelijk', included: true },
                { text: 'Contactformulier', included: true },
                { text: 'SEO basis', included: true },
                { text: 'Webshop', included: false },
                { text: 'Maandelijks onderhoud', included: false },
              ],
              cta: { label: 'Kies Starter', href: '/contact' },
            },
            {
              name: 'Business',
              price: '€ 1.499',
              period: 'eenmalig',
              description: 'Ideaal voor groeiende bedrijven.',
              highlighted: true,
              features: [
                { text: '10 pagina\'s', included: true },
                { text: 'Mobielvriendelijk', included: true },
                { text: 'Contactformulier', included: true },
                { text: 'SEO uitgebreid', included: true },
                { text: 'Blog module', included: true },
                { text: 'Maandelijks onderhoud', included: false },
              ],
              cta: { label: 'Kies Business', href: '/contact' },
            },
            {
              name: 'Premium',
              price: '€ 2.499',
              period: 'eenmalig',
              description: 'Voor bedrijven die maximaal willen groeien.',
              features: [
                { text: 'Onbeperkt pagina\'s', included: true },
                { text: 'Mobielvriendelijk', included: true },
                { text: 'Contactformulier', included: true },
                { text: 'SEO uitgebreid', included: true },
                { text: 'Blog + webshop', included: true },
                { text: 'Maandelijks onderhoud', included: true },
              ],
              cta: { label: 'Kies Premium', href: '/contact' },
            },
          ]}
        />

        <Faq
          variant="default"
          sectionLabel="Veelgestelde vragen"
          heading="Alles wat je wilt weten"
          items={[
            { question: 'Wat kost een website bij jullie?',         answer: 'Onze websites starten vanaf € 799 voor een eenvoudige website. De exacte prijs hangt af van jouw wensen. Vraag een gratis offerte aan voor een eerlijk voorstel.' },
            { question: 'Hoe lang duurt het om een website te maken?', answer: 'Een standaard website is gemiddeld binnen 3 tot 4 weken klaar. Grotere projecten met een webshop of maatwerk functionaliteiten kunnen 6 tot 8 weken duren.' },
            { question: 'Kan ik zelf content aanpassen?',           answer: 'Ja, alle websites leveren wij op met een gebruiksvriendelijk CMS. Je kunt teksten, afbeeldingen en pagina\'s zelf aanpassen zonder technische kennis.' },
            { question: 'Zorgen jullie ook voor hosting?',          answer: 'Ja, wij verzorgen betrouwbare hosting met 99.9% uptime, dagelijkse backups en een SSL-certificaat. Dit is inbegrepen in ons onderhoudsabonnement.' },
          ]}
        />

        <Portfolio
          variant="default"
          sectionLabel="Ons werk"
          heading="Recente projecten"
          subtext="Een greep uit de websites die wij hebben gebouwd."
          items={[
            { title: 'Bakkerij De Wit',           category: 'Webdesign',   image: { src: '/next.svg', alt: 'Bakkerij De Wit website' } },
            { title: 'Groen Installatie',          category: 'SEO',         image: { src: '/next.svg', alt: 'Groen Installatie website' } },
            { title: 'Hendriks Vastgoed',          category: 'Webdesign',   image: { src: '/next.svg', alt: 'Hendriks Vastgoed website' } },
            { title: 'Peters Fysiotherapie',       category: 'Marketing',   image: { src: '/next.svg', alt: 'Peters Fysiotherapie website' } },
            { title: 'Van Dam Advocaten',          category: 'Webdesign',   image: { src: '/next.svg', alt: 'Van Dam Advocaten website' } },
            { title: 'De Boer Autoservice',        category: 'SEO',         image: { src: '/next.svg', alt: 'De Boer Autoservice website' } },
          ]}
          cta={{ label: 'Alle projecten bekijken', href: '/portfolio' }}
        />

        <Blog
          variant="default"
          sectionLabel="Blog"
          heading="Laatste nieuws & tips"
          subtext="Praktische tips om meer uit jouw online aanwezigheid te halen."
          posts={[
            { title: 'Waarom een snelle website meer klanten oplevert', excerpt: 'Laadtijd heeft directe invloed op je conversieratio. Ontdek hoe je jouw website sneller maakt en wat dat voor jouw omzet betekent.', date: '12 maart 2025', category: 'SEO', image: { src: '/next.svg', alt: 'Blog post 1' }, href: '/blog/snelle-website' },
            { title: '5 redenen waarom MKB investeert in een nieuwe website', excerpt: 'Een verouderde website kost je klanten. Wij zetten de vijf belangrijkste redenen op een rij om nu actie te ondernemen.', date: '28 februari 2025', category: 'Webdesign', image: { src: '/next.svg', alt: 'Blog post 2' }, href: '/blog/nieuwe-website' },
            { title: 'Google verandert: zo blijf je vindbaar in 2025', excerpt: 'De algoritmes van Google veranderen continu. Lees hoe je jouw SEO-strategie aanpast en bovenaan blijft staan.', date: '14 februari 2025', category: 'SEO', image: { src: '/next.svg', alt: 'Blog post 3' }, href: '/blog/google-2025' },
          ]}
          cta={{ label: 'Alle artikelen lezen', href: '/blog' }}
        />

        <CtaSection
          variant="default"
          heading="Klaar om te groeien?"
          subtext="Vraag vandaag nog een gratis offerte aan. Geen verplichtingen, gewoon een eerlijk gesprek."
          primaryCTA={{ label: 'Gratis offerte aanvragen', href: '/contact' }}
          secondaryCTA={{ label: 'Meer informatie', href: '/diensten' }}
          background="primary"
        />

        <Contact
          variant="default"
          sectionLabel="Contact"
          heading="Neem contact op"
          subtext="Heb je een vraag of wil je een offerte? We horen graag van je."
          info={{
            address: 'Voorbeeldstraat 1, 1234 AB Amsterdam',
            phone: '020 123 4567',
            email: 'info@bedrijf.nl',
            openingHours: 'Ma–Vr: 9:00–17:00',
          }}
        />

      </main>

      <Footer
        variant="default"
        logo={{ src: '/next.svg', alt: 'Bedrijfsnaam', width: 120, height: 36 }}
        tagline="Wij helpen MKB groeien met slimme digitale oplossingen."
        columns={[
          {
            heading: 'Diensten',
            links: [
              { label: 'Webdesign',       href: '/diensten/webdesign' },
              { label: 'SEO',             href: '/diensten/seo' },
              { label: 'Online marketing', href: '/diensten/marketing' },
            ],
          },
          {
            heading: 'Bedrijf',
            links: [
              { label: 'Over ons', href: '/over-ons' },
              { label: 'Blog',     href: '/blog' },
              { label: 'Contact',  href: '/contact' },
            ],
          },
        ]}
        socials={[
          { platform: 'linkedin',  href: 'https://linkedin.com',  ariaLabel: 'Volg ons op LinkedIn' },
          { platform: 'instagram', href: 'https://instagram.com', ariaLabel: 'Volg ons op Instagram' },
          { platform: 'facebook',  href: 'https://facebook.com',  ariaLabel: 'Volg ons op Facebook' },
        ]}
        contact={{
          address: 'Voorbeeldstraat 1, 1234 AB Amsterdam',
          phone: '020 123 4567',
          email: 'info@bedrijf.nl',
        }}
        copyright={`© ${new Date().getFullYear()} Bedrijfsnaam. Alle rechten voorbehouden.`}
      />
    </>
  )
}
