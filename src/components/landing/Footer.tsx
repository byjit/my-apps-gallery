export const Footer = () => {
	return (
		<footer className="border-t border-border/40 py-12 bg-background">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					<p className="text-sm">
						© {new Date().getFullYear()} Your Company. All rights reserved.
					</p>

					<nav className="flex items-center gap-8">
						{[
							{ href: "#features", label: "Features" },
							{ href: "#testimonials", label: "Testimonials" },
							{ href: "#faq", label: "FAQ" },
						].map(({ href, label }) => (
							<a className="text-sm" href={href} key={href}>
								{label}
							</a>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
};
