import Header from "../components/Header.jsx";
import FloatingLabel from "../components/FloatingLabel.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <motion.div
            className="text-[var(--white)] mt-20 h-screen flex flex-col items-center px-4 bg-[var(--background)]"
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
                        className="font-semibold text-4xl text-center text-white drop-shadow-lg mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Registrarse
                    </motion.h1>

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                <FloatingLabel labelBgColor="var(--neutral)" label="Nombre" />
                                <FloatingLabel labelBgColor="var(--neutral)" label="Apellidos" />
                                <FloatingLabel labelBgColor="var(--neutral)" label="Fecha de nacimiento" isDate={true} />
                                <FloatingLabel labelBgColor="var(--neutral)" label="DNI" />
                                <FloatingLabel labelBgColor="var(--neutral)" label="Dirección" className="col-span-2" />
                                <FloatingLabel labelBgColor="var(--neutral)" label="Número de teléfono" type="tel" className="col-span-2" />
                            </div>
                            <motion.button
                                className="w-full mt-6 bg-[var(--primary)] rounded-full py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={nextStep}
                            >
                                Siguiente
                            </motion.button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <div className="flex flex-col gap-6 mt-6">
                                <FloatingLabel labelBgColor="var(--neutral)" label="Usuario" />
                                <FloatingLabel labelBgColor="var(--neutral)" label="Correo electrónico" type="email" />
                                <FloatingLabel labelBgColor="var(--neutral)" isPassword={true} label="Contraseña" />
                                <FloatingLabel labelBgColor="var(--neutral)" isPassword={true} label="Confirmar contraseña" />
                            </div>
                            <div className="flex justify-between mt-6 gap-4">
                                <motion.button
                                    className="bg-gray-500 rounded-full py-2 px-4 text-[var(--white)] shadow-md hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={prevStep}
                                >
                                    Anterior
                                </motion.button>
                                <motion.button
                                    className="bg-[var(--primary)] rounded-full py-2 px-6 text-[var(--white)] shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/login")}
                                >
                                    Registrarse
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.main>
        </motion.div>
    );
}
