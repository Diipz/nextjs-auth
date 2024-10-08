"use client"

import Image from "next/image";
import avatar1 from "../../public/assets/avatar-1.png";
import avatar2 from "../../public/assets/avatar-2.png";
import avatar3 from "../../public/assets/avatar-3.png";
import avatar4 from "../../public/assets/avatar-4.png";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        text: "“Simple and efficient platform I would highly recommend to others”",
        name: "Sophia",
        title: "Practice Manager",
        avatarImg: avatar1,
    },
    {
        id: 2,
        text: "“Professional pharmacist with great communication and work ethic”",
        name: "Jamie",
        title: "GP",
        avatarImg: avatar2,
    },
    {
        id: 3,
        text: "“Secured a pharmacist on short notice who integrated with team swiftly”",
        name: "Alisa",
        title: "GP",
        avatarImg: avatar3,
    },
    {
        id: 4,
        text: "“Experienced pharmacists that contributed towards QOF success”",
        name: "Alec",
        title: "PCN Director",
        avatarImg: avatar4,
    },
    {
        id: 5,
        text: "“Simple and efficient platform I would highly recommend to others”",
        name: "Sophia",
        title: "Practice Manager",
        avatarImg: avatar1,
    },
    {
        id: 6,
        text: "“Professional pharmacist with great communication and work ethic”",
        name: "Jamie",
        title: "GP",
        avatarImg: avatar2,
    },
    {
        id: 7,
        text: "“Secured a pharmacist on short notice who integrated with team swiftly”",
        name: "Alisa",
        title: "GP",
        avatarImg: avatar3,
    },
    {
        id: 8,
        text: "“Experienced pharmacists that contributed towards QOF success”",
        name: "Alec",
        title: "PCN Director",
        avatarImg: avatar4,
    },
];

export default function Testimonials() {
    return (
        <section className="py-[72px] sm:py-24  bg-black">
            <div className="container">
                <h2 className="text-5xl md:text-6xl md:font-bold text-center tracking-tighter font-medium">Beyond Expectations</h2>
                <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight">Discover what our clients have to say.</p>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                    <motion.div
                        className="flex gap-5 pr-5 flex-none"
                        initial={{
                            translateX: "-50%"
                        }}
                        animate={{
                            translateX: "0"
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                        }}
                    >
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className=" border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-md flex-none">
                                <div className="text-lg md:text-xl tracking-tight">{testimonial.text}</div>
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg">
                                        <Image src={testimonial.avatarImg} alt={`Avatar for ${testimonial.name}`} className="h-11 w-11 rounded-lg grayscale " />
                                    </div>
                                    <div>
                                        <div>{testimonial.name}</div>
                                        <div className="text-white/50 text-sm">{testimonial.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

