'use client';

import { Polyline } from 'react-kakao-maps-sdk';
import { useMapStore } from '@/zustand/useMapStore';
import { useDistanceStore, useMouseStore } from '@/zustand/useDistanceStore';
import DistanceInfo from './DistanceInfo';

export default function DrawingDistance() {
  const { isDistanceClick } = useMapStore();
  const { isDrawing, paths } = useDistanceStore();
  const { mousePosition, setClickLine, setMoveLine } = useMouseStore();

  return (
    <>
      <Polyline
        path={paths}
        strokeWeight={3}
        strokeColor={'#db4040'}
        strokeOpacity={1}
        strokeStyle={'dot'}
        onCreate={setClickLine}
      />
      <Polyline
        path={isDrawing ? [paths[paths.length - 1], mousePosition] : []}
        strokeWeight={3}
        strokeColor={'#db4040'}
        strokeOpacity={0.5}
        strokeStyle={'solid'}
        onCreate={setMoveLine}
      />
      {isDistanceClick && <DistanceInfo />}
    </>
  );
}
