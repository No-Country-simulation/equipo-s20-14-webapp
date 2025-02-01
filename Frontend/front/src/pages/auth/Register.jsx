import React from 'react';
import logo from "../../assets/WebappFinanzas/logo.png";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../validations/userSchema';
import { RiCellphoneFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Link } from 'react-router-dom';
import { registerRequest } from '../../api/auth';
import { useAuthStore } from '../../store/auth';

export const RegisterPage = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      contact: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(userSchema)
  });

  const setToken = useAuthStore(state => state.setToken);
  const setProfile = useAuthStore(state => state.setProfile);

  const onSubmit = async values => {
    try {

      const { data } = await registerRequest(values.email, values.password, values.username, values.contact)
      setToken(data.data.token);
      setProfile(data.data);

    } catch (error) {
      console.log(error);

      setError("root", {
        message: `${error.response.data.message}`
      })
    }
  }

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
            <form className="mx-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="max-w-96 mx-auto">
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("username")}
                      tipo="text"
                      name="username"
                      placeholder="UserName"
                      errors={errors.username && errors.username.message}
                      icon={<FaUser />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("email")}
                      tipo="text"
                      name="email"
                      placeholder="Email"
                      errors={errors.email && errors.email.message}
                      icon={<MdEmail />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("contact")}
                      tipo="text"
                      name="contact"
                      placeholder="Contacto"
                      errors={errors.contact && errors.contact.message}
                      icon={<RiCellphoneFill />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-8">
                    <Input
                      registro={register("password")}
                      tipo="password"
                      name="password"
                      placeholder="Contraseña"
                      errors={errors.password && errors.password.message}
                      icon={<RiLockPasswordFill />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-16">
                    <Input
                      registro={register("confirmPassword")}
                      tipo="password"
                      name="confirmPassword"
                      placeholder="Confirmar Contraseña"
                      errors={errors.confirmPassword && errors.confirmPassword.message}
                      icon={<RiLockPasswordFill />}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-3">
                    <Button btnText={'REGISTRARSE'} />
                  </div>
                </div>
                {errors.root && (
                  <div className='text-red-600'>{errors.root.message}</div>
                )}

                <div className="flex md:mt-6 text-center">
                  <div className="w-full px-3 mb-5">
                    <p className="text-sm font-medium text-white">
                      ¿Ya tienes cuenta? <Link to='/login'><span className="text-lg font-bold">Ingresar</span></Link>
                    </p>
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
