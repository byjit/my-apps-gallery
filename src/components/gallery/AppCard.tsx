import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import type { App } from "content-collections";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AppCardProps = {
	app: App;
	/** index in the grid — used to stagger the entrance animation */
	index?: number;
};

/**
 * Single tile in the apps gallery. The image is the primary visual; the
 * footer holds an "Open" CTA that navigates to the full product page.
 */
export function AppCard({ app, index = 0 }: AppCardProps) {
	return (
		<Card
			className="group/app-card transition-all duration-300 hover:-translate-y-1 hover:ring-foreground/30 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
			style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
		>
			<img
				alt={app.title}
				src={app.image}
				className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover/app-card:scale-[1.03]"
				loading="lazy"
			/>
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
				<CardDescription className="line-clamp-2">
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
				<Button asChild size="icon" variant="outline" aria-label="Visit site">
					<a href={app.link} rel="noopener noreferrer" target="_blank">
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</Button>
			</CardFooter>
		</Card>
	);
}
