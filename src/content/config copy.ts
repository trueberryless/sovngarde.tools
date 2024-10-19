import { z, defineCollection, reference } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  i18n: defineCollection({ type: "data", schema: i18nSchema() }),
  // docs content is extended from the Starlight theme
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        title: z
          .string()
          .max(80, { message: "Title must be 60 characters or less." }),
        description: z
          .string()
          .max(180, { message: "Description must be 160 characters or less." }),
        category: z
          .enum([
            "concept",
            "guide",
            "howto",
            "reference",
            "splash",
            "troubleshoot",
            "tool",
            "tutorial",
          ])
          .optional(),
        tool: z.string().optional(),
      }),
    }),
  }),
  tools: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        githubUrl: z.string().url().optional(),
        githubReleases: z.string().url().optional(),
        githubIssues: z.string().url().optional(),
        discord: z.string().url().optional(),
        latestVer: z.string().optional(),
        developers: z.array(reference("developers")).optional(),
        games: z.array(reference("games")).optional(),
        downloadPage: z.string().url().optional(),
        logo: image(),
      }),
  }),
  developers: defineCollection({
    type: "data",
    schema: z.object({
      name: z.string(),
      iconUrl: z.string().optional(),
      githubProfile: z.string().url().optional(),
      donateUrl: z.string().url().array().optional(),
      tools: z.array(reference("tools")).optional(),
    }),
  }),
  games: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        nexusModsPage: z.string().url().optional(),
        latestVer: z.string().optional(),
        logo: image().optional(),
        label: z.string(),
      }),
  }),
  mods: defineCollection({
    type: "data",
    schema: z.object({
      modName: z.string(),
      URL: z.string().url(),
      dev: reference("developers"),
      latestVer: z.string().optional(),
    }),
  }),
  terms: defineCollection({
    type: "data",
    schema: z.object({
      term: z.string(),
      acronym: z.string().optional(),
      definition: z.string(),
      tools: z.array(reference("tools").optional()),
      games: z.array(reference("games").optional()),
    }),
  }),
};
