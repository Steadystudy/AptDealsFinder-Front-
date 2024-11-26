import { getRegList } from '@/apis/getHandlers';
import { RegCode } from '@/types/MapType';
import { useQuery } from '@tanstack/react-query';

export const useGetRegCodes = (regcode: string) => {
  const { data } = useQuery<RegCode[]>({
    queryKey: ['regCodeData', regcode],
    queryFn: () => getRegList(regcode),
  });

  return data || [];
};
