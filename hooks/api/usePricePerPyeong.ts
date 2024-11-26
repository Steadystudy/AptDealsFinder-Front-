import { fetchAptPricePerPyeong } from '@/apis/getHandlers';
import { ChartProps } from '@/types/AptType';
import { useQuery } from '@tanstack/react-query';

export function usePricePerPyeong(seq: string) {
  const { data } = useQuery<ChartProps[]>({
    queryKey: ['AptChartProps', seq],
    queryFn: () => fetchAptPricePerPyeong(seq),
  });

  return data || [];
}
