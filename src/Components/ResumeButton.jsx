import React from 'react'

const ResumeButton = ({ 
  text = "Upload CV", 
  onClick, 
  className = "",
  iconColor = "#000000",
  primaryColor = "#40e6b9",
  secondaryColor = "#31b390"
}) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center justify-center cursor-pointer
        rounded-full
        transition-all duration-300 ease-in-out
        px-2.5 py-2.5
        text-zinc-900 font-bold
        ${className}
      `}
      style={{
        background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        boxShadow: `0 0 24px ${primaryColor}`,
        border: `2px solid ${primaryColor}`,
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = `0 0 34px ${primaryColor}`;
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = `0 0 24px ${primaryColor}`;
      }}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        width="36px"
        className="mr-1.5"
        style={{
          filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3))'
        }}
      >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path
          fill={iconColor}
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z"
        ></path>
      </svg>
      {text}
    </button>
  )
}

export default ResumeButton
