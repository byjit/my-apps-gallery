import { Link } from "@tanstack/react-router";
import type { App } from "content-collections";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type AppCardProps = {
	app: App;
	/** index in the grid — used to stagger the entrance animation */
	index?: number;
};

/** ms between screenshot transitions while the card is hovered */
const SCREENSHOT_INTERVAL_MS = 1600;

/**
 * Single tile in the apps gallery. The image is the primary visual; the
 * footer holds an "Open" CTA that navigates to the full product page.
 *
 * On hover, if the app has screenshots, the visual cycles through
 * `[image, ...screenshots]` with a crossfade — giving a quick preview of
 * the product without leaving the gallery.
 */
export function AppCard({ app, index = 0 }: AppCardProps) {
	// Build a deduped image list: hero first, then any extra screenshots.
	const images = useMemo(() => {
		const all = [app.image, ...(app.screenshots ?? [])];
		return Array.from(new Set(all));
	}, [app.image, app.screenshots]);

	const [activeIndex, setActiveIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	// Cycle through images while hovered; reset to the hero on leave.
	useEffect(() => {
		if (!isHovering || images.length <= 1) return;
		const id = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, SCREENSHOT_INTERVAL_MS);
		return () => window.clearInterval(id);
	}, [isHovering, images.length]);

	useEffect(() => {
		if (!isHovering) setActiveIndex(0);
	}, [isHovering]);

	return (
		<Card
			className="group/app-card pt-0 transition-all duration-300 hover:-translate-y-1 hover:ring-foreground/30 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
		>
			<div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
				{images.map((src, i) => (
					<img
						alt={app.title}
						aria-hidden={i === activeIndex ? undefined : true}
						className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover/app-card:scale-[1.03] ${
							i === activeIndex
								? "opacity-100 scale-100"
								: "opacity-0 scale-[1.02]"
						}`}
						height={720}
						key={src}
						loading="lazy"
						src={src}
						width={1280}
					/>
				))}
				{images.length > 1 && (
					<div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 opacity-0 transition-opacity duration-300 group-hover/app-card:opacity-100">
						{images.map((src, i) => (
							<span
								className={`h-1 rounded-full bg-white/80 transition-all duration-300 ${
									i === activeIndex ? "w-4" : "w-1.5 bg-white/40"
								}`}
								key={src}
							/>
						))}
					</div>
				)}
			</div>
			<CardHeader>
				<div className="flex items-start justify-between gap-2">
					<div className="flex flex-wrap gap-1.5">
						{app.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
					<span className="shrink-0 text-xs text-muted-foreground">
						{format(app.date, "MMM yyyy")}
					</span>
				</div>
				<CardTitle className="text-lg">{app.title}</CardTitle>
				<CardDescription className="line-clamp-6">
					{app.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1" />
			<CardFooter className="gap-2">
				<Button asChild className="flex-1" variant="default">
					<Link params={{ slug: app.slug }} to="/apps/$slug">
						Open
					</Link>
				</Button>
				<Button aria-label="Visit site" asChild size="icon" variant="outline">
					<a href={app.link} rel="noopener noreferrer" target="_blank">
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</Button>
			</CardFooter>
		</Card>
	);
}
