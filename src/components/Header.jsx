import { motion } from "framer-motion";

export default function Header() {
    return(
        <header className="text-[var(--white)] flex items-center justify-center gap-4 mt-10">
            <motion.img
                className="h-[48px] md:h-[56px]"
                src="/ListifyLogo.svg"
                alt="Listify Logo"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <h1 className="text-3xl md:text-4xl font-black tracking-wide">Listify</h1>
        </header>
        );
}