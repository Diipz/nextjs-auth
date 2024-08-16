import Logo from "../assets/logo.svg"
export default function Footer() {
    return (
        <footer className="py-5 mt-[72px] border-t border-white/15 bg-[#190d2e]">
            <div className="container">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex gap-2 items-center lg:flex-1">
                        <Logo className="h-6 w-6" />
                        <div className="font-medium">Apothetory</div>
                    </div>
                    <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1">
                        <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Blog</a>
                        <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Privacy Policy</a>
                        <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Terms of Service</a>
                        <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Contact Us</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

