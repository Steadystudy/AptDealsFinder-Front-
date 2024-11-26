'use client';

import useAptDealsInBoundQuery from '@/hooks/api/useAptDealsInBoundQuery';
import stringToPrice from '@/hooks/stringToPrice';
import { APTInfo } from '@/types/AptType';
import { useAptSidebarStore } from '@/zustand/useAptSidebarStore';
import { useBoundStore } from '@/zustand/useBoundStore';
import { useClickedAreaStore } from '@/zustand/useClickedArea';
import { useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

export default function AptMarker() {
  const { bound } = useBoundStore();
  const { setCenter } = useClickedAreaStore();
  const [aptInfo, setAptInfo] = useState<APTInfo | null>();
  const { setApt, openSidebar, aptDetail } = useAptSidebarStore();
  const positions = useAptDealsInBoundQuery(bound);

  const handleClickMarker = async (apt: APTInfo) => {
    setApt(apt);
    setCenter({
      lat: apt.lat,
      lng: apt.lng,
    });
    openSidebar();
  };

  return (
    <>
      {positions.map((apt) => (
        <CustomOverlayMap
          key={`overlay-${apt.no}`}
          position={{
            lat: apt.lat,
            lng: apt.lng,
          }}
        >
          <MapMarker
            key={`marker-${apt.no}`}
            position={{
              lat: apt.lat,
              lng: apt.lng,
            }}
            image={{
              src: `/images/house.jpeg`,
              size: {
                width: aptDetail?.apt_seq === apt.apt_seq ? 64 : 32,
                height: aptDetail?.apt_seq === apt.apt_seq ? 70 : 35,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: aptDetail?.apt_seq === apt.apt_seq ? 26 : 13,
                  y: aptDetail?.apt_seq === apt.apt_seq ? 70 : 35,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                alt: '집',
              },
            }}
            zIndex={-10}
            onClick={() => handleClickMarker(apt)}
            onMouseOver={() => setAptInfo(apt)}
            onMouseOut={() => setAptInfo(null)}
          ></MapMarker>
          {aptInfo && aptInfo.apt_seq === apt.apt_seq && (
            <div className="flex flex-col bg-violet-600 text-white text-xs rounded-b-lg border-[0.2px] border-black shadow-md z-50 cursor-pointer">
              <div className="flex flex-col bg-white text-black border-b-[0.1px]">
                <h3 className="w-[120px] text-sm truncate">{apt.apt_nm} 아파트</h3>
                <span className="text-xs self-end">최근 거래 내역</span>
              </div>
              <ul className="p-[0.5px]">
                <li>
                  <span className="text-sm">
                    {Math.floor(stringToPrice(apt.deal_amount) / 100) / 100} 억원
                  </span>
                </li>
                <li>
                  <span className="text-sm">{apt.exclu_use_ar}㎡</span>
                </li>
              </ul>
            </div>
          )}
        </CustomOverlayMap>
      ))}
    </>
  );
}
