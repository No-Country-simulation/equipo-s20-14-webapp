import React from "react";
import logo from "../../assets/WebappFinanzas/logo.png";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
<<<<<<< HEAD
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

export const LoginPage = () => {
  const { register, handleSubmit, setError } = useForm({
    defaultValues: {
      loginUser: "",
      loginPassword: "",
    },
  });

  const onSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);

      setError("root", {
        message: `${error}`,
      });
    }
  };
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="md:flex grid place-content-center h-screen w-screen">
        <div className="hidden md:block w-1/2 py-10 px-10 place-content-center bg-mask_blue">
          <img className="mx-auto" src={logo} alt="logo" />
=======
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth'

import { loginRequest } from '../../api/auth';

export const LoginPage = () => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const setToken = useAuthStore(state => state.setToken);
    const setProfile = useAuthStore(state => state.setProfile);
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {

            const { data } = await loginRequest(values.email, values.password)
            setToken(data.data.token);
            setProfile(data.data);
            navigate('/dashboard')

        } catch (error) {
            console.log(error);

            setError("root", {
                message: `${error.message}`
            })
        }
    }
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="md:flex grid place-content-center h-screen w-screen">
                <div className="hidden md:block w-1/2 py-10 px-10 place-content-center bg-mask_blue">
                    <img className='mx-auto' src={logo} alt="logo" />
                </div>
                <div className="md:w-1/2 bg-login bg-cover bg-center w-screen">
                    <div className="bg-blueOverlay place-content-center py-10 px-5 md:px-10 h-screen">
                        <div className="block md:hidden md:pb-10 place-content-center">
                            <img className='mx-auto' src={logo} alt="logo" />
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
                                        <Button isSubmitting={isSubmitting} btnText={isSubmitting ? 'CARGANDO...' : 'INICIAR SESION'} />
                                    </div>
                                </div>
                                {errors.root && (
                                    <div className='text-red-600'>{errors.root.message}</div>
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
                                            ¿Crear cuenta? <Link to='/register'><span className="text-lg font-bold">Registrarse</span></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
>>>>>>> c819037043cfdf9ee150d661b81409cf68d2cf66
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
                      registro={register("loginUser")}
                      tipo="text"
                      name="loginUser"
                      placeholder="Usuario o Email"
                      icon={<FaUser />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-16">
                    <Input
                      registro={register("loginPassword")}
                      tipo="password"
                      name="loginPassword"
                      placeholder="Contraseña"
                      icon={<RiLockPasswordFill />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-3">
                    <Button btnText={"INICIAR SESION"} />
                  </div>
                </div>
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
                      <span className="text-lg font-bold">Registrarse</span>
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
