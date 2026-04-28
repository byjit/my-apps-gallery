import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { SocialProof } from "@/components/landing/SocialProof";

export const Route = createFileRoute("/_landing/")({
	component: Index,
});

function Index() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen font-sans">
				<Hero />
				<SocialProof />
				<FAQ />
				<Footer />
			</div>
		</>
	)
}
