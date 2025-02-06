import React from "react";
import logo from "../../assets/WebappFinanzas/logo.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export const LoginPage = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

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
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("email")}
                      tipo="text"
                      name="email"
                      placeholder="Email"
                      icon={<FaUser />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-16">
                    <Input
                      registro={register("password")}
                      tipo="password"
                      name="password"
                      placeholder="Contraseña"
                      icon={<RiLockPasswordFill />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-3">
                    <Button
                      isSubmitting={isSubmitting}
                      btnText={isSubmitting ? "CARGANDO..." : "INICIAR SESION"}
                    />
                  </div>
                </div>
                {errors.root && (
                  <div className="text-red-600 pl-3 pb-4">
                    {errors.root.message}
                  </div>
                )}
                <div className="flex">
                  <div className="w-full px-3 mb-16">
                    <p className="text-sm font-medium text-white">
                      ¿Olvidaste la contraseña?
                    </p>
                  </div>
                </div>
                <div className="flex md:mt-12 text-center">
                  <div className="w-full px-3 mb-5">
                    <p className="text-sm font-medium text-white">
                      ¿Crear cuenta?{" "}
                      <Link to="/register">
                        <span className="text-lg font-bold">Registrarse</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
