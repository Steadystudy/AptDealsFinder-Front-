export type Coordinates = {
  lat: number;
  lng: number;
};

export type Area = {
  key: number;
  path: Coordinates[];
  polygon: any;
  center: Coordinates;
  sido: string;
  sidonm: string;
  ssg: string;
  ssgnm: string;
};

export type ClickArea = {
  key: number;
  center: Coordinates;
  sido: string;
  sidonm: string;
  ssg: string;
  ssgnm: string;
  path: Coordinates[];
};

export type SigProperties = {
  OBJECTID: number;
  sgg: string;
  sido: string;
  sidonm: string;
  sggnm: string;
  GUGUN_CENTER_LAT: number;
  GUGUN_CENTER_LNG: number;
};

export type GuProperties = {
  adm_nm: string;
  adm_cd2: string;
  sgg: string;
  sido: string;
  sidonm: string;
  sggnm: string;
  adm_cd: string;
  GU_CENTER_LNG: number;
  GU_CENTER_LAT: number;
};

export type SigGeometry = {
  type: string;
  coordinates: any;
};

export type Feature = {
  type: string;
  properties: SigProperties;
  geometry: SigGeometry;
};

export type RegCode = {
  name: string;
  code: string;
};

export type Bound = {
  topLat: number;
  rightLng: number;
  bottomLat: number;
  leftLng: number;
};

export type Center = {
  lat: number;
  lng: number;
};
