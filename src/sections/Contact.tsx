import StyledButton from "@/app/components/StyledButton";


export default function Contact() {
    return (
        <section id="contact-section" className="bg-black text-white py-[72px] sm:py-24 text-center">
            <div className="container max-w-xl relative">
                <h2 className="md:font-bold font-medium text-5xl tracking-tighter md:text-6xl">Get in touch</h2>
                <p className="text-lg md:text-xl text-white/70 mt-5">Contact us for personalised help, support or enquiries to address your needs.</p>
                <form className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
                    <input type="email" placeholder="your@email.com" className="h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] flex-1" />
                    <div className="flex justify-center items-center w-[80px] h-12">
                        <StyledButton text="Submit" link={"/auth/signup"}></StyledButton>
                    </div>
                </form>
            </div>
        </section>
    )
}
