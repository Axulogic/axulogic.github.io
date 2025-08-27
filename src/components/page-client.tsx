"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { GitBranch, Github, Users, Twitter, Sparkles, ChevronDown, Atom, Gem, Users2, GitFork, Hexagon, Binary } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Locale } from "@/i18n-config";
import { AnimatedContent } from "@/components/animated-content";
import { SplashScreen } from '@/components/splash-screen';
import { HeroAsciiArt } from '@/components/hero-ascii-art';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { HackerText } from './hacker-text';
import { SciFiDivider } from './sci-fi-divider';
import { InteractiveGrid } from './interactive-grid';
import { RotatingHighlight } from './rotating-highlight';
import { useGitHubStats } from '@/hooks/use-github-stats';
import { useGTM } from '@/hooks/use-gtm';

type Dictionary = Awaited<ReturnType<typeof import('@/get-dictionary').getDictionary>>;

interface PageClientProps {
  lang: Locale;
  dictionary: Dictionary;
  asciiArtBlack: string;
  asciiArtWhite: string;
  asciiIcon: string;
}

export function PageClient({ lang, dictionary, asciiArtBlack, asciiArtWhite, asciiIcon }: PageClientProps) {
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [currentAsciiArt, setCurrentAsciiArt] = useState('');
  const githubStats = useGitHubStats();
  const { event } = useGTM();

  useEffect(() => {
    setCurrentAsciiArt(resolvedTheme === 'dark' ? asciiArtBlack : asciiArtWhite);
  }, [resolvedTheme, asciiArtBlack, asciiArtWhite]);

  if (!dictionary) {
    return <SplashScreen isLoading={true} onLoadingFinished={() => {}} />;
  }

  return (
    <>
      <SplashScreen isLoading={loading} onLoadingFinished={() => setLoading(false)} dictionary={dictionary} />
      <div className={`flex flex-col min-h-dvh bg-background text-foreground transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Header dictionary={dictionary.header} lang={lang} />
        
        <main className="flex-1">
          <section 
            className="relative w-full h-[85dvh] flex items-center z-10 overflow-hidden"
          >
            <InteractiveGrid />
            <HeroAsciiArt 
              artContent={currentAsciiArt}
            />

            <div className="container relative px-4 md:px-6 z-10 pointer-events-none">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 w-full">
                <div className="flex flex-col justify-center space-y-4">
                  <AnimatedContent useObserver={true}>
                    <h1 className="text-4xl font-bold font-batman tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-[700px]">
                      {dictionary.hero.title.before}{" "}
                      <span className="block text-primary">
                        <RotatingHighlight 
                          words={dictionary.hero.title.rotatingHighlights} 
                          interval={5000}
                          className="font-bold"
                        />
                      </span>
                      {" "}{dictionary.hero.title.after}
                    </h1>
                  </AnimatedContent>
                  <AnimatedContent useObserver={true} style={{ animationDelay: '100ms' }}>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-body">
                      <span className="text-primary/90">Axulogic</span> {dictionary.hero.description.text1}
                      <span className="text-primary/90">{dictionary.hero.description.highlight}</span> {dictionary.hero.description.text2}
                    </p>
                  </AnimatedContent>
                  <AnimatedContent useObserver={true} style={{ animationDelay: '200ms' }}>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row pointer-events-auto">
                      <Button asChild size="lg">
                        <a 
                          href="https://github.com/Axulogic/Axulogic/blob/main/CONTRIBUTING.md" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => event({
                            action: 'click',
                            category: 'engagement',
                            label: 'contribute_button'
                          })}
                        >
                          {dictionary.hero.cta.contribute}
                          <GitBranch className="ml-2" />
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link 
                          href="#projects"
                          onClick={() => event({
                            action: 'click',
                            category: 'engagement',
                            label: 'explore_projects_button'
                          })}
                        >
                          {dictionary.hero.cta.explore}
                          <Sparkles className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </AnimatedContent>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-4 pointer-events-none">
                <ChevronDown className="h-6 w-6 text-primary/70 animate-bounce" />
            </div>
          </section>

          <section id="core-aims" className="relative w-full py-12 md:py-24 lg:py-32">
            <SciFiDivider />
            <AnimatedContent useObserver={true} className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <Badge>{`// 01_CORE_AIMS`}</Badge>
                  <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">{dictionary.coreAims.title}</h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {dictionary.coreAims.description}
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Card className="hover:border-primary/80 transition-colors duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Atom className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline">{dictionary.coreAims.innovation.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dictionary.coreAims.innovation.description}</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-primary/80 transition-colors duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Gem className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline">{dictionary.coreAims.quality.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dictionary.coreAims.quality.description}</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-primary/80 transition-colors duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Users2 className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline">{dictionary.coreAims.collaboration.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dictionary.coreAims.collaboration.description}</p>
                    </CardContent>
                  </Card>
                  <Card className="hover:border-primary/80 transition-colors duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <GitFork className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline">{dictionary.coreAims.openSource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dictionary.coreAims.openSource.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedContent>
          </section>

        </main>

        <footer className="w-full border-t border-primary/20 bg-background/50 backdrop-blur-sm">
            <AnimatedContent useObserver={true} className="container mx-auto px-4 md:px-6 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <div className="flex items-center gap-2">
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 460 460" 
                                className="transition-all duration-300 hover:scale-110 text-primary"
                                fill="currentColor"
                            >
                                <path d="M0 0 C0.95347775 0.00037972 1.9069555 0.00075944 2.88932651 0.00115067 C4.53351094 -0.00183564 4.53351094 -0.00183564 6.21091121 -0.00488228 C8.03866006 -0.00051328 8.03866006 -0.00051328 9.90333313 0.00394398 C11.18331177 0.00308796 12.4632904 0.00223194 13.78205627 0.00134999 C17.3584182 -0.00090476 20.93475049 0.00313639 24.51110865 0.00812577 C28.4181152 0.01247361 32.32512025 0.0110324 36.23212856 0.01030785 C43.82602698 0.00977485 51.41991363 0.01440513 59.01380902 0.02080918 C67.7924095 0.02799159 76.57100286 0.02880296 85.34960693 0.029594 C108.54138127 0.03485056 131.73315296 0.04881158 154.92492431 0.0616985 C206.71429931 0.0823235 258.50367431 0.1029485 311.86242431 0.1241985 C311.86242431 104.0741985 311.86242431 208.0241985 311.86242431 315.1241985 C282.82242431 315.1241985 253.78242431 315.1241985 223.86242431 315.1241985 C223.86242431 240.2141985 223.86242431 165.3041985 223.86242431 88.1241985 C148.95242431 88.1241985 74.04242431 88.1241985 -3.13757569 88.1241985 C-3.13757569 0.182301 -3.13757569 0.182301 0 0 Z " transform="translate(87.13757568597794,69.8758015036583)"/>
                                <path d="M0 0 C58.74 0 117.48 0 178 0 C178 58.74 178 117.48 178 178 C148.815625 178.020625 119.63125 178.04125 89.5625 178.0625 C80.33095947 178.071604 71.09941895 178.08070801 61.58813477 178.09008789 C50.3572998 178.09460449 50.3572998 178.09460449 45.10777283 178.09544373 C41.42364404 178.09637932 37.73952951 178.10014236 34.05540466 178.10557556 C29.36530452 178.11240141 24.6752253 178.11449736 19.98512065 178.11307228 C18.25808879 178.11337055 16.53105624 178.11537303 14.80402863 178.11921513 C12.48261171 178.12414225 10.16127757 178.12300726 7.83985901 178.12025452 C6.53552194 178.12117631 5.23118486 178.1220981 3.88732243 178.12304783 C1 178 1 178 0 177 C-0.09709071 174.72176255 -0.12186604 172.44044577 -0.12025452 170.16014099 C-0.12111053 169.43825089 -0.12196655 168.71636078 -0.12284851 167.97259521 C-0.12451356 165.5278482 -0.11896418 163.08316856 -0.11352539 160.63842773 C-0.1132193 158.86612735 -0.11335214 157.09382685 -0.11389065 155.32152653 C-0.1141172 150.5583476 -0.10830475 145.7951936 -0.10128021 141.03202057 C-0.09560194 136.56891294 -0.095318 132.1058115 -0.09460449 127.6427002 C-0.08934889 114.57429681 -0.07538785 101.50589809 -0.0625 88.4375 C-0.041875 59.253125 -0.02125 30.06875 0 0 Z " transform="translate(89,205)"/>
                            </svg>
                            <span className="font-code text-sm font-bold tracking-wider text-primary">
                                Axulogic
                            </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <a href="https://github.com/Axulogic" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-primary transition-colors">
                                <Github className="h-4 w-4" />
                                <span>{dictionary.footer.links.github}</span>
                            </a>
                            <a href="https://x.com/Axulogic" className="flex items-center space-x-1 hover:text-primary transition-colors">
                                <Twitter className="h-4 w-4" />
                                <span>{dictionary.footer.links.twitter}</span>
                            </a>
                            <a href="#" className="flex items-center space-x-1 hover:text-primary transition-colors">
                                <Users className="h-4 w-4" />
                                <span>{dictionary.footer.links.community}</span>
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground/70">
                            <span className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span>{dictionary.footer.status.online}</span>
                            </span>
                            <span>•</span>
                            <span>
                                {githubStats.isLoading ? (
                                    <span className="animate-pulse text-primary">...</span>
                                ) : githubStats.error ? (
                                    <span className="text-muted-foreground/50">- {dictionary.footer.status.projects}</span>
                                ) : (
                                    <span className="text-primary font-medium">
                                        {githubStats.organizations}+ {dictionary.footer.status.projects}
                                    </span>
                                )}
                            </span>
                            <span>•</span>
                            <span>
                                {githubStats.isLoading ? (
                                    <span className="animate-pulse text-primary">...</span>
                                ) : githubStats.error ? (
                                    <span className="text-muted-foreground/50">- {dictionary.footer.status.contributors}</span>
                                ) : (
                                    <span className="text-primary font-medium">
                                        {githubStats.followers}+ {dictionary.footer.status.contributors}
                                    </span>
                                )}
                            </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground/60">
                            © {new Date().getFullYear()} Axulogic. {dictionary.footer.copyright}
                        </p>
                    </div>
                </div>
            </AnimatedContent>
        </footer>
      </div>
    </>
  );
}