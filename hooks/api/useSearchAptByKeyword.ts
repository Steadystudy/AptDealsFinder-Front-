import { fetchAptsByKeyword } from '@/apis/getHandlers';
import { APTInfo } from '@/types/AptType';
import { useClickedAreaStore } from '@/zustand/useClickedArea';
import { useQuery } from '@tanstack/react-query';

export default function useSearchAptByKeyword(keyword: string) {
  const { center } = useClickedAreaStore();

  const { data } = useQuery<APTInfo[]>({
    queryKey: ['keywordData', keyword, center],
    queryFn: () => fetchAptsByKeyword(keyword, center),
  });

  return data || [];
}
