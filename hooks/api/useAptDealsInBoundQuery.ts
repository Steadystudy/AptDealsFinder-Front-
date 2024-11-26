import { fetchAptDealsInBound } from '@/apis/getHandlers';
import { APTInfo } from '@/types/AptType';
import { Bound } from '@/types/MapType';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useAptDealsInBoundQuery(bound: Bound | null) {
  const { data } = useQuery<APTInfo[]>({
    queryKey: ['aptDealsInBoundData', bound],
    queryFn: () => fetchAptDealsInBound(bound),
    placeholderData: keepPreviousData,
  });

  return data || [];
}
