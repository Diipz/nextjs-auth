import Feature from "@/app/components/Feature"


const features = [
    {
        title: "Integration Ecosystem",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, culpa."
    },
    {
        title: "Goal Setting and Tracking",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eos corporis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, culpa."
    },
    {
        title: "Secure Data Encryption",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, culpa."
    }
]

export default function Features() {
    return (
        <div className="bg-black text-white py-[72px] px-4 sm:py-24">
            <div className="container">
                <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">Everything you need</h2>
                <div className="max-w-xl mx-auto">
                    <p className="text-center mt-5 text-xl text-white/70">Enjoy customizable lists, team work tools and smart tracking all in one place. Set tasks, get reimnders, and see you progress simply and quickly.
                    </p>
                </div>
            </div>
            <div className="md:mt-16 mt-8 flex flex-col md:flex-row gap-4 max-w-[400px] md:max-w-[720px] lg:max-w-[1038px] mx-auto">
                {features.map(({ title, description }) => (
                    <Feature key={title} title={title} description={description} />
                ))}
            </div>

        </div>
    )
}
