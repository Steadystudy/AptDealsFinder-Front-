'use client';

import { categoryCodes } from '@/constants/category.constants';
import { Marker } from '@/types/MarkerType';
import { useMarkersStore } from '@/zustand/useMarkersStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

export default function Places() {
  const [info, setInfo] = useState<Marker | null>(null);
  const { markers } = useMarkersStore();

  useEffect(() => {
    setInfo(null);
  }, [markers]);

  return (
    <>
      {markers.map((marker) => (
        <MapMarker
          key={marker.id}
          position={marker.position}
          onClick={() => setInfo(marker)}
          image={{
            src: `/images/${categoryCodes[marker.category_group_code]}.svg`,
            size: {
              width: 42,
              height: 46,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 18,
                y: 46,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              alt: `${categoryCodes[marker.category_group_code]}`,
            },
          }}
        ></MapMarker>
      ))}
      {info && (
        <CustomOverlayMap key={info.id} position={info.position}>
          <div className="absolute top-[-100px] flex flex-col p-2 -translate-x-1/2 -translate-y-1/2 z-[100] rounded-lg bg-white border-[0.6px] border-black">
            <h2 className="font-semibold text-lg w-48 truncate">{info.place_name}</h2>
            <span className="text-sm self-end">{info.category_group_name}</span>
            <Link target="_blank" className="text-base" href={info.place_url}>
              상세 페이지
            </Link>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
