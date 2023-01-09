import { Routes, Route } from 'react-router-dom';
import {
  Login, Main,
  MemberList, MemberView, ManagerInfoPage, MemberConfirm,
  CompanyListPage, CompanyView, CompanyAdd, CompanyProject, ProjectView,
  MessageEmailList, MessageEmailNew, MesseageEmailView,
  QnAEmailList, MesseageQnaView,
  MessageSMSList, MesseageSMSView,
  StatPeriod, StatServer

} from './allpages';
import './styles/Global.css';

function App() {
  return (
      <Routes>
      <Route path="/" element={<Login />} />
        {/* 대시보드 */}
        <Route path="/main" element={<Main />} />
        {/* 관리자 */}
        <Route path="/manager/info" element={<ManagerInfoPage />} />
        {/* 사용자 */}
        <Route path="/member" element={<MemberList/>}/>
        <Route path="/member/list" element={<MemberList />} />
        <Route path="/member/view/:userid" element={<MemberView/>}/>
        <Route path="/member/confirm" element={<MemberConfirm />} />
        {/* 고객사 */}
        <Route path="/company" element={<CompanyListPage/>}/>
        <Route path="/company/list" element={<CompanyListPage />} />
        <Route path="/company/view/:companyid" element={<CompanyView />} />
        <Route path="/company/add/:" element={<CompanyAdd/>}/>
        <Route path="/company/projects" element={<CompanyProject />} />
        <Route path="/company/projects/:projectid" element={<ProjectView />} />
        {/* 메세지 */}
        <Route path="/msg" element={<MessageEmailList/>}/>
        <Route path="/msg/email" element={<MessageEmailList />} />
        <Route path="/msg/email/new" element={<MessageEmailNew />} />
        <Route path="/msg/email/:userid" element={<MesseageEmailView/>}/>
        <Route path="/msg/QnAemail" element={<QnAEmailList  />} />
        <Route path="/msg/QnAemail/:userid" element={<MesseageQnaView />} />
        <Route path="/msg/sms" element={<MessageSMSList />} />
        <Route path="/msg/sms/:userid" element={<MesseageSMSView />} />
        {/* 통계 */}
        <Route path="/stat" element={<StatPeriod/>}/>
        <Route path="/stat/period" element={<StatPeriod/>}/>
        <Route path="/stat/server" element={<StatServer/>}/>

      </Routes>
  );
}

export default App;
