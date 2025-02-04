import React from "react";
import { loadBudgetTotalByUserCategory } from "../../actions/budgetActions";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useBudgetStore } from "../../store/budget";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../validations/userSchema";

export const Presupuesto = ({ categoria, idCategoria }) => {
  const idUsuario = useAuthStore((state) => state.profile).id;
  const setPresupuesto = useBudgetStore((state) => state.setPresupuesto);
  const montoTotal = useBudgetStore((state) => state.presupuestoTotal);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      monto: 0,
    },
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const loadBudgets = async () => {
      const { data } = await loadBudgetTotalByUserCategory(
        idUsuario,
        idCategoria
      );
      console.log(data.budgetamount);
      setPresupuesto(data.budgetamount);
    };
    loadBudgets();
  }, [categoria]);

  const onSubmit = async (values) => {
    try {

      if (values.monto) {
        
      }

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-8">
      <div className="py-6">
        Presupuesto <span className="capitalize">{categoria}</span>, total:{" "}
        {montoTotal}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder="Monto"
          {...register}
          name="monto"
          className="px-4 py-2 border rounded-md"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Agregar Presupuesto
        </button>        
        <div className="text-red-600">
          {errors.monto && errors.monto.message}
        </div>
      </form>
    </div>
  );
};
