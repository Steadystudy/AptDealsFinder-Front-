'use client';

import { Polygon } from 'react-kakao-maps-sdk';
import { useClickedAreaStore } from '@/zustand/useClickedArea';

export default function RegArea() {
  const { clickedArea } = useClickedAreaStore();

  return (
    <>
      {clickedArea && (
        <Polygon
          path={clickedArea.path}
          strokeWeight={1}
          strokeColor={'#00ff0000'}
          strokeOpacity={0.7}
          fillColor={'#85acff'}
          fillOpacity={0.15}
        ></Polygon>
      )}
    </>
  );
}
