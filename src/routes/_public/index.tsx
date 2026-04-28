import { createFileRoute } from "@tanstack/react-router";
import { allApps } from "content-collections";
import { AppGrid } from "@/components/gallery/AppGrid";

export const Route = createFileRoute("/_public/")({
	component: GalleryPage,
});

function GalleryPage() {
	// Newest first — the gallery is curated chronologically.
	const apps = [...allApps].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return (
		<div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
			<section className="mb-10 sm:mb-14">
				<h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
					Apps & Tools
				</h1>
				<p className="mt-3 max-w-2xl text-muted-foreground">
					A gallery of products and free lead-generation tools I've built.
					Click any card to learn more, or jump straight to the live app.
				</p>
			</section>
			<AppGrid apps={apps} />
		</div>
	);
}
