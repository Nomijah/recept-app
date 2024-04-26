import React from 'react'

type LargeImageProps = {
    url: string;
}

const LargeImage = ({url}: LargeImageProps) => {
  return (
    <div className='w-auto flex flex-row justify-center'>
        <img src={url} alt='picture of food' className='w-4/5 h-auto rounded-lg shadow-lg md:w-3/4 lg:w-2/3 xl:w-1/2'/>
    </div>
  )
}

export default LargeImage