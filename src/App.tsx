import { Routes, Route } from 'react-router-dom';
import {
  Login,Main,MemberList,MemberView,ManagerInfoPage
} from './allpages';
import './styles/Global.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/manager/info" element={<ManagerInfoPage />} />
        <Route path="/member" element={<MemberList/>}/>
        <Route path="/member/list" element={<MemberList />} />
        <Route path="/member/view/:userid" element={<MemberView/>}/>
      </Routes>
  );
}

export default App;
