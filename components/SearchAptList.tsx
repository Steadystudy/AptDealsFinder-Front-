'use client';

import { MARKER_LV } from '@/constants/map.constants';
import useSearchAptByKeyword from '@/hooks/api/useSearchAptByKeyword';
import { APTInfo } from '@/types/AptType';
import { useAptSidebarStore } from '@/zustand/useAptSidebarStore';
import { useClickedAreaStore } from '@/zustand/useClickedArea';
import { useKeywordStore } from '@/zustand/useKeywordStore';
import { useMapStore } from '@/zustand/useMapStore';
import { useCallback, useEffect, useRef } from 'react';

export default function SearchAptList() {
  const { keyword, keywordOpen, closeKeyword } = useKeywordStore();
  const { setCenter } = useClickedAreaStore();
  const { setApt, openSidebar } = useAptSidebarStore();
  const { map } = useMapStore();
  const divRef = useRef<HTMLDivElement>(null);
  const data = useSearchAptByKeyword(keyword);

  const ClickAreaOutSideClick = useCallback(
    (e: any) => {
      if (!divRef.current?.contains(e.target)) {
        closeKeyword();
      }
    },
    [closeKeyword],
  );

  const handleClickAptNm = (apt: APTInfo) => {
    if (!map) return;
    map.setLevel(MARKER_LV);
    setApt(apt);
    setCenter({
      lat: apt.lat,
      lng: apt.lng,
    });
    openSidebar();
  };

  useEffect(() => {
    window.addEventListener('mousedown', ClickAreaOutSideClick);

    return () => window.removeEventListener('mousedown', ClickAreaOutSideClick);
  }, [ClickAreaOutSideClick]);

  return (
    <div
      ref={divRef}
      className={`w-60 absolute right-24 bg-white z-50 ${
        keywordOpen ? 'block' : 'hidden'
      } cursor-pointer`}
    >
      {data?.map((d) => (
        <div key={d.apt_seq} onClick={() => handleClickAptNm(d)} className={`w-full p-2`}>
          {d.umd_nm + ' ' + d.apt_nm}
        </div>
      ))}
    </div>
  );
}
