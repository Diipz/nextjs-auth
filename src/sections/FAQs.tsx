"use client"

import { useState } from "react";
import PlusIcon from "../../public/assets/plus.svg"
import MinusIcon from "../../public/assets/minus.svg"
import { motion, AnimatePresence } from "framer-motion";

const items = [
    {
        id: 1,
        question: "Why choose you?",
        answer: "Our platform offers organisations the flexibility to select and negotiate fees directly with pharmacists they consider best suited to their needs. Experienced pharmacists oversee the rigorous recruitment process ensuring that only the most qualified and accomplished professionals are placed in your organisation. We pride ourselves on discovering pharmacists that gravitate towards excellence",
    },
    {
        id: 2,
        question: "Who can sign up?",
        answer: "An NHS-registered general practice or primary care network can sign-up by selecting the register button and completing the form using a valid NHS email address. Upon submission, you will receive an activation email to finalise the registration process.",
    },
    {
        id: 3,
        question: "How does billing work?",
        answer: "Billing is handled on an annual subscription basis and your organisation will be billed for the full year upfront. Organisations benefit from the flexibility of unlimited scheduling, making it a more cost-effective those requiring long-term coverage. Renewal occurs automatically at the end of each subscription term unless you choose to cancel. We will notify you before your renewal date to confirm any updates or changes to your plan.",
    },
    {
        id: 4,
        question: "What if I change my mind?",
        answer: "Refunds can be requested by contacting customer support at apothetory@protonmail.com. Please reach out to our support team to initiate the process, and they will assist you with the refund request according to our policy",
    },
    {
        id: 5,
        question: "Is my data secure?",
        answer: "Our platform employs advanced encryption and security measures to protect your information. We adhere to strict data protection standards and regularly review our security protocols to ensure the highest level of security and compliance with industry regulations",
    }
];

const AccordianItem = ({ question, answer }: { question: string, answer: string }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-7 border-b max-w-[400px] md:max-w-[720px] lg:max-w-[1038px] mx-auto border-white/30" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center">
                <span className="flex-1 text-lg md:font-bold font-medium">{question}</span>
                {isOpen ? <MinusIcon /> : <PlusIcon />}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="text-white/70"
                        initial={{
                            opacity: 0,
                            height: 0,
                            marginTop: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: "16px"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            marginTop: 0
                        }}
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQs() {
    return (
        <section id="faq-section" className="bg-black text-white bg-gradient-to-b from-[#5D2CA8] to-black py-[72px] sm:py-24 px-4">
            <div className="container">
                <h2 className="text-center md:font-bold font-medium text-5xl md:text-6xl sm:max-w-[720px] lg:max-w-[1038px] mx-auto tracking-tighter">Frequently asked questions</h2>
            </div>
            <div className="mt-12 max-w-[720px] lg:max-w-[1038px] mx-auto">
                {items.map(({ id, question, answer }) => (
                    <AccordianItem key={id} question={question} answer={answer} />
                ))}
            </div>
        </section>
    )
}
