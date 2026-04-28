import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
