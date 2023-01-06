//선언된 모든 페이지에 대한 모음입니다.
import Login from "./pages/LoginPage";
import Main from "./pages/MainPage";
import ManagerInfoPage from "./pages/ManagerInfoPage";
import MemberList from "./pages/Member/MemberListPage";
import MemberView from "./pages/Member/MemberViewPage";
import MemberConfirm from "./pages/Member/MemberConfirm";
import CustomerListPage from "./pages/Customer/CustomerListPage";
import CustomerAdd from "./pages/Customer/CustomerAdd";
import CustomerProject from "./pages/Customer/CustomerProject";
import CustomerView from "./pages/Customer/CustomerViewPage";
import ProjectView from "./pages/Customer/ProjectViewPage";
import MessageEmailList from "./pages/Message/MessageEmailList";
import MesseageEmailView from "./pages/Message/MesseageEmailViewPage";
import MessageEmailNew from "./pages/Message/MessageEmailNew";
import QnAEmailList from "./pages/Message/QnAEmailList";
import MesseageQnaView from "./pages/Message/MesseageQnaViewPage";
import MessageSMSList from "./pages/Message/MessageSMSList";
import MesseageSMSView from "./pages/Message/MesseageSMSViewPage";
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
    CustomerListPage,
    CustomerView,
    CustomerAdd,
    CustomerProject,
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