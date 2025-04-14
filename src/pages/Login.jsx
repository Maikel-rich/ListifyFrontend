import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import FloatingLabel from "../components/FloatingLabel";
import { useToast } from "@/components/Toast";
import { login } from "@/services/auth.service";

export default function Login() {
    const navigate = useNavigate();
    const { showToast, ToastComponent } = useToast();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validación básica
            if (!formData.username || !formData.password) {
                showToast("Rellena todos los campos");
                return;
            }

            // Llamada al servicio de autenticación
            const data = await login(formData.username, formData.password);
            localStorage.setItem("token", data.token);

            showToast("Iniciando sesión");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (error) {
            showToast(error instanceof Error ? error.message : "Inicio fallido");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="text-[var(--white)] h-screen flex flex-col items-center px-4 bg-[var(--background)] pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />

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
                        className="font-semibold text-4xl text-center text-[var(--white)] drop-shadow-lg mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Inicia sesión
                    </motion.h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 mt-6">
                            <FloatingLabel
                                labelBgColor="var(--neutral)"
                                label="Usuario"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <FloatingLabel
                                labelBgColor="var(--neutral)"
                                isPassword={true}
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full mt-6 bg-[var(--primary)] rounded-full py-3 text-[var(--white)] shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </motion.button>
                    </form>

                    <motion.div
                        className="flex items-center justify-between w-full mt-6 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <a
                            onClick={() => navigate("/forgot-password")}
                            className="cursor-pointer text-[var(--white)] hover:text-[var(--primary)]"
                        >
                            Recuperar contraseña
                        </a>
                        <a
                            onClick={() => navigate("/register")}
                            className="cursor-pointer text-[var(--white)] hover:text-[var(--primary)]"
                        >
                            Crear cuenta
                        </a>
                    </motion.div>
                </motion.div>
            </motion.main>

            <ToastComponent />
        </motion.div>
    );
}