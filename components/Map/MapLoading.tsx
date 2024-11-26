'use client';

import { useEffect, useState } from 'react';

export default function MapLoading() {
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    // setAreas(areas);
    const timer = setTimeout(() => {
      setAnimationEnded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    !animationEnded && (
      <div className="w-full h-mapSize fixed top-[5vh] left-0 bg-white z-50 flex flex-col justify-center items-center">
        {/* <div className="w-1 h-48 animate-moveLeft bg-black"></div> */}
        <div className="flex justify-center items-center w-64 h-64 rounded-full border-b-4 border-r-4 animate-moveRight">
          <div className="w-1 h-48 bg-gray-500 animate-opening"></div>
        </div>
        {/* <div className="w-1 h-48 animate-moveLeft bg-black"></div> */}
      </div>
    )
  );
}
