"use client"

import LogoIcon from "../../public/assets/logo.svg";
import MenuIcon from "../../public/assets/icon-menu.svg";
import CrossIcon from "../../public/assets/x.svg";
import StyledButton from "@/app/components/StyledButton";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLButtonElement>(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const handleResize = () => {
            setDropdownOpen(false);
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);



    return (
        <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
            <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
            <div className="container">
                <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
                    <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
                    <div>
                        <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
                            <LogoIcon className="h-8 w-8" />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <nav className="flex gap-8 text-sm">
                            <a className="text-white/70 hover:text-white transition" href="#about-section">About</a>
                            <a className="text-white/70 hover:text-white transition" href="#product-section">Interface</a>
                            <a className="text-white/70 hover:text-white transition" href="#faq-section">FAQ</a>
                            <a className="text-white/70 hover:text-white transition" href="#contact-section">Contact</a>
                        </nav>
                    </div>
                    <div className="flex gap-4 items-center">
                        <StyledButton text={"Register"} link={"/auth/signup"}></StyledButton>
                        <StyledButton text={"Sign In"} link={"/auth/signin"}></StyledButton>
                        <button
                            className="md:hidden flex justify-center w-8 h-8 rounded-full"
                            onClick={handleDropdownToggle}
                            ref={dropdownRef}
                        >
                            {dropdownOpen ? <CrossIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
                        </button>
                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    className="absolute bg-white/10 backdrop-blur rounded-lg top-full right-0 w-40"
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                        padding: 0
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: "192px",
                                        padding: "16px"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                        padding: 0
                                    }}
                                >
                                    <ul>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#about-section"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#product-section"
                                            >
                                                Interface
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#faq-section"
                                            >
                                                FAQ
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#contact-section"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header >
    )
}

