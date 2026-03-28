export type SectionType = 'Navbar' | 'Hero' | 'Footer'

export interface SectionConfig {
  id: string
  type: SectionType
  variant: string
  props: Record<string, unknown>
}

export interface PageConfig {
  slug: string
  sections: SectionConfig[]
}
