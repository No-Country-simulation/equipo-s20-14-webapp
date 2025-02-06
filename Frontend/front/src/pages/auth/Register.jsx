import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../../assets/WebappFinanzas/logo.png";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { useRegister } from "../../hooks/useRegister";

export const RegisterPage = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useRegister();

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="md:flex grid place-content-center h-screen w-screen">
        <div className="hidden md:block w-1/2 py-10 px-10 place-content-center bg-mask_blue">
          <img className="mx-auto" src={logo} alt="logo" />
        </div>
        <div className="md:w-1/2 bg-login bg-cover bg-center w-screen">
          <div className="bg-blueOverlay place-content-center py-10 px-5 md:px-10 h-screen">
            <div className="block md:hidden md:pb-10 place-content-center">
              <img className="mx-auto" src={logo} alt="logo" />
            </div>
            <form className="mx-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="max-w-96 mx-auto">
                {/* Input para el Username */}
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("username")}
                      tipo="text"
                      name="username"
                      placeholder="Usuario"
                      icon={<FaUser />}
                    />
                    {/* Mostrar el error de username */}
                    {errors.username && (
                      <div className="text-red-600 pl-3 pb-4">
                        {errors.username.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Input para el Contacto */}
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("contact")}
                      tipo="text"
                      name="contact"
                      placeholder="Contacto"
                      icon={<RiLockPasswordFill />}
                    />
                    {/* Mostrar el error de contacto */}
                    {errors.contact && (
                      <div className="text-red-600 pl-3 pb-4">
                        {errors.contact.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Input para el Email */}
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("email")}
                      tipo="email"
                      name="email"
                      placeholder="Email"
                      icon={<RiLockPasswordFill />}
                    />
                    {/* Mostrar el error de email */}
                    {errors.email && (
                      <div className="text-red-600 pl-3 pb-4">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Input para la Contraseña */}
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("password")}
                      tipo="password"
                      name="password"
                      placeholder="Contraseña"
                      icon={<RiLockPasswordFill />}
                    />
                    {/* Mostrar el error de password */}
                    {errors.password && (
                      <div className="text-red-600 pl-3 pb-4">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Input para Confirmar Contraseña */}
                <div className="flex">
                  <div className="w-full px-3 mb-16">
                    <Input
                      registro={register("confirmPassword")}
                      tipo="password"
                      name="confirmPassword"
                      placeholder="Repite la contraseña"
                      icon={<RiLockPasswordFill />}
                    />
                    {/* Mostrar el error de confirmPassword */}
                    {errors.confirmPassword && (
                      <div className="text-red-600 pl-3 pb-4">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón de Enviar */}
                <div className="flex">
                  <div className="w-full px-3 mb-3">
                    <Button
                      isSubmitting={isSubmitting}
                      btnText={isSubmitting ? "CARGANDO..." : "INICIAR SESION"}
                    />
                  </div>
                </div>

                {/* Mostrar el error general */}
                {errors.root && (
                  <div className="text-red-600 pl-3 pb-4">
                    {errors.root.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
