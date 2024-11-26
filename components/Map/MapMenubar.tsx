'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import { useMapStore } from '@/zustand/useMapStore';
import { useDistanceStore } from '@/zustand/useDistanceStore';
import { cafeMark, distanceMark, hospitalMark, restaurantMark } from '@/public/images';
import { useToast } from '@/hooks/use-toast';
import { useMarkersStore } from '@/zustand/useMarkersStore';
import useDebounce from '@/lib/useDebounce';
import { CATEGORY_LEVEL } from '@/constants/map.constants';
import { useEffect, useState } from 'react';
import { Marker } from '@/types/MarkerType';
import { categoryCodes } from '@/constants/category.constants';
import { useBoundStore } from '@/zustand/useBoundStore';

export default function MapMenubar() {
  const [category, setCategory] = useState<string | null>();
  const { bound } = useBoundStore();

  const { map, setIsDistanceClick, isDistanceClick } = useMapStore();
  const { initLine } = useDistanceStore();
  const { setMarkers } = useMarkersStore();
  const { toast } = useToast();
  const handleCategory = useDebounce((value: string) => {
    const level = map?.getLevel() ?? CATEGORY_LEVEL;
    if (level > CATEGORY_LEVEL) {
      toast({
        variant: 'destructive',
        title: '지도 범위가 너무 넓습니다',
      });
      return;
    }
    if (category !== value) {
      setCategory(value);
      searchByCategory(map!, value);
    } else {
      setCategory(null);
      setMarkers([]);
    }
  }, 300);

  const searchByCategory = useDebounce((map: kakao.maps.Map, category: string) => {
    const ps = new kakao.maps.services.Places();

    ps.categorySearch(
      // @ts-expect-error 카테고리 타입들어가는데 타입을 string으로 표기함
      category,
      (data, status) => {
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          toast({
            title: `인근 ${categoryCodes[category]}가 없습니다`,
          });
          setMarkers([]);
          return;
        }
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const markers: Marker[] = [];
          for (let i = 0; i < data.length; i++) {
            const {
              x,
              y,
              address_name,
              category_group_name,
              id,
              place_url,
              place_name,
              category_group_code,
            } = data[i];

            markers.push({
              id,
              position: {
                lat: Number(y),
                lng: Number(x),
              },
              place_name,
              address_name,
              category_group_name,
              place_url,
              category_group_code,
            });
            bounds.extend(new kakao.maps.LatLng(Number(y), Number(x)));
          }

          setMarkers(markers);
        }
      },
      {
        bounds: map.getBounds(),
        useMapBounds: true,
      },
    );
  }, 500);

  useEffect(() => {
    if (!map || !category) return;
    if (map.getLevel() <= CATEGORY_LEVEL) {
      searchByCategory(map, category);
    }
  }, [bound]);

  return (
    <div className="absolute z-10 top-6 right-6 border">
      <ul className="flex flex-col items-end">
        <li>
          <Button
            onClick={() => {
              setIsDistanceClick(!isDistanceClick);
              initLine();
            }}
            variant={'mark'}
          >
            <Image sizes="24" fill quality={10} priority src={distanceMark} alt="거리 계산" />
          </Button>
        </li>
        <li>
          <Button variant={'mark'} onClick={() => handleCategory('FD6')}>
            <Image
              sizes="24"
              fill
              quality={10}
              priority
              src={restaurantMark}
              alt="인근 음식점 검색"
            />
          </Button>
        </li>
        <li>
          <Button variant={'mark'} onClick={() => handleCategory('CE7')}>
            <Image sizes="24" fill quality={10} priority src={cafeMark} alt="인근 카페 검색" />
          </Button>
        </li>
        <li>
          <Button variant={'mark'} onClick={() => handleCategory('HP8')}>
            <Image sizes="24" fill quality={10} priority src={hospitalMark} alt="인근 병원 검색" />
          </Button>
        </li>
      </ul>
    </div>
  );
}
