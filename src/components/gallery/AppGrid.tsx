import type { App } from "content-collections";
import { AppCard } from "./AppCard";

type AppGridProps = {
	apps: App[];
};

export function AppGrid({ apps }: AppGridProps) {
	if (apps.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
				No apps to show yet.
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{apps.map((app, index) => (
				<AppCard app={app} index={index} key={app.slug} />
			))}
		</div>
	);
}
