import React from "react";

export const Button = ({ isSubmitting, btnText }) => {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="block w-full mx-auto rounded bg-acent_yellow hover:bg-dark_blue focus:bg-dark_blue text-white p-3 text-xl font-extrabold"
    >
      {btnText}
    </button>
  );
};
