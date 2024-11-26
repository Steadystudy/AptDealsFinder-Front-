import Chatbot from '@/components/ChatBot/Chatbot';
import Header from '@/components/Header';
import AptDetailSidebar from '@/components/Map/AptDetailSidebar';
import AptMarker from '@/components/Map/AptMarker';
import BreadSig from '@/components/Map/BreadSig';
import DrawingDistance from '@/components/Map/DrawingDistance';
import KaKaoMap from '@/components/Map/KaKaoMap';
import MapLoading from '@/components/Map/MapLoading';
import MapMenubar from '@/components/Map/MapMenubar';
import Places from '@/components/Map/Places';
import RegArea from '@/components/Map/RegArea';
import SearchAptList from '@/components/SearchAptList';

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative w-full ">
        <SearchAptList />
        <MapLoading />
        <KaKaoMap>
          <RegArea />
          <AptDetailSidebar />
          <MapMenubar />
          <Places />
          <DrawingDistance />
          <AptMarker />
          <BreadSig />
        </KaKaoMap>
      </div>
      <Chatbot />
    </>
  );
}
