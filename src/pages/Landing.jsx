import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="text-[var(--white)] bg-[var(--gray-dark)] flex flex-col items-center px-4 mt-10">
            {/* Header */}
            <Header />
            {/* Main */}
            <motion.main
                className="h-max flex flex-col items-center text-center max-w-[800px] mx-auto py-16 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
                    Organiza tus compras fácilmente
                </h2>
                <p className="text-base md:text-lg font-medium text-gray-300">
                    Crea, edita y comparte listas, agrupa productos por categorías y optimiza tu tiempo con una herramienta práctica y eficiente.
                </p>
                <motion.button
                    className="rounded-full bg-[var(--primary)] text-base md:text-lg px-6 md:px-8 py-2
                    hover:bg-[var(--gray-light)] hover:text-[var(--black)] hover:shadow-lg drop-shadow-md
                    transition-transform duration-40 ease-in-out w-full max-w-[220px] md:max-w-[250px]"
                    aria-label="Explorar Listify"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                >
                    Explorar
                </motion.button>
            </motion.main>

            {/* Features Section */}
            <motion.div
                className="w-full max-w-screen-lg bg-[var(--gray-light)] bg-opacity-80 backdrop-blur-lg rounded-xl py-8 px-6 mx-auto
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left items-stretch shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
                {[
                    { title: "Listas personalizadas", text: "Crea y edita listas adaptadas a tus necesidades." },
                    { title: "Compartir con facilidad", text: "Envía tus listas a familiares o amigos en segundos." },
                    { title: "Organización inteligente", text: "Agrupa productos en categorías." }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        className="text-[var(--black)] flex flex-col items-start h-full p-4 flex-grow bg-[var(--gray-light)
                        transition-all duration-300 ease-in-out rounded-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            className="h-[24px] transition-all duration-300 ease-in-out"
                            src="/FeatureIcon.svg"
                            alt={feature.title}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <h3 className="cursor-default mt-2 text-xl md:text-2xl font-semibold">{feature.title}</h3>
                        <p className="cursor-default text-sm md:text-base">{feature.text}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
