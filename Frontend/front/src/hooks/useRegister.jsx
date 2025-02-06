import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { userSchema } from "../validations/userSchema";

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const onSubmit = async (values) => {
    try {
      const { data } = await registerRequest(
        values.email,
        values.password,
        values.username,
        values.contact
      );
      setToken(data.data.token);
      setProfile(data.data);
    } catch (error) {
      console.log(error);
      setError("root", {
        message: `${error.response.data.message}`,
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
