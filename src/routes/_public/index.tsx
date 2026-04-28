import { createFileRoute } from "@tanstack/react-router";
import { allApps } from "content-collections";
import { useMemo, useState } from "react";
import { AboutPanel } from "@/components/gallery/AboutPanel";
import { AppGrid } from "@/components/gallery/AppGrid";

export const Route = createFileRoute("/_public/")({
	component: GalleryPage,
});

function GalleryPage() {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	// Sort newest-first once; derived data (tag list, filtered apps) flows from this.
	const sortedApps = useMemo(
		() =>
			[...allApps].sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			),
		[]
	);

	const tags = useMemo(() => {
		const set = new Set<string>();
		for (const app of sortedApps) {
			for (const tag of app.tags) set.add(tag);
		}
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [sortedApps]);

	const filteredApps = useMemo(
		() =>
			selectedTag
				? sortedApps.filter((app) => app.tags.includes(selectedTag))
				: sortedApps,
		[sortedApps, selectedTag]
	);

	return (
		<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[20rem_1fr] lg:gap-20 lg:py-0">
			<AboutPanel
				onTagChange={setSelectedTag}
				selectedTag={selectedTag}
				tags={tags}
			/>
			<section className="lg:py-12">
				<AppGrid apps={filteredApps} />
			</section>
		</div>
	);
}
