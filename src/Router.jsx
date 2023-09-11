import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/GNB/Home";
import Find from "./pages/GNB/Find";
import Market from "./pages/GNB/Market";
import Community from "./pages/GNB/Community";
import More from "./pages/GNB/More";
import GardenDetail from "./pages/GardenDetail/GardenDetail";
import HomeGarden from "./pages/HomeList/HomeGarden.jsx";
import HomeManage from "./pages/HomeList/HomeManage.jsx";
import HomeDaily from "./pages/HomeList/HomeDaily.jsx";
import HomeCCTV from "./pages/HomeList/HomeCCTV.jsx";
import Kakao from "./pages/Kakao/Kakao";
import PaymentPage from "./pages/Payment/Payment.jsx";
import HomeDailyWrite from "./pages/HomeList/HomeDailyWrite.jsx";
import Write from "./pages/Write/Write";
import PostInfoPage from "./pages/PostInfo/PostInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth/kakao/:type" element={<Kakao />} />
          <Route path="/home/garden" element={<HomeGarden />} />
          <Route path="/home/write" element={<HomeDailyWrite />} />
          <Route path="/home/manage" element={<HomeManage />} />
          <Route path="/home/daily" element={<HomeDaily />} />
          <Route path="/home/cctv" element={<HomeCCTV />} />
          <Route path="/find" element={<Find />} />
          <Route path="/find/gardenDetail" element={<GardenDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/community" element={<Community />} />
          <Route path="/more" element={<More />} />
          <Route path="/test" element={<More />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/postinfo" element={<PostInfoPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
};
export default Router;
