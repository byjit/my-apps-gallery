export const SocialProof = () => {
	const companies = [
		{ name: "DUNHAM & CO.", style: "font-serif font-bold" },
		{ name: "2020INC", style: "font-bold tracking-tighter" },
		{ name: "Pipelinx", style: "font-bold italic" },
		{ name: "BEEM", style: "font-bold" },
		{ name: "Ephicient", style: "font-mono font-bold" },
	];

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Section ID
		<section
			className="py-12 border-y border-border bg-muted/30"
			id="testimonials"
		>
			<div className="container mx-auto px-4">
				<p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
					Trusted by innovative teams worldwide
				</p>
				<div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale transition-all duration-500 hover:grayscale-0">
					{companies.map((company) => (
						<span
							className={`text-xl md:text-2xl ${company.style}`}
							key={company.name}
						>
							{company.name}
						</span>
					))}
				</div>
			</div>
		</section>
	);
};
