import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/atoms/LoadingSpinner';
import ProtectedRoute from './components/hooks/ProtectedRoute';
import StakeholderRoute from './components/hooks/StakeholderRoute';
import RedirectIfLoggedIn from './components/hooks/RedirectIfLoggedIn';


const OnBoarding = lazy(() => import('./components/pages/OnBoarding'));
const SignIn = lazy(() => import('./components/pages/SignIn'));
const SignUp = lazy(() => import('./components/pages/SignUpMobile'));
const HomeMobile = lazy(() => import('./components/pages/HomeMobile'));
const WasteTracker = lazy(() => import('./components/pages/WasteTracker'));
const NearbySmartBin = lazy(() => import('./components/pages/NearbySmartBin'));
const SmartBinDetail = lazy(() => import('./components/pages/SmartBinDetail'));
const ReportSmartBin = lazy(() => import('./components/pages/ReportSmartBin'));
const RecyclingGuide = lazy(() => import('./components/pages/RecyclingGuide'));
const WasteBankDetail = lazy(() => import('./components/pages/WasteBankDetail'));
const ReportListPage = lazy(() => import('./components/pages/ReportListPage'));
const ReportDetail = lazy(() => import('./components/pages/ReportDetail'));
const CreateReport = lazy(() => import('./components/pages/CreateReportPage'));
const JoinCleanUpPage = lazy(() => import('./components/pages/JoinCleanUpPage'));
const Communities = lazy(() => import('./components/pages/Community'));
const CommunityDetail = lazy(() => import('./components/pages/CommunityDetailPage'));
const CommunityContent = lazy(() => import('./components/pages/CommunityContentPage'));
const MyAccount = lazy(() => import('./components/pages/MyAccount'));
const SmartBinScanner = lazy(() => import('./components/pages/SmartBinScanner'));
const BinVerified = lazy(() => import('./components/pages/BinVerified'));
const WeightDetected = lazy(() => import('./components/pages/WeightDetected'));
const SmartBinResult = lazy(() => import('./components/pages/SmartBinResult'));
const PickupWasteBank = lazy(() => import('./components/pages/PickUpWasteBank'));
const PickupWasteBankDetail = lazy(() => import('./components/pages/PickUpWasteBankDetail'));
const PickupScheduleForm = lazy(() => import('./components/pages/PickUpSchedule'));
const PickupConfirmation = lazy(() => import('./components/pages/PickUpConfirmation'));
const PickupConfirmationResult = lazy(() => import('./components/pages/PickUpConfirmationResult'));
const MyEcoRewards = lazy(() => import('./components/pages/MyEcoRewards'));
const Redeem = lazy(() => import('./components/pages/RedeemPage'));
const ChallengeDetailPage = lazy(() => import('./components/pages/ChallengeDetailPage'));
const NewsDetailPage = lazy(() => import('./components/pages/NewsDetail'));
const Statistics = lazy(() => import('./components/pages/Statistics'));
const EditProfile = lazy(() => import('./components/pages/EditProfilePage'));
const Settings = lazy(() => import('./components/pages/Settings'));
const LeaderBoard = lazy(() => import('./components/pages/Leaderboard'));
const ActivityHistory = lazy(() => import('./components/pages/ActivityHistory'));


const Welcome = lazy(() => import('./components/pages/Welcome'));
const LoginPage = lazy(() => import('./components/pages/Login'));
const Home = lazy(() => import('./components/pages/Home'));
const Profil = lazy(() => import('./components/pages/Profil'));
// const SignUpPage = lazy(() => import('./components/pages/SignUp'));
const ResendActivationPage = lazy(() => import('./components/pages/ResendActivation'));
const Users = lazy(() => import('./components/pages/Users'));
const AddUser = lazy(() => import('./components/pages/AddUser'));
const UpdateUser = lazy(() => import('./components/pages/UpdateUser'));
const ActivateUser = lazy(() => import('./components/pages/ActivateUser'));
const Portal = lazy(() => import('./components/pages/Portal'));
const BankSampah = lazy(() => import('./components/pages/BankSampah'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Navigate to="/OnBoarding" />} />
        <Route path="/OnBoarding" element={<RedirectIfLoggedIn><OnBoarding /></RedirectIfLoggedIn>} />
        <Route path="/SignIn" element={<RedirectIfLoggedIn><SignIn /></RedirectIfLoggedIn>} />
        <Route path="/SignUp" element={<RedirectIfLoggedIn><SignUp /></RedirectIfLoggedIn>} />
        <Route path="/HomeMobile" element={<RedirectIfLoggedIn><HomeMobile /></RedirectIfLoggedIn>} />
        <Route path="/WasteTracker" element={<RedirectIfLoggedIn><WasteTracker /></RedirectIfLoggedIn>} />
        <Route path="/Leaderboard" element={<StakeholderRoute><LeaderBoard /></StakeholderRoute>} />
        <Route path="/ActivityHistory" element={<StakeholderRoute><ActivityHistory /></StakeholderRoute>} />
        <Route path="/NearbySmartBin" element={<StakeholderRoute><NearbySmartBin /></StakeholderRoute>} />
        <Route path="/SmartBinDetail/:id" element={<StakeholderRoute><SmartBinDetail /></StakeholderRoute>} />
        <Route path="/ReportSmartBin/:id" element={<StakeholderRoute><ReportSmartBin /></StakeholderRoute>} />
        <Route path="/WasteBankDetail/:id" element={<RedirectIfLoggedIn><WasteBankDetail /></RedirectIfLoggedIn>} />
        <Route path="/ReportIllegalDumping" element={<StakeholderRoute><ReportListPage /></StakeholderRoute>} />
        <Route path="/ReportDetail/:id" element={<StakeholderRoute><ReportDetail /></StakeholderRoute>} />
        <Route path="/CreateReport" element={<StakeholderRoute><CreateReport /></StakeholderRoute>} />
        <Route path="/JoinCleanUp/:id" element={<StakeholderRoute><JoinCleanUpPage /></StakeholderRoute>} />
        <Route path="/Community" element={<StakeholderRoute><Communities /></StakeholderRoute>} />
        <Route path="/CommunityDetail/:id" element={<StakeholderRoute><CommunityDetail /></StakeholderRoute>} />
        <Route path="/CommunityContent/:id" element={<StakeholderRoute><CommunityContent /></StakeholderRoute>} />
        <Route path="/RecyclingGuide" element={<StakeholderRoute><RecyclingGuide /></StakeholderRoute>} />
        <Route path="/MyAccount" element={<StakeholderRoute><MyAccount /></StakeholderRoute>} />
        <Route path="/EditProfile" element={<StakeholderRoute><EditProfile /></StakeholderRoute>} />
        <Route path="/Settings" element={<StakeholderRoute><Settings /></StakeholderRoute>} />
        <Route path="/SmartBinScanner" element={<StakeholderRoute><SmartBinScanner /></StakeholderRoute>} />
        <Route path="/BinVerified" element={<StakeholderRoute><BinVerified /></StakeholderRoute>} />
        <Route path="/WeightDetected" element={<StakeholderRoute><WeightDetected /></StakeholderRoute>} />
        <Route path="/SmartBinResult" element={<StakeholderRoute><SmartBinResult /></StakeholderRoute>} />
        <Route path="/PickUpWasteBank" element={<RedirectIfLoggedIn><PickupWasteBank /></RedirectIfLoggedIn>} />
        <Route path="/PickUpWasteBankDetail/:id" element={<RedirectIfLoggedIn><PickupWasteBankDetail /></RedirectIfLoggedIn>} />
        <Route path="/PickUpScheduleForm/:id" element={<RedirectIfLoggedIn><PickupScheduleForm /></RedirectIfLoggedIn>} />
        <Route path="/PickUpConfirmation" element={<RedirectIfLoggedIn><PickupConfirmation /></RedirectIfLoggedIn>} />
        <Route path="/PickUpConfirmationResult/:id" element={<RedirectIfLoggedIn><PickupConfirmationResult /></RedirectIfLoggedIn>} />
        <Route path="/MyEcoReward" element={<StakeholderRoute><MyEcoRewards /></StakeholderRoute>} />
        <Route path="/Redeem" element={<StakeholderRoute><Redeem /></StakeholderRoute>} />
        <Route path="/ChallengeDetail/:id" element={<StakeholderRoute><ChallengeDetailPage /></StakeholderRoute>} />
        <Route path="/NewsDetail/:id" element={<StakeholderRoute><NewsDetailPage /></StakeholderRoute>} />
        <Route path="/Statistics" element={<StakeholderRoute><Statistics /></StakeholderRoute>} />


        <Route path="/Welcome" element={<RedirectIfLoggedIn><Welcome /></RedirectIfLoggedIn>} />
        <Route path="/Login" element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
        <Route path="/ResendAktivasi" element={<RedirectIfLoggedIn><ResendActivationPage /></RedirectIfLoggedIn>} />
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path="/Users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/TambahUser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        <Route path="/UpdateUser/:tipe/:uid" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
        <Route path="/AktivasiAkun/:uid/:email/:password" element={<RedirectIfLoggedIn><ActivateUser /></RedirectIfLoggedIn>} />
        <Route path="/Portal" element={<StakeholderRoute><Portal /></StakeholderRoute>} />
        <Route path="/BankSampah" element={<StakeholderRoute><BankSampah /></StakeholderRoute>} />
      </Routes>
    </Suspense>
  );
};

export default App;
