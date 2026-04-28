import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allApps } from "content-collections";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/apps/$slug")({
	loader: ({ params }) => {
		const app = allApps.find((entry) => entry.slug === params.slug);
		if (!app) {
			throw notFound();
		}
		return { app };
	},
	component: AppDetailPage,
});

function AppDetailPage() {
	const { app } = Route.useLoaderData();

	return (
		<article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
			<Link
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				to="/"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to gallery
			</Link>

			<header className="mb-10">
				<div className="mb-4 flex flex-wrap items-center gap-2">
					{app.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
					<span className="ml-1 text-sm text-muted-foreground">
						{format(app.date, "MMMM d, yyyy")}
					</span>
				</div>
				<h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
					{app.title}
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">{app.description}</p>

				<div className="mt-6 flex flex-wrap gap-3">
					<Button asChild>
						<a href={app.link} rel="noopener noreferrer" target="_blank">
							Visit app
							<ArrowUpRight className="ml-1 h-4 w-4" />
						</a>
					</Button>
					{app.links?.map((link) => (
						<Button asChild key={link.url} variant="outline">
							<a href={link.url} rel="noopener noreferrer" target="_blank">
								{link.label}
								<ArrowUpRight className="ml-1 h-4 w-4" />
							</a>
						</Button>
					))}
				</div>
			</header>

			<img
				alt={app.title}
				className="mb-10 w-full rounded-2xl ring-1 ring-foreground/10"
				src={app.image}
			/>

			<div className="prose prose-neutral dark:prose-invert max-w-none">
				<MDXContent code={app.mdx} />
			</div>

			{app.screenshots && app.screenshots.length > 0 && (
				<section className="mt-12">
					<h2 className="mb-4 font-heading text-xl font-semibold">
						Screenshots
					</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{app.screenshots.map((src) => (
							<img
								alt={`${app.title} screenshot`}
								className="w-full rounded-xl ring-1 ring-foreground/10"
								key={src}
								src={src}
							/>
						))}
					</div>
				</section>
			)}
		</article>
	);
}
