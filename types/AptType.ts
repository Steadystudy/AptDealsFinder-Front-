export type AptDealInfo = {
  no: number;
  apt_seq: string;
  apt_nm: string;
  exclu_use_ar: number;
  deal_amount: string;
  deal_year: number;
  deal_month: number;
  deal_day: number;
  lat: number;
  lng: number;
};

export type APTInfo = AptDealInfo & {
  ssg_cd: string;
  umd_cd: string;
  floor: number;
  umd_nm: string;
  jibun: string;
  road_nm_sgg_cd: string;
  road_nm: string;
  road_nm_bonbun: number;
  road_nm_bubun: number;
  build_year: number;
};

export type MarkAptInfo = Pick<AptDealInfo, 'apt_seq' | 'apt_nm' | 'lat' | 'lng'>;

export type ChartProps = {
  name: string;
  '3.3㎡당 가격': number;
  '거래 개수': number;
};
