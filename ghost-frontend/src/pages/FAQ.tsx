import { useState } from "react";
import { VisitorsNavBar } from "../components/VisitorsNavBar";

export default function FAQ() {
    const faqs = [
        {
            id: 1,
            question: "What is Ghost?",
            answer:
                "Ghost is a secure platform that allows users to buy, sell, and transfer game accounts with confidence. We handle the process so you don’t get scammed.",
        },
        {
            id: 2,
            question: "How does Ghost keep transactions safe?",
            answer:
                "We use an escrow-style system where payment is only released once the buyer confirms successful transfer. If not, funds are safely returned.",
        },
        {
            id: 3,
            question: "Can I submit my own guides?",
            answer:
                "Yes! You can submit ownership transfer guides via the Guide page. If approved, we’ll publish it and shout you out on X or TikTok.",
        },
        {
            id: 4,
            question: "I still have questions!",
            answer:
                "No worries — reach out to us anytime at support@ghost.gg and we’ll get back to you.",
        },
    ];

    const [open, setOpen] = useState<number | null>(null);

    const toggle = (id: number) => {
        setOpen(open === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            <VisitorsNavBar />

            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                <p className="text-gray-400 mb-10">
                    Have a question? We’ve got answers. If you don’t see what you’re
                    looking for, contact us at{" "}
                    <span className="text-blue-400">support@ghost.gg</span>.
                </p>

                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const isOpen = open === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className="bg-[#0E1115] rounded-lg shadow-md"
                            >
                                <button
                                    onClick={() => toggle(faq.id)}
                                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium focus:outline-none hover:cursor-pointer"
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-blue-400">{isOpen ? "▲" : "▼"}</span>
                                </button>
                                <div
                                    className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-40 px-4 pb-4" : "max-h-0"}`}
                                >
                                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}