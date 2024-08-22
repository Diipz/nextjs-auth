"use client"

import Image from "next/image";
import appScreen from "../../public/assets/app-screen.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProductShowcase() {

    const appImage = useRef<HTMLImageElement>(null);
    const { scrollYProgress } = useScroll({
        target: appImage,
        offset: ["start end", "center center"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
        <section id="product-section" className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-[72px] sm:py-24">
            <div className="container">
                <h2 className="text-center text-5xl md:text-6xl font-bold tracking-tighter">Intuitive Interface</h2>
                <div className=" mx-auto">
                    <p className="text-xl text-center text-white/70 mt-5">A user-friendly design that simplifies navigation and saves time.</p>
                    <motion.div
                        style={{
                            opacity: opacity,
                            rotateX: rotateX,
                            transformPerspective: "800px",
                        }}
                    >
                        <Image ref={appImage} className="mt-14" src={appScreen} alt="The product screen shot" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
