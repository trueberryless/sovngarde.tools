import { z, defineCollection, reference } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { blogSchema } from "starlight-blog/schema";

const docs = defineCollection({
  schema: docsSchema({
    extend: blogSchema().extend({
      title: z
        .string()
        .max(80, { message: "Title must be 60 characters or less." }),
      description: z
        .string()
        .max(180, { message: "Description must be 160 characters or less." })
        .optional(),
      category: z
        .enum([
          "blog-post",
          "concept",
          "guide",
          "howto",
          "reference",
          "release-notes",
          "splash",
          "troubleshoot",
          "tool",
          "tutorial",
        ])
        .optional(),
    }),
  }),
});

const developers = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    type: z.enum(["individual", "team"]),
    iconUrl: z.string().optional(),
    sourceCodeProfile: z.string().url().optional(),
    donateUrl: z.string().url().array().optional(),
    tools: z.array(reference("tools")).optional(),
  }),
});

const games = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      nexusModsPage: z.string().url().optional(),
      latestVer: z.string().optional(),
      logo: image().optional(),
      label: z.string(),
    }),
});

const i18n = defineCollection({
  type: "data",
  schema: i18nSchema(),
});

const terms = defineCollection({
  type: "data",
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    altTerm: z.array(z.string()).optional(),
    acronym: z.string().optional(),
    tools: z.array(reference("tools").optional()),
    games: z.array(reference("games").optional()),
  }),
});

const tools = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      toolName: z.string(),
      category: z
        .enum([
          "animation",
          "mesh-texture",
          "mod-framework",
          "mod-manager",
          "mod-resource",
          "performance",
          "scripting",
          "skse-plugin",
          "troubleshooting",
          "utility",
        ])
        .optional(),
      sourceCodeURL: z.string().url(),
      nexusModsPage: z.string().url().optional(),
      nexusModsPath: z.string().optional(),
      discord: z.string().url().optional(),
      developer: z.array(reference("developers")).optional(),
      games: z.array(reference("games")).optional(),
      downloadPage: z.string().url().optional(),
      logo: image().optional(),
    }),
});

export const collections = {
  developers: developers,
  docs: docs,
  games: games,
  i18n: i18n,
  terms: terms,
  tools: tools,
};
