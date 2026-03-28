import type { IconType } from 'react-icons'

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface LogoConfig {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ImageConfig {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface CTAConfig {
  label: string
  href: string
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok'
  href: string
  ariaLabel: string
}

export interface FooterConfig {
  logo: LogoConfig
  tagline?: string
  columns: FooterColumn[]
  socials?: SocialLink[]
  contact?: {
    address?: string
    phone?: string
    email?: string
  }
  copyright: string
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  badge?: string
  headline: string
  subtext: string
  primaryCTA: CTAConfig
  secondaryCTA?: CTAConfig
  image: ImageConfig
}

// ─── Features ─────────────────────────────────────────────────────────────────

export interface Feature {
  icon: IconType
  title: string
  description: string
}

export interface FeaturesConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  features: Feature[]
}

// ─── About ────────────────────────────────────────────────────────────────────

export interface AboutStat {
  value: string
  label: string
}

export interface AboutConfig {
  sectionLabel?: string
  heading: string
  body: string
  stats?: AboutStat[]
  cta?: CTAConfig
  image: ImageConfig
  imagePosition?: 'left' | 'right'
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  icon?: IconType
  title: string
  description: string
  href?: string
}

export interface ServicesConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  services: Service[]
  cta?: CTAConfig
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  quote: string
  authorName: string
  authorRole: string
  authorImage?: ImageConfig
  rating?: number
}

export interface TestimonialsConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  testimonials: Testimonial[]
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string
  role: string
  image: ImageConfig
  bio?: string
  socials?: SocialLink[]
}

export interface TeamConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  members: TeamMember[]
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  items: FaqItem[]
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: PricingFeature[]
  cta: CTAConfig
  highlighted?: boolean
}

export interface PricingConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  tiers: PricingTier[]
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

export interface CTASectionConfig {
  heading: string
  subtext?: string
  primaryCTA: CTAConfig
  secondaryCTA?: CTAConfig
  background?: 'primary' | 'muted'
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactInfo {
  address?: string
  phone?: string
  email?: string
  openingHours?: string
}

export interface ContactConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  info?: ContactInfo
}

// ─── Logo Strip ───────────────────────────────────────────────────────────────

export interface ClientLogoItem {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface LogoStripConfig {
  label?: string
  logos: ClientLogoItem[]
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  category: string
  image: ImageConfig
  href: string
}

export interface BlogConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  posts: BlogPost[]
  cta?: CTAConfig
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  title: string
  category: string
  image: ImageConfig
  href?: string
}

export interface PortfolioConfig {
  sectionLabel?: string
  heading: string
  subtext?: string
  items: PortfolioItem[]
  cta?: CTAConfig
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface Stat {
  value: string
  label: string
  icon?: IconType
}

export interface StatsConfig {
  sectionLabel?: string
  stats: Stat[]
  background?: 'light' | 'primary'
}
