export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Axulogic",
    "url": "https://axulogic.uk",
    "logo": "https://axulogic.uk/assets/axulogic.svg",
    "description": "Axulogic is a GitHub parent organization that manages and coordinates multiple sub-organizations across different domains. From indie game development to enterprise solutions, we foster collaboration and innovation.",
    "foundingDate": "2024",
    "sameAs": [
      "https://github.com/Axulogic"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Portuguese"]
    },
    "areaServed": "Worldwide",
    "serviceType": "Open Source Organization Management",
    "keywords": "open source, github organizations, development, collaboration, innovation, technology, software, community"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
