import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

// Apps collection: each MDX file under `src/content/apps` represents an app
// or lead-generation tool shown in the gallery. Frontmatter drives the card
// (title, description, tags, image, link, date) while the MDX body is
// rendered on the full product detail page.
const apps = defineCollection({
	name: "apps",
	directory: "src/content/apps",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
		image: z.string(),
		link: z.string().url(),
		date: z.coerce.date(),
		screenshots: z.array(z.string()).optional(),
		links: z
			.array(z.object({ label: z.string(), url: z.string().url() }))
			.optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document);
		// `_meta.path` is the file path relative to the collection root without
		// extension — perfect as a stable URL slug for the detail page.
		const slug = document._meta.path;
		return { ...document, mdx, slug };
	},
});

export default defineConfig({
	content: [apps],
});
