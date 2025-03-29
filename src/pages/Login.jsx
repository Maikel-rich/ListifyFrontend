import Header from "../components/Header.jsx";
import FloatingLabel from "../components/FloatingLabel.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <motion.div
            className="text-[var(--white)] h-screen flex flex-col items-center px-4 bg-[var(--background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <Header />

            {/* Main */}
            <motion.main
                className="flex items-center justify-center w-full pt-16"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <motion.div
                    className="w-full max-w-lg h-auto flex flex-col bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <motion.h1
                        className="font-semibold text-4xl text-center text-white drop-shadow-lg mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        ¡Bienvenido de nuevo!
                    </motion.h1>

                    <div className="flex flex-col gap-6 mt-6">
                        <FloatingLabel label="Usuario"/>
                        <FloatingLabel isPassword={true} label="Contraseña" />
                    </div>

                    <motion.button
                        className="w-full mt-6 bg-[var(--primary)] rounded-full py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Iniciar Sesión
                    </motion.button>

                    <motion.div
                        className="flex items-center justify-between w-full mt-6 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <a
                            onClick={() => navigate("/login")}
                            className="cursor-pointer text-white hover:text-[var(--primary)]"
                        >
                            Recuperar contraseña
                        </a>
                        <a
                            onClick={() => navigate("/register")}
                            className="cursor-pointer text-white hover:text-[var(--primary)]"
                        >
                            Registrarse
                        </a>
                    </motion.div>
                </motion.div>
            </motion.main>
        </motion.div>
    );
}
