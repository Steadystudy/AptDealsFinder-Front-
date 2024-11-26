import { ChartProps } from '@/types/AptType';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from 'recharts';

export default function AptChart({ data }: { data: ChartProps[] }) {
  return (
    <>
      {data ? (
        <ResponsiveContainer width="100%" minHeight={340} className={`border-b-2`}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId="left"
              height={360}
              label={{
                value: '(단위: 만원)',
                angle: 0,
                position: 'top',
                offset: -30,
                fontSize: 10,
                fill: '#000000', // 텍스트 색상
              }}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="3.3㎡당 가격" stroke="#8884d8" yAxisId={'left'} />
            <Line
              type="monotone"
              dataKey="거래 개수"
              stroke="#82ca9d"
              dot={{
                r: 6,
                fill: 'red', // 점의 색상을 빨간색으로 설정
                stroke: 'black', // 점의 테두리 색상을 검은색으로 설정
                strokeWidth: 2,
              }}
              yAxisId={'right'}
              strokeWidth={0}
            />
            <Text
              x={370} // X 위치 (차트의 오른쪽)
              y={300} // Y 위치 (차트의 아래쪽)
              textAnchor="middle" // 텍스트의 정렬 (중앙 정렬)
              fontSize={16} // 텍스트 크기
              fill="#000000" // 텍스트 색상
            >
              (만원)
            </Text>
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>최근 2년간 거래 내역이 없습니다.</div>
      )}
    </>
  );
}
