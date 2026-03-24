export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'gray',
    },
  },
  site: {
    name: 'GA Vocabularies',
    logo: '/ga-logo.svg',
    icon: 'i-heroicons-globe-alt',
    tagline: '',
    footerText: 'Commonwealth of Australia (Geoscience Australia)',
    footerLinks: [
      { label: 'About', href: '/about' },
      { label: 'vocabs.ga.gov.au', href: 'https://vocabs.ga.gov.au/' },
    ],
    siteHeaderBreadcrumbs: true,
  },
})
