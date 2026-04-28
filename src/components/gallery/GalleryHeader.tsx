import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/theme-switcher";

/**
 * Top bar shown across every public page. Logo links back to the gallery,
 * theme switcher on the right.
 */
export function GalleryHeader() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<Link className="flex items-center" to="/">
					<Logo showText />
				</Link>
				<ThemeSwitcher />
			</div>
		</header>
	);
}
