import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ name: "Features", href: "#features" },
		{ name: "Testimonials", href: "#testimonials" },
		{ name: "FAQ", href: "#faq" },
	];

	return (
		<header>
			<div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Logo showText />
				</div>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navItems.map((item) => (
						<a className="text-sm font-medium" href={item.href} key={item.name}>
							{item.name}
						</a>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-4">
					<Button size="sm">Get Started</Button>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="flex items-center gap-2 md:hidden">
					<Button
						aria-label="Toggle Menu"
						onClick={() => setIsOpen(!isOpen)}
						size="icon"
						variant="ghost"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden border-b border-border bg-background">
					<div className="container mx-auto px-4 py-4 flex flex-col gap-4">
						{navItems.map((item) => (
							<a
								className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
								href={item.href}
								key={item.name}
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</a>
						))}
						<div className="pt-2">
							<Button className="w-full rounded-full" size="lg">
								Get Started
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};
