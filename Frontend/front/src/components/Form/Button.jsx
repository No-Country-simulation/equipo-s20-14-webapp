import React from 'react'

export const Button = ({ btnText }) => {
    return (
        <button
            type="submit"
            className="block w-full mx-auto rounded bg-acent_yellow hover:bg-dark_blue focus:bg-dark_blue text-white p-3 text-xl font-extrabold"
        >
            {btnText}
        </button>
    )
}
