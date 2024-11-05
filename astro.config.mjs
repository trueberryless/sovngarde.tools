import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import starlightBlog from "starlight-blog";
import mdAstro from "@astropub/md";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://sovngarde.tools",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: "🔗" },
        },
      ],
      [rehypeHeadingIds, rehypeAutolinkHeadings],
    ],
  },
  integrations: [
    mdAstro(),
    starlight({
      plugins: [starlightImageZoom(), starlightBlog({
        title: "Blog",
        authors: {
          "openscribbler": {
            name: "OpenScribbler",
            title: "Lead Tech Writer & Dev",
            picture: "https://avatars.githubusercontent.com/u/159678129",
            url: "https://github.com/openscribbler"
          },
        },
      })],
      title: "Sovngarde Tools",
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/light-logo.svg",
      },
      editLink: {
        baseUrl: "https://github.com/OpenScribbler/sovngarde.tools/edit/main/",
      },
      customCss: [
        // Path to your Tailwind base styles:
        "./src/tailwind.css",
      ],
      social: {
        github: "https://github.com/OpenScribbler/sovngarde.tools",
      },
      sidebar: [
        {
          label: "Tools",
          link: "/tools-overview",
        },
        {
          label: "xEdit",
          collapsed: true,
          items: [
            {
              label: "Overview",
              link: "xedit/overview",
            },
            {
              label: "Release Notes",
              link: "xedit/release-notes",
            },
            {
              label: "Concepts",
              collapsed: true,
              items: [
                {
                  label: "Records",
                  link: "xedit/concept-records",
                },
                {
                  label: "Overrides",
                  link: "xedit/concept-overrides",
                },
              ],
            },
          ],
        },
        {
          label: "Mod Organizer 2",
          collapsed: true,
          items: [
            {
              label: "Overview",
              link: "mo2/mo2-overview",
            },
            {
              label: "Release Notes",
              link: "mo2/mo2-release-notes",
            },
          ],
          autogenerate: {
            directory: "mo2",
          },
        },
        {
          label: "Reference",
          collapsed: true,
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "About",
          link: "/about",
        },
      ],
      // Set English as the default language for this site.
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        de: {
          label: "Deutsch",
        },
        "pt-br": {
          label: "Português do Brasil",
          lang: "pt-BR",
        },
        es: {
          label: "Español",
        },
        "zh-cn": {
          label: "简体中文",
          lang: "zh-CN",
        },
        "zh-TW": {
          label: "正體中文",
          lang: "zh-TW",
        },
        fr: {
          label: "Français",
        },
        hi: {
          label: "हिन्दी",
        },
        ar: {
          label: "العربية",
          dir: "rtl",
        },
        ja: {
          label: "日本語",
        },
        ko: {
          label: "한국어",
        },
        pl: {
          label: "Polski",
        },
        ru: {
          label: "Русский",
        },
        it: {
          label: "Italiano",
        },
      },
      components: {
          MarkdownContent: "./src/components/MarkdownContent.astro",
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
});
