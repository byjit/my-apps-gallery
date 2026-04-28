import { FaGithub, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const ALL_TAGS_VALUE = "__all__";

const SOCIAL_LINKS = [
	{
		label: "X (Twitter)",
		href: "https://x.com/jit_infinity",
		icon: <FaXTwitter className="h-4 w-4" />,
	},
	{
		label: "GitHub",
		href: "https://github.com/prasanjit101",
		icon: <FaGithub className="h-4 w-4" />,
	},
	{
		label: "YouTube",
		href: "https://www.youtube.com/@prasanjit-dutta",
		icon: <FaYoutube className="h-4 w-4" />,
	},
	{
		label: "Email",
		href: "mailto:prasanjitdutta45@gmail.com",
		icon: <MdEmail className="h-4 w-4" />,
	},
];

type AboutPanelProps = {
	tags: string[];
	selectedTag: string | null;
	onTagChange: (tag: string | null) => void;
};

/**
 * Left-side panel: short bio + tag filter for the gallery on the right.
 * Sticks to the viewport on large screens so the gallery scrolls beside it.
 */
export function AboutPanel({
	tags,
	selectedTag,
	onTagChange,
}: AboutPanelProps) {
	return (
		<aside className="flex flex-col gap-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:py-12 lg:pr-2">
			<div className="flex items-center justify-between">
				<Logo showText />
				<ThemeSwitcher />
			</div>

			<div className="space-y-4">
				<h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
					Hey, I'm Jit.
				</h1>
				<p className="text-muted-foreground leading-relaxed">
					I like helping people and build things for impact. This page collects
					some of the beautiful and useful things I have crafted for others to
					use - click any card to read the full story or jump straight to the
					live app.
				</p>
			</div>

			<div className="space-y-2">
				<label
					className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
					htmlFor="tag-filter"
				>
					Filter by tag
				</label>
				<Select
					onValueChange={(value) =>
						onTagChange(value === ALL_TAGS_VALUE ? null : value)
					}
					value={selectedTag ?? ALL_TAGS_VALUE}
				>
					<SelectTrigger className="w-full" id="tag-filter">
						<SelectValue placeholder="All tags" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={ALL_TAGS_VALUE}>All tags</SelectItem>
						{tags.map((tag) => (
							<SelectItem key={tag} value={tag}>
								{tag}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center gap-3">
				{SOCIAL_LINKS.map(({ label, href, icon }) => (
					<a
						aria-label={label}
						className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
						href={href}
						key={label}
						rel="noopener noreferrer"
						target="_blank"
					>
						{icon}
					</a>
				))}
			</div>
			<div>
				<p>If you need projects built:</p>
				<a
					className="text-sm text-primary"
					href="https://wizardsbuild.com"
					rel="noopener"
					target="_blank"
				>
					https://wizardsbuild.com
				</a>
			</div>
		</aside>
	);
}
