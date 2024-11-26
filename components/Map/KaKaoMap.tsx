'use client';

import useDebounce from '@/lib/useDebounce';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import * as turf from '@turf/turf';
import { useMapStore } from '@/zustand/useMapStore';
import { useMarkersStore } from '@/zustand/useMarkersStore';
import { useDistanceStore, useMouseStore } from '@/zustand/useDistanceStore';
import { initMap } from '@/hooks/initMap';
import { useBoundStore } from '@/zustand/useBoundStore';
import { useClickedAreaStore } from '@/zustand/useClickedArea';
import { useAreasStore } from '@/zustand/useAreasStore';
import { Area } from '@/types/MapType';
import { INITIAL_LV, MARKER_LV } from '@/constants/map.constants';

export default function KaKaoMap({ children }: PropsWithChildren) {
  const { center, setClickedArea, setCenter } = useClickedAreaStore();
  const { setBound } = useBoundStore();

  const areas = useMemo(() => initMap(), []);
  const { setAreas } = useAreasStore();
  const { map, setMap, isDistanceClick } = useMapStore();
  const { distances, paths, setPaths, isDrawing, setDistances, setIsDrawing } = useDistanceStore();
  const { setMousePosition, clickLine, moveLine } = useMouseStore();
  const { setMarkers } = useMarkersStore();

  const handleClickedArea = (map: kakao.maps.Map, areas: Area[]) => {
    const latlng = map.getCenter();
    const point = turf.point([latlng.getLng(), latlng.getLat()]);
    for (const area of areas!) {
      const { polygon, key, ssg, ssgnm, sido, sidonm, center, path } = area;
      if (turf.booleanPointInPolygon(point, polygon)) {
        setClickedArea({
          key,
          ssg,
          ssgnm,
          sido,
          sidonm,
          center,
          path,
        });
      }
    }
  };

  const handleBound = (map: kakao.maps.Map) => {
    const curLevel = map.getLevel();
    if (curLevel <= MARKER_LV) {
      const topLat = map.getBounds().getNorthEast().getLat();
      const rightLng = map.getBounds().getNorthEast().getLng();
      const bottomLat = map.getBounds().getSouthWest().getLat();
      const leftLng = map.getBounds().getSouthWest().getLng();
      setBound({
        topLat,
        rightLng,
        bottomLat,
        leftLng,
      });
    } else {
      setBound(null);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCenterChanged = useCallback(
    useDebounce(async () => {
      if (!map) return;
      handleClickedArea(map, areas);
      handleBound(map);
    }, 500),
    [map],
  );

  const handleZoomChanged = () => {
    setMarkers([]);
  };

  const handleMapClick = (_: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!isDistanceClick) {
      return;
    }
    const newPath = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };
    setPaths(isDrawing ? [...paths, newPath] : [newPath]);

    if (clickLine && moveLine) {
      const newDistance = Math.round(clickLine.getLength() + moveLine.getLength());
      setDistances(isDrawing ? [...distances, newDistance] : [newDistance]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = useDebounce(
    (_: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
      if (isDistanceClick) {
        setMousePosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        });
      }
    },
    1,
  );

  const handleRightClick = () => setIsDrawing(false);

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) return;
    geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({
        lat: latitude,
        lng: longitude,
      });
    });
    if (map) {
      handleClickedArea(map, areas);
      handleBound(map);
    }
    if (areas) {
      setAreas(areas);
    }
  }, [map, areas]);

  return (
    <div className="relative ">
      <Map
        level={INITIAL_LV}
        onClick={handleMapClick}
        onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
        onCenterChanged={handleCenterChanged}
        onZoomChanged={handleZoomChanged}
        center={center}
        onCreate={setMap}
        className="w-full h-mapSize relative"
      >
        {children}
      </Map>
    </div>
  );
}
