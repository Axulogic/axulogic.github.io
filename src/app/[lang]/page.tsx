
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import fs from 'fs/promises';
import path from 'path';
import { PageClient } from "@/components/page-client";

async function getAsciiContent(filename: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filename);
    return await fs.readFile(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading ASCII file ${filename}:`, error);
    return '';
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const asciiArtBlack = await getAsciiContent('ascii-black.txt');
  const asciiArtWhite = await getAsciiContent('ascii-white.txt');
  const asciiIcon = await getAsciiContent('ascii-icon.txt');

  return (
    <PageClient
      lang={lang}
      dictionary={dictionary}
      asciiArtBlack={asciiArtBlack}
      asciiArtWhite={asciiArtWhite}
      asciiIcon={asciiIcon}
    />
  );
}
