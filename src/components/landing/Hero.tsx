import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Hero = () => {
	return (
		<section className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-28">
			<div className="container mx-auto px-4 text-center">
				<div className="max-w-xl mx-auto space-y-8">
					<div className="flex justify-center mb-6">
						<Badge variant="secondary">Coming soon</Badge>
					</div>

					<h1 className="text-5xl font-semibold tracking-tight mb-6 max-w-lg mx-auto">
						Automate your workflow, super fast
					</h1>

					<p className="text-muted-foreground text-lg mb-6">
						Stop wasting time on repetitive tasks. Let our AI agents handle the
						busywork so you can focus on creativity and strategy.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button size={"lg"}>
							Start Building Free
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Hero Image/Video Placeholder */}
				<div className="mt-24 mb-12 relative mx-auto max-w-5xl rounded-xl border bg-background/50 shadow-2xl overflow-hidden">
					<div className="aspect-video bg-muted/50 flex items-center justify-center">
						<img
							alt="Dashboard Preview"
							className="w-full h-full object-cover"
							height={1080}
							src="https://res.cloudinary.com/dz8mikz3h/image/upload/v1755173210/thumbnail_noa_demo_kfkmyn.png"
							width={1920}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
