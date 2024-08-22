"use client";

import framerMotionLogo from '../../public/assets/framer-motion-logo.png'
import htmlLogo from '../../public/assets/html-logo.png'
import javascriptLogo from '../../public/assets/javascript-logo.png'
import nextjsLogo from '../../public/assets/nextjs-logo.png'
import tailwindLogo from '../../public/assets/tailwind-logo.png'
import { motion } from 'framer-motion'

export default function LogoTicker() {
    return (
        <section className='pt-[72px] pb-4 md:pt-24 md:pb-12'>
            <div className="container">
                <div className='flex items-center gap-5 md:gap-6'>
                    <div className='flex-none items-center'>
                        <h2>Powered by</h2>
                    </div>
                    <div className='flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,20%,black_80%,transparent)]'>
                        <motion.div
                            initial={{ translateX: "-50%" }}
                            animate={{ translateX: "0" }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: 'linear'
                            }}
                            className='flex flex-none gap-14 pr-14 -translate-x-1/2'
                        >
                            {[framerMotionLogo, htmlLogo, javascriptLogo, nextjsLogo, tailwindLogo, framerMotionLogo, htmlLogo, javascriptLogo, nextjsLogo, tailwindLogo].map((logo, index) => (
                                <div key={index} className='flex justify-center items-center gap-2'>
                                    <img
                                        src={logo.src}
                                        alt="logo"
                                        className='w-auto h-6 mr-1'
                                    />
                                    <h3
                                        className="leading-tight"
                                    >
                                        {["Framer Motion", "HTML", "JavaScript", "Next.js", "Tailwind", "Framer Motion", "HTML", "JavaScript", "Next.js", "Tailwind"][index]}
                                    </h3>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    )
}
