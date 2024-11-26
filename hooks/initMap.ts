import json from '@/public/real_pos.json';
import { Area, Coordinates, Feature } from '../types/MapType';
import * as turf from '@turf/turf';

const file: any = json; // pos.json 데이터
const newAreas: Area[] = [];

export const initMap = (): Area[] => {
  console.log('init실행');

  file.features.forEach((geojson: Feature) => {
    const type = geojson.geometry.type;
    const coordinates = geojson.geometry.coordinates; // 다각형의 좌표 배열
    const { GUGUN_CENTER_LAT, GUGUN_CENTER_LNG, sgg, sggnm, sido, sidonm, OBJECTID } =
      geojson.properties;
    const gugun_center = { lng: GUGUN_CENTER_LNG, lat: GUGUN_CENTER_LAT };

    coordinates.forEach((coordinateArray: any) => {
      const arr = type === 'Polygon' ? coordinates : coordinateArray;
      const path: Coordinates[] = [];
      const polygon = type === 'Polygon' ? turf.polygon(arr) : turf.multiPolygon([arr]); // MultiPolygon에 맞는 turf.multiPolygon 사용
      arr[0].forEach((coordinate: number[]) => {
        const [lng, lat] = coordinate;
        path.push({ lat, lng });
      });
      newAreas.push({
        key: OBJECTID,
        path,
        sido,
        sidonm,
        ssg: sgg,
        ssgnm: sggnm,
        polygon,
        center: gugun_center,
      });
    });
  });

  return newAreas;
};

// import json from '../public/updated_pos.json';
// import { Area, Coordinates, Feature } from '../types/MapType';
// import * as turf from '@turf/turf';

// const file: any = json; // pos.json 데이터
// const newAreas: Area[] = [];

// export const initMap = (): Area[] => {
//   console.log('init실행');

//   file.features.forEach((geojson: Feature, index: number) => {
//     const type = geojson.geometry.type;
//     const coordinates = geojson.geometry.coordinates; // 다각형의 좌표 배열
//     const { SIGUNGU_CD, GUGUN_CENTER_LAT, GUGUN_CENTER_LNG, SIGUNGU_NM } = geojson.properties;
//     const gugun_center = { lng: GUGUN_CENTER_LNG, lat: GUGUN_CENTER_LAT };

//     coordinates.forEach((coordinateArray: any, idx: number) => {
//       const arr = type === 'Polygon' ? coordinates : coordinateArray;
//       const path: Coordinates[] = [];
//       const polygon = type === 'Polygon' ? turf.polygon(arr) : turf.multiPolygon([arr]); // MultiPolygon에 맞는 turf.multiPolygon 사용
//       arr[0].forEach((coordinate: number[]) => {
//         const [lng, lat] = coordinate;
//         path.push({ lat, lng });
//       });
//       newAreas.push({
//         key: SIGUNGU_NM + index + '~' + idx,
//         name: SIGUNGU_NM,
//         path,
//         location: SIGUNGU_CD,
//         polygon,
//         center: gugun_center,
//       });
//     });
//   });

//   return newAreas;
// };
