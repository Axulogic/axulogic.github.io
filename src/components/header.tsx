"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Menu, X, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { Locale } from "@/i18n-config";

type Dictionary = {
  docs: string;
  projects: string;
  contribute: string;
};

export function Header({
  dictionary,
  lang,
}: {
  dictionary: Dictionary;
  lang: Locale;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { href: string; label: string; icon: JSX.Element }[] = [];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300 bg-background/80 backdrop-blur-lg"
      )}
    >
        <div className="container relative flex h-14 items-center px-4 md:px-6">
            <div className="flex-1 flex items-center justify-start">
              <Link href={`/${lang}`} className="flex items-center gap-2 font-code text-lg font-bold tracking-widest uppercase transition-colors hover:text-primary group">
                  <div className="relative">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 460 460" 
                      className="transition-all duration-300 group-hover:scale-110"
                      fill="currentColor"
                    >
                      <path d="M0 0 C0.95347775 0.00037972 1.9069555 0.00075944 2.88932651 0.00115067 C4.53351094 -0.00183564 4.53351094 -0.00183564 6.21091121 -0.00488228 C8.03866006 -0.00051328 8.03866006 -0.00051328 9.90333313 0.00394398 C11.18331177 0.00308796 12.4632904 0.00223194 13.78205627 0.00134999 C17.3584182 -0.00090476 20.93475049 0.00313639 24.51110865 0.00812577 C28.4181152 0.01247361 32.32512025 0.0110324 36.23212856 0.01030785 C43.82602698 0.00977485 51.41991363 0.01440513 59.01380902 0.02080918 C67.7924095 0.02799159 76.57100286 0.02880296 85.34960693 0.029594 C108.54138127 0.03485056 131.73315296 0.04881158 154.92492431 0.0616985 C206.71429931 0.0823235 258.50367431 0.1029485 311.86242431 0.1241985 C311.86242431 104.0741985 311.86242431 208.0241985 311.86242431 315.1241985 C282.82242431 315.1241985 253.78242431 315.1241985 223.86242431 315.1241985 C223.86242431 240.2141985 223.86242431 165.3041985 223.86242431 88.1241985 C148.95242431 88.1241985 74.04242431 88.1241985 -3.13757569 88.1241985 C-3.13757569 0.182301 -3.13757569 0.182301 0 0 Z " transform="translate(87.13757568597794,69.8758015036583)"/>
                      <path d="M0 0 C58.74 0 117.48 0 178 0 C178 58.74 178 117.48 178 178 C148.815625 178.020625 119.63125 178.04125 89.5625 178.0625 C80.33095947 178.071604 71.09941895 178.08070801 61.58813477 178.09008789 C50.3572998 178.09460449 50.3572998 178.09460449 45.10777283 178.09544373 C41.42364404 178.09637932 37.73952951 178.10014236 34.05540466 178.10557556 C29.36530452 178.11240141 24.6752253 178.11449736 19.98512065 178.11307228 C18.25808879 178.11337055 16.53105624 178.11537303 14.80402863 178.11921513 C12.48261171 178.12414225 10.16127757 178.12300726 7.83985901 178.12025452 C6.53552194 178.12117631 5.23118486 178.1220981 3.88732243 178.12304783 C1 178 1 178 0 177 C-0.09709071 174.72176255 -0.12186604 172.44044577 -0.12025452 170.16014099 C-0.12111053 169.43825089 -0.12196655 168.71636078 -0.12284851 167.97259521 C-0.12451356 165.5278482 -0.11896418 163.08316856 -0.11352539 160.63842773 C-0.1132193 158.86612735 -0.11335214 157.09382685 -0.11389065 155.32152653 C-0.1141172 150.5583476 -0.10830475 145.7951936 -0.10128021 141.03202057 C-0.09560194 136.56891294 -0.095318 132.1058115 -0.09460449 127.6427002 C-0.08934889 114.57429681 -0.07538785 101.50589809 -0.0625 88.4375 C-0.041875 59.253125 -0.02125 30.06875 0 0 Z " transform="translate(89,205)"/>
                    </svg>
                    <div className="absolute inset-0 bg-primary/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  Axulogic
              </Link>
            </div>
            
            <div className="md:hidden">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                  {isMenuOpen ? <X /> : <Menu />}
                  <span className="sr-only">Toggle menu</span>
              </Button>
            </div>

            <nav className="hidden md:flex items-center justify-center space-x-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex flex-1 items-center justify-end">
              <div className="flex items-center justify-end space-x-3">
                <LocaleSwitcher />
                <ThemeToggle />
                <Button variant="outline">
                    {dictionary.contribute}
                </Button>
              </div>
            </div>
        </div>
        
        {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-lg pb-4">
                <nav className="flex flex-col items-center space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                    <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                        {dictionary.contribute}
                    </Button>
                    <div className="flex items-center justify-center space-x-2 pt-4">
                        <LocaleSwitcher />
                        <ThemeToggle />
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/Axulogic" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" onClick={() => setIsMenuOpen(false)}>
                                <Github className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                </nav>
            </div>
        )}
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </header>
  );
}