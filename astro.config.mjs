// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeCallouts from 'rehype-callouts';
import sitemap from '@astrojs/sitemap';
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://javig633.github.io",

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: false,
    },
  },
});