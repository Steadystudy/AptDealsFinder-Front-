import { Coordinates } from '@/types/MapType';
import { useDistanceStore, useMouseStore } from '@/zustand/useDistanceStore';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

type DistanceInfo = {
  isDrawing: boolean;
  mousePosition: Coordinates;
  distances: number[];
  paths: Coordinates[];
  clickLine: kakao.maps.Polyline;
  moveLine: kakao.maps.Polyline;
};

export default function DistanceInfo() {
  const { distances, paths, isDrawing } = useDistanceStore();
  const { clickLine, moveLine, mousePosition } = useMouseStore();
  const Distance = ({ distance }: { distance: number }) => {
    const walkTime = (distance / 67) | 0;
    const bicycleTime = (distance / 227) | 0;

    return (
      <ul className="flex flex-col gap-2 p-4 bg-white border-[0.2px] opacity-90 rounded-xl">
        <li>
          <span className="label ">총거리</span> <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{' '}
          {walkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{walkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{' '}
          {bicycleTime > 60 && (
            <>
              <span className="number">{Math.floor(bicycleTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{bicycleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  return (
    <>
      {paths.length > 1 &&
        paths.map((path: Coordinates) => (
          <CustomOverlayMap key={`dot-${path.lat},${path.lng}`} position={path} zIndex={1}>
            <span className="dot"></span>
          </CustomOverlayMap>
        ))}
      {paths.length > 1 &&
        distances.slice(1, distances.length).map((distance, index) => (
          <CustomOverlayMap
            key={`distance-${paths[index + 1].lat},${paths[index + 1].lng}`}
            position={paths[index + 1]}
            yAnchor={1}
            zIndex={2}
          >
            {!isDrawing && distances.length === index + 2 ? (
              <Distance distance={distance} />
            ) : (
              <div className="dotOverlay">
                거리 <span className="number">{distance}</span>m
              </div>
            )}
          </CustomOverlayMap>
        ))}
      {isDrawing && clickLine !== null && moveLine !== null && (
        <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
          <div className="dotOverlay distanceInfo">
            총거리{' '}
            <span className="number">
              {Math.round(clickLine.getLength() + moveLine.getLength())}
            </span>
            m
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
