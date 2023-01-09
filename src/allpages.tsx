//선언된 모든 페이지에 대한 모음입니다.
import Login from "./pages/LoginPage";
import Main from "./pages/MainPage";
//관리자
import ManagerInfoPage from "./pages/ManagerInfoPage";
//사용자
import MemberList from "./pages/Member/MemberListPage";
import MemberView from "./pages/Member/MemberViewPage";
import MemberConfirm from "./pages/Member/MemberConfirm";
//고객사
import CompanyListPage from "./pages/Company/CompanyListPage";
import CompanyAdd from "./pages/Company/CompanyAdd";
import CompanyProject from "./pages/Company/CompanyProject";
import CompanyView from "./pages/Company/CompanyViewPage";
import ProjectView from "./pages/Company/ProjectViewPage";
//메세지
import MessageEmailList from "./pages/Message/MessageEmailList";
import MesseageEmailView from "./pages/Message/MesseageEmailViewPage";
import MessageEmailNew from "./pages/Message/MessageEmailNew";
import QnAEmailList from "./pages/Message/QnAEmailList";
import MesseageQnaView from "./pages/Message/MesseageQnaViewPage";
import MessageSMSList from "./pages/Message/MessageSMSList";
import MesseageSMSView from "./pages/Message/MesseageSMSViewPage";
//통계
import StatPeriod from "./pages/State/StatPeriod";
import StatServer from "./pages/State/StatServer";

export {
    Login,
    Main,
    //시스템 관리자
    ManagerInfoPage,
    //사용자
    MemberList,
    MemberView,
    MemberConfirm,
    //고객사
    CompanyListPage,
    CompanyView,
    CompanyAdd,
    CompanyProject,
    ProjectView,
    //메세지
    MessageEmailList,
    MesseageEmailView,
    MessageEmailNew,
    QnAEmailList, 
    MesseageQnaView,
    MessageSMSList,
    MesseageSMSView,
    //통계
    StatPeriod,
    StatServer
}