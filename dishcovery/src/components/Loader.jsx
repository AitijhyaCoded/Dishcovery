import React from 'react'

const Loader = ({loadImg}) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <img src={loadImg} alt="Loading..." className="w-20 h-20" />
    </div>
  )
}

export default Loader
