import { fetchAptDetail } from '@/apis/getHandlers';
import { APTInfo } from '@/types/AptType';
import { useQuery } from '@tanstack/react-query';

export const useAptDetailQuery = (seq: string) => {
  //regcode에 따라

  const { data } = useQuery<APTInfo[]>({
    queryKey: ['aptDetailData', seq],
    queryFn: () => fetchAptDetail(seq),
  });

  // console.log(data);
  return data || [];
};
