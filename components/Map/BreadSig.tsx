'use client';

import { Area, ClickArea, RegCode } from '@/types/MapType';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InitialSido } from '@/constants/map.constants';
import { useGetRegCodes } from '@/hooks/api/useGetRegCodes';
import { useClickedAreaStore } from '@/zustand/useClickedArea';
import { useAreasStore } from '@/zustand/useAreasStore';

interface BreadSig {
  areas: Area[];
}

const INIT_SI_NAME = '전국';
const INIT_GU_NAME = '군 선택';

export default function BreadSig() {
  const [open, setOpen] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    sido: INIT_SI_NAME,
    ssg: INIT_GU_NAME,
    clickedSido: INIT_SI_NAME,
    clickedSsg: INIT_GU_NAME,
  });
  const gridRef = useRef<HTMLDivElement>(null);
  const breadRef = useRef<HTMLElement>(null);
  const [regCode, setRegcode] = useState<string>(InitialSido);
  const { clickedArea, setClickedArea, setCenter } = useClickedAreaStore();
  const { areas } = useAreasStore();
  const data = useGetRegCodes(regCode);

  const handleClickSido = async () => {
    setLocationInfo((prev) => ({
      ...prev,
      sido: INIT_SI_NAME,
      ssg: INIT_GU_NAME,
    }));
    setRegcode(InitialSido);
    setOpen(true);
  };

  const handleClickGugun = () => {
    if (!clickedArea || locationInfo.clickedSido === INIT_SI_NAME) return;
    setRegcode(clickedArea.sido + '*00000');
    setOpen(true);
  };

  const handleClickedArea = async (area: ClickArea) => {
    const { key, ssg, ssgnm, sido, sidonm, center, path } = area;
    setClickedArea({
      key,
      ssg,
      ssgnm,
      sido,
      sidonm,
      center,
      path,
    });
    setCenter(center);
  };

  const handleClickData = async (regCode: RegCode, isGu: boolean) => {
    const { code, name } = regCode;
    const dataSido = code.substring(0, 2);
    const dataSsg = code.substring(2, 5);

    if (Number(dataSsg) > 0) {
      const area = areas?.find(({ ssg }) => ssg === `${code.substring(0, 5)}`);
      if (area) {
        handleClickedArea(area);
      }
      setOpen(false);
    } else if (Number(dataSido) > 0) {
      const newRegCode = dataSido + '*00000';
      setRegcode(newRegCode);
    }

    setLocationInfo((prev) => ({
      ...prev,
      sido: name.split(' ')[0],
      ssg: isGu ? getFullGuName(name) : prev.ssg,
    }));
  };

  const getFullGuName = useCallback((fullName: string) => {
    const parts = fullName.split(' ');
    parts.shift();
    return parts.join(' ');
  }, []);

  const closeArea = () => setOpen(false);
  const ClickAreaOutSideClick = useCallback((e: any) => {
    if (!gridRef.current?.contains(e.target) && !breadRef.current?.contains(e.target)) {
      closeArea();
    }
  }, []);

  useEffect(() => {
    if (clickedArea) {
      setLocationInfo({
        sido: clickedArea.sidonm,
        clickedSido: clickedArea.sidonm,
        ssg: clickedArea.ssgnm,
        clickedSsg: clickedArea.ssgnm,
      });
    }

    window.addEventListener('mousedown', ClickAreaOutSideClick);

    return () => window.removeEventListener('mousedown', ClickAreaOutSideClick);
  }, [clickedArea, ClickAreaOutSideClick]);

  return (
    <div className=" absolute z-10 top-6 left-[50%] -translate-x-1/2">
      <Breadcrumb
        ref={breadRef}
        className=" flex items-center gap-2 mx-auto max-w-full h-9 p-2 
                rounded-xl shadow-sm border-[0.5px] text-center text-black bg-white border-red-500"
      >
        <BreadcrumbList>
          <BreadcrumbItem className="cursor-pointer" onClick={handleClickSido}>
            <span>🚩</span>
            {locationInfo.clickedSido}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem
            className={`${locationInfo.clickedSsg !== INIT_GU_NAME && 'cursor-pointer'}`}
            onClick={handleClickGugun}
          >
            {locationInfo.clickedSsg}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {
        <div ref={gridRef} className={`w-[320px] bg-white ${!open && 'hidden'}`}>
          <div className="p-2">
            {locationInfo.sido} / {locationInfo.ssg}
          </div>
          <div className="grid grid-cols-3 border-solid max-h-[540px] overflow-y-auto border-l border-t *:border-b *:border-r *:border-gray-200 border-gray-200">
            {data?.map((d) => {
              const { code, name } = d;
              const ssg = code.substring(2, 5);
              const isGu = Number(ssg) > 0;

              return (
                <div
                  key={d.code}
                  onClick={() => handleClickData(d, isGu)}
                  className="p-2 cursor-pointer hover:bg-slate-200"
                >
                  {isGu ? getFullGuName(name) : name}
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}
