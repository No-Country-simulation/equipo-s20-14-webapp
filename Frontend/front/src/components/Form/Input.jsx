import React from 'react'

export const Input = ({ registro, tipo, name, placeholder, errors, icon }) => {
    return (
        <>
            <div className="flex">
                <div className="w-10 z-10 pl-1 text-center text-acent_yellow pointer-events-none flex items-center justify-center">{icon}</div>
                <input
                    {...registro}
                    type={tipo}
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded border-2 border-gray-200 outline-none focus:border-acent_yellow"
                    placeholder={placeholder}
                    name={name}
                />
            </div>
            <div className='text-red-600'>{errors}</div>
        </>
    )
}
