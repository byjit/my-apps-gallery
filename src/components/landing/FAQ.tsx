import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "What is an AI agent?",
		answer:
			"An AI agent is an autonomous software program that can perceive its environment, reason about how to achieve goals, and take actions to accomplish those goals without constant human intervention.",
	},
	{
		question: "How is this different from ChatGPT?",
		answer:
			"While ChatGPT is a chat interface, our agents are designed to execute tasks. They can access your tools, databases, and APIs to perform real work, not just answer questions.",
	},
	{
		question: "Is my data secure?",
		answer:
			"Yes, security is our top priority. We use bank-grade encryption for data in transit and at rest. We are SOC2 Type II compliant and never train our models on your data without explicit permission.",
	},
];

export const FAQ = () => {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: Section ID
		<section className="py-32 bg-background" id="faq">
			<div className="container mx-auto px-4 max-w-3xl">
				<div className="text-center mb-16">
					<h2 className="text-2xl font-semibold mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-sm text-muted-foreground">
						Everything you need to know about our platform.
					</p>
				</div>

				<Accordion className="w-full" collapsible type="single">
					{faqs.map((faq, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static list
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className="text-left">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground text-base">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};
