"use client"

import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import CrossIcon from "@/assets/x.svg";
import StyledSignInButton from "@/app/components/StyledSignInButton";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

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
                            <a className="text-white/70 hover:text-white transition" href="#">About</a>
                            <a className="text-white/70 hover:text-white transition" href="#">Features</a>
                            <a className="text-white/70 hover:text-white transition" href="#">Updates</a>
                            <a className="text-white/70 hover:text-white transition" href="#">Help</a>
                        </nav>
                    </div>
                    <div className="flex gap-4 items-center">
                        <StyledSignInButton>Join waitlist</StyledSignInButton>
                        <button
                            className="md:hidden flex justify-center items-center w-8 h-8 rounded-full"
                            onClick={handleDropdownToggle}
                        >
                            {dropdownOpen ? <CrossIcon className="w-6 h-6" /> : <MenuIcon className="w-8 h-8" />}
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
                                                href="#"
                                            >
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#"
                                            >
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#"
                                            >
                                                Updates
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-2 px-4 hover:bg-[#4a208a]/75 transition rounded-md"
                                                href="#"
                                            >
                                                Help
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

