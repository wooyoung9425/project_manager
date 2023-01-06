import { Link,useNavigate } from "react-router-dom";
import { util,messageBox } from '../../allutils';
import config from "../../config";
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../../repositories/accountRepository';

//공통적으로 상단에 배치되는 메뉴 부분입니다.
//상단 메뉴에서 동작하는 로그아웃 기능이 구현되어 있습니다.
const HeaderMolecule = () => {
    //리코일로부터 로그인 저장값을 가져옵니다.
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const navigate = useNavigate();  //화면 이동을 위한 선언

    //마우스로 상위 메뉴를 클릭했을 때, 하위 메뉴를 표시하기 위한 함수
    const btnShowMenu = (e:any) => {
        e.preventDefault();
        let target:HTMLElement = e.target;
        let targetClass = `.data-${target.getAttribute('data-value')}`;
        let doc = document.getElementById("navigation");
        let list = doc?.querySelectorAll(".submenu-tab");
        if (list !== null && list !== undefined) {
            for(let i = 0; i < list.length; i++) {
                util.RemoveClass(list[i] as HTMLElement, "show");
            }
        }
        let targets = doc?.querySelectorAll(targetClass);
        if (targets !== null && targets !== undefined) {
            for(let i = 0; i < targets.length; i++) {
                util.AddClass(targets[i] as HTMLElement, "show");
            }
        }
    };

    //마우스로 상위 메뉴를 클릭했을 때, 하위 메뉴를 표시하기 위한 함수
    const btnSetupMenu = (e:any) => {
        e.preventDefault();
        let doc = document.getElementById("mainsetuplayer") as HTMLElement;
        util.ToggleClass(doc, "show");
    };

    //로그아웃을 합니다.
    const btnLogout = () => {
        messageBox.Confirm("Are you sure, logout?", () => {
            util.removeCookie(config.key);  //쿠키를 삭제합니다.
            setManager({});  //리코일을 초기화 합니다.
            navigate("/");  //로그인 화면으로 이동합니다.
        });
    };

    return (
        <div className="topbar">
            <div className="topbar-inner">
                <div className="topbar-left text-center text-lg-left">
                    <a href="/main" className="logo">
                        <span>
                            <img src="#" className="logo-lg logo-light" />
                        </span>
                    </a>
                </div>
                <nav className="navbar-custom">    
                    <ul className="list-unstyled topbar-nav float-right mb-0"> 
                        <li className="dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false" onClick={btnSetupMenu}>
                                <span className="ml-1 nav-user-name hidden-sm"><Link to="/manager/info" style={{"color":"white"}}>관리자</Link> <i className="mdi mdi-chevron-down"></i> </span>
                            </a>
                            <div id="mainsetuplayer" className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="/setting"><i className="ti-settings text-muted mr-2"></i> 비밀번호변경</a>
                                <div className="dropdown-divider mb-0"></div>
                                <a className="dropdown-item" href="#" onClick={btnLogout}><i className="ti-power-off text-muted mr-2"></i> 로그아웃</a>
                            </div>
                        </li>
                    </ul>
                    <div id="navigation">
                    <ul className="list-unstyled navigation-menu">
                        <li className="main-nav-item">
                            <Link to="/main" className="navbar-link">Home</Link>                        
                        </li>
                        <li className="main-nav-item">
                            <a href="#" className="navbar-link">
                                <span data-value="member" onClick={btnShowMenu}>사용자관리</span>
                            </a> 
                            <ul className="submenu-tab data-member">
                                <li><Link to="/member/list">사용자관리</Link></li>
                                <li><Link to="/member/confirm">사용자승인</Link></li>
                            </ul>                           
                        </li>
                        <li className="main-nav-item">
                            <a href="#" className="navbar-link">
                                <span data-value="customer" onClick={btnShowMenu}>고객사관리</span>
                            </a> 
                            <ul className="submenu-tab data-customer">
                                <li><Link to="/customer/list">고객사관리</Link></li>
                                <li><Link to="/customer/projects">프로젝트관리</Link></li>
                            </ul>                           
                        </li>
                        <li className="main-nav-item">
                            <a href="#" className="navbar-link">
                                <span data-value="msg" onClick={btnShowMenu}>메시지</span>
                            </a> 
                            <ul className="submenu-tab data-msg">
                                <li><Link to="/msg/email">Email관리</Link></li>
                                    <li><Link to="/msg/QnAemail">Email 불편사항 관리</Link></li>
                                <li><Link to="/msg/sms">SMS관리</Link></li>
                            </ul>                           
                        </li>
                           
                        <li className="main-nav-item">
                            <a href="#" className="navbar-link">
                                <span data-value="stat" onClick={btnShowMenu}>통계</span>
                            </a> 
                            <ul className="submenu-tab data-stat">
                                <li><Link to="/stat/period">기간별 사용량</Link></li>
                                <li><Link to="/stat/server">서버별 사용량</Link></li>
                            </ul>                           
                        </li>
                    </ul>
                </div>
                </nav>
            </div>
        </div>
    );
}

export default HeaderMolecule;