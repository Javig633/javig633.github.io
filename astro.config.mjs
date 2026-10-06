// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeCallouts from 'rehype-callouts';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://javig633.github.io",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    rehypePlugins: [rehypeCallouts],
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
  },
  integrations: [mdx(), sitemap()]
});