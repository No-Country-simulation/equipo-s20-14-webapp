import { useForm } from "react-hook-form";
import { loadCategories } from "../actions/categoriesActions";
import { loginRequest } from "../api/auth";
import { prepareGastosPath } from "../helpers/prepareGastosPath";
import { useAuthStore } from "../store/auth";
import { useCategoryStore } from "../store/category";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setCategorias = useCategoryStore((state) => state.setCategorias);
  const setPathCategorias = useCategoryStore.getState().setPathCategorias;

  const onSubmit = async (values) => {
    try {
      const { data } = await loginRequest(values.email, values.password);
      setToken(data.data.token);
      setProfile(data.data);

      const idUsuario = useAuthStore.getState().profile.id;
      const cat = await loadCategories(idUsuario);
      setCategorias(cat);
      setPathCategorias(prepareGastosPath(cat));
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || "Error en el login",
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
