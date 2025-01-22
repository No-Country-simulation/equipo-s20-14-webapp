import React from 'react';
import logo from "../../assets/Webapp Finanzas/Page 1/logo.png";

export const RegisterPage = () => {
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="md:flex grid place-content-center h-screen w-screen">
                <div className="hidden md:block w-1/2 py-10 px-10 place-content-center bg-mask_blue">
                    <img className='mx-auto' src={logo} alt="logo" />
                </div>
                <div className="md:w-1/2 bg-login bg-cover bg-center min-h-screen w-screen">
                    <div className="bg-blueOverlay place-content-center md:py-10 px-5 md:px-10 min-h-screen">
                        <div className="block md:hidden md:pb-12 place-content-center">
                            <img className='mx-auto' src={logo} alt="logo" />
                        </div>
                        <div className="block pb-6 md:pb-12 place-content-center">
                            <h2 className='text-center text-white font-medium text-4xl'>Crear Cuenta</h2>
                        </div>
                        <form className="mx-10">
                            <div className="max-w-96 mx-auto">
                                <div className="flex">
                                    <div className="w-full px-3 mb-8">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                            <input
                                                type="text"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Usuario"
                                                name="loginUsuario"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-8">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                            <input
                                                type="text"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Nombre"
                                                name="loginNombre"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-8">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                            <input
                                                type="text"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Apellido"
                                                name="loginApellido"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-8">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                                            <input
                                                type="text"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Email"
                                                name="loginEmail"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-8">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center poin ter-events-none flex items-center justify-center"></div>
                                            <input
                                                type="password"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Contraseña"
                                                name="loginPassword"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-16">
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center poin ter-events-none flex items-center justify-center"></div>
                                            <input
                                                type="password"
                                                className="w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-200 outline-none focus:border-grayN-600"
                                                placeholder="Confirmar Contraseña"
                                                name="loginPasswordConfirm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full px-3 mb-3">
                                        <button
                                            type="submit"
                                            className="block w-full mx-auto bg-acent_yellow hover:bg-dark_blue focus:bg-grayN-500 text-white px-3 py-3 text-xl font-extrabold"
                                        >
                                            REGISTRARSE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
