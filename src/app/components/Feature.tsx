"use client"

import { useEffect, useRef } from "react";
import EcosystemIcon from "../../../public/assets/ecosystem.svg";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function Feature({ title, description }: { title: string, description: string }) {

    const offsetX = useMotionValue(-100);
    const offsetY = useMotionValue(-100);
    const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent`
    const border = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (!border.current) return;
            const borderRect = border.current?.getBoundingClientRect();
            offsetX.set(e.x - borderRect.x);
            offsetY.set(e.y - borderRect.y);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        }
    }, [offsetX, offsetY]);

    return (
        <div className="border border-white/30 px-5 md:py-10 py-6 text-center rounded-xl sm:flex-1 relative">
            <motion.div
                ref={border}
                className="absolute inset-0 border-2 border-purple-400 rounded-xl" style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage
                }}
            >
            </motion.div>
            <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
                <EcosystemIcon />
            </div>
            <h3 className="mt-6 font-bold text-[#743fc4e6]">{title}</h3>
            <p className="mt-2 text-white/70">{description}</p>
        </div>
    )
}
