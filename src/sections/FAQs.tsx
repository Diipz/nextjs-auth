"use client"

import { useState } from "react";
import PlusIcon from "../assets/plus.svg"
import MinusIcon from "../assets/minus.svg"
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const items = [
    {
        id: 1,
        question: "What payment methods do you accepts?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum distinctio facere ex cum. Nam magnam corrupti optio alias eius.",
    },
    {
        id: 2,
        question: "How does the pricing work for teams",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum distinctio facere ex cum",
    },
    {
        id: 3,
        question: "Can I change my plan later?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum distinctio facere ex cum",
    },
    {
        id: 4,
        question: "Is my data secure?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum distinctio facere ex cum",
    }
];

const AccordianItem = ({ question, answer }: { question: string, answer: string }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-7 border-b max-w-[400px] md:max-w-[720px] lg:max-w-[1038px] mx-auto border-white/30" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center">
                <span className="flex-1 text-lg font-bold">{question}</span>
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
        <div className="bg-black text-white bg-gradient-to-b from-[#5D2CA8] to-black py-[72px] sm:py-24 px-4">
            <div className="container">
                <h2 className="text-center font-bold text-5xl sm:text-6xl sm:max-w-[720px] lg:max-w-[1038px] mx-auto tracking-tighter">Frequently asked questions</h2>
            </div>
            <div className="mt-12 max-w-[720px] lg:max-w-[1038px] mx-auto">
                {items.map(({ id, question, answer }) => (
                    <AccordianItem key={id} question={question} answer={answer} />
                ))}
            </div>
        </div>
    )
}
