import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: "About Axulogic - Open Source Organization Management",
    description: "Learn about Axulogic, a leading GitHub parent organization that manages multiple sub-organizations across gaming, enterprise, and open source development.",
    keywords: ["Axulogic", "about", "github organizations", "open source management", "development teams", "collaboration"],
    openGraph: {
      title: "About Axulogic - Open Source Organization Management",
      description: "Learn about Axulogic, a leading GitHub parent organization that manages multiple sub-organizations across gaming, enterprise, and open source development.",
      url: "https://axulogic.uk/about",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Axulogic</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Axulogic is a pioneering GitHub parent organization dedicated to managing and coordinating 
            multiple sub-organizations across diverse domains. From indie game development to enterprise 
            solutions, we foster collaboration, innovation, and excellence in the open source community.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Organization Management</h3>
              <p>We provide centralized management for multiple GitHub organizations, ensuring 
              consistent standards, security, and collaboration across all projects.</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Cross-Domain Collaboration</h3>
              <p>Our expertise spans gaming, enterprise software, web development, and more, 
              enabling seamless collaboration between different technical domains.</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Open Source Advocacy</h3>
              <p>We promote open source best practices, community engagement, and sustainable 
              development methodologies across all our organizations.</p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Innovation Hub</h3>
              <p>By connecting diverse teams and projects, we create an environment where 
              innovation thrives and new ideas can flourish.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-3 text-lg">
            <li><strong>Collaboration:</strong> We believe in the power of working together across boundaries</li>
            <li><strong>Innovation:</strong> We encourage creative solutions and cutting-edge approaches</li>
            <li><strong>Transparency:</strong> Open communication and clear processes are fundamental to our success</li>
            <li><strong>Quality:</strong> We maintain high standards in all our projects and collaborations</li>
            <li><strong>Community:</strong> Building and nurturing the open source community is our priority</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Axulogic?</h2>
          <p className="text-lg leading-relaxed mb-6">
            As a GitHub parent organization, we offer unique advantages for managing multiple 
            sub-organizations effectively. Our centralized approach ensures consistency, 
            security, and optimal resource allocation while maintaining the flexibility 
            that individual teams need to thrive.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you're looking to organize your open source projects, manage multiple 
            development teams, or create a collaborative ecosystem, Axulogic provides the 
            infrastructure and expertise you need to succeed.
          </p>
        </section>
      </div>
    </div>
  );
}
