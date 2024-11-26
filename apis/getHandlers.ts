import axios from 'axios';
import axiosInstance from './axios';
import { Bound, Center } from '@/types/MapType';

export const getRegList = async (regcode: string) => {
  const url = 'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes';
  const params = 'regcode_pattern=' + regcode + '&is_ignore_zero=true';

  const res = await axios.get(`${url}?${params}`);

  return res.data.regcodes ?? [];
};

export const fetchAptDetail = async (seq: string) => {
  const data = await axiosInstance.get(`/apt/searchByAptSeq?apt_seq=${seq}`);

  return data.data;
};

export const fetchAptDealsInBound = async (bound: Bound | null) => {
  if (!bound) return;

  const { bottomLat, leftLng, rightLng, topLat } = bound;
  const data = await axiosInstance.post(
    `/apt/searchByLatAndLng?topLat=${topLat}&rightLng=${rightLng}&bottomLat=${bottomLat}&leftLng=${leftLng}`,
  );
  return data.data;
};

export const fetchAptsByKeyword = async (searchKeyword: string, center: Center) => {
  if (!searchKeyword) return;
  const { lat, lng } = center;

  const data = await axiosInstance.post(
    `/apt/searchByHardName?searchName=${searchKeyword}&centerLat=${lat}&centerLng=${lng}`,
  );
  return data.data;
};

export const fetchAptPricePerPyeong = async (apt_seq: string) => {
  if (!apt_seq) return;
  const data = await axiosInstance.post(`apt/searchPriceByApt?apt_seq=${apt_seq}`);

  return data.data;
};
