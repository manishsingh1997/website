export type City = {
  slug: string,
  city: string,
  county: string,
  state:
    | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FL' | 'GA' | 'HI' | 'ID'
    | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO'
    | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA'
    | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY',
  state_full_name: string,
  warranty: string,
  address?: string,
  phone: string,
  header: {
    title: string,
    bullets: string[],
  },
  blog: {
    articles: Array<{
      url: string,
      img: string,
      description: string,
    }>,
  },
  license?: {
    url?: string,
    city_number: string,
    description?: string,
    state_number?: string,
    img?: string,
    pdf?: string,
  },
  licenses?: string[],
  packages: {
    title: string,
    description: string,
    data: Record<'wood' | 'vinyl' | 'chain-link' | 'box-wire', Array<{
      title: string,
      description: string,
      img: string,
    }>>,
  },
  projects: Array<{
    url?: string,
    img: string,
    label: string,
  }>,
  product: {
    type: 'fence',
  },
  rating: Record<'Angi' | 'BBB' | 'Google' | 'Thumbtack' | 'Yelp', string>,
  review: Record<'Yelp' | 'Google', {
    title: string,
    name?: string,
    description?: string,
    address?: string,
    img?: string,
    url?: string,
  }>,
  regulations: {
    title: string,
    description: string,
    pdf?: string,
    url?: string,
    img?: string,
    faq: Record<'front-yard' | 'side-yard' | 'rear-max-height' | 'setback' | 'corner-lot-rules', string>,
  },
};
