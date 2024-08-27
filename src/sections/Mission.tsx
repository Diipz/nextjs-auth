import Feature from "@/app/components/Feature"


const features = [
    {
        title: "Repository Access",
        description: "Access to experienced pharmacists inlcuding their qualifications, availibility, and contact details facilitating unlimited and efficient scheduling."
    },
    {
        title: "Integrated Calendar",
        description: "An integrated calendar for real-time booking management, offering a clear view of appointments, availability, and schedule changes in one place."
    },
    {
        title: "Secure Data Encryption",
        description: "Advanced data encryption ensures the security of sensitive information, delivering robust protection against unauthorised access."
    }
]

export default function Mission() {
    return (
        <section id="about-section" className="bg-black text-white py-[72px] px-4 sm:py-24">
            <div className="container">
                <h2 className="text-center md:font-bold font-medium text-5xl md:text-6xl tracking-tighter">Our Mission</h2>
                <div className="max-w-xl mx-auto">
                    <p className="text-center mt-5 text-lg md:text-xl text-white/70">At Apothetory, we made it our mission to discover only the most distinguished pharmacists and connect them with general practices. Our novel platform enables organisations to find and negotiate fees directly with clinical pharmacists.
                    </p>
                </div>
            </div>
            <div className="md:mt-16 mt-8 flex flex-col md:flex-row gap-4 max-w-[400px] md:max-w-[720px] lg:max-w-[1038px] mx-auto">
                {features.map(({ title, description }) => (
                    <Feature key={title} title={title} description={description} />
                ))}
            </div>

        </section>
    )
}
