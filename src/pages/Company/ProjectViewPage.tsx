import { useState, useEffect } from 'react';
import { Layout,DataGrid } from '../../allcomponents';
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin,projectType } from '../../repositories/accountRepository';
import { apiHelper, util } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User, Company } from '../../alltypes';
import { useNavigate,useParams } from 'react-router-dom';
import messageBox from '../../utility/MessageBox';
import TunnelProject from './ProjectType/TunnelProject';
import BridgeProject from './ProjectType/BridgeProject';
import DamProject from './ProjectType/DamProject';
import AirportProject from './ProjectType/AirportProject';


function ProjectViewPage(props:any) {
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const [isBind, SetIsBind] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [project, setProject] = useState<any>({
        title: "", projectType: "", settings: "", createdAt: "",
        updataedAt: ""
    });
    // const [setting, setSettings] = useState<any>();
    const [setting, setSettings] = useRecoilState(projectType);
    // const [company, setProject] = useState<Company>();
    const { projectid } = useParams();
    const navigate = useNavigate();
    const [price, setPrice] = useState<String>()
    const [accept,setAccept]=useState<String>()

    const DataBind = () => {
        if (!isBind) {
            apiHelper.Get(`/project/view/${projectid}`, {}, (rst:ReturnValues<any>) => {
                if (rst.check && rst.data !== null && rst.data !== undefined) {
                    console.log(rst.data.settings)
                    let data = {
                        title: rst.data.title, projectType: rst.data.projectType, settings: rst.data.settings,
                        createdAt:rst.data.createdAt, updatedAt:rst.data.updatedAt
                    }
                    let setting = JSON.parse(rst.data.settings)
                    console.log(setting.bridge_kor)
                    setSettings(setting)
                    setProject(data)
                    SetIsBind(true);
                }
            });
        }
    };

    //useEffect를 기준으로 페이지 Initialize에 해당하는 요소는 상단에, 개별 구현 요소(개별 함수)는 하단에 배치합니다.
    useEffect(function() {
        DataBind();
    }, [isBind]);

    const btnList = () => {
        navigate("/company/projects");
    };
    
    
    //bootstrap의 기본 구성 요소인 row, col 에 개념은 인터넷에서 bootstrap grid 로 검색해서 참고하세요
    return (
        <Layout section="Member" title="프로젝트 상세">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='row' style={{"margin":"30px"}}>
                                <div className="col-5"></div>
                                <div className="col-5"><h1 style={{ "alignItems": "center" }}> 프로젝트 정보 </h1></div>
                                <div className="col-5"></div>    
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"15px"}}>프로젝트 명</span></div>
                                    <div className="col-6">
                                        <input type="text" value={project?.title} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"15px"}}>시설물</span></div>
                                    <div className="col-6">
                                        <input type="text" value={project?.projectType} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" > 
                                
                            {/*시설물마다 설정 페이지 다름*/}
                            {
                                project?.projectType === 'Tunnel' ? <TunnelProject /> :
                                    project?.projectType === 'Bridge' ? <BridgeProject /> :
                                        project?.projectType === 'Dam' ? <DamProject /> :
                                            project?.projectType === 'Airport' ? <AirportProject/>: ""}
                                
                            </div>
                        </div>
                    </div>
                </div>
                
             </div>
             <div className="row">
                <div className="col-6">
                    <button type="button" className="btn btn-primary" onClick={btnList}>목록보기</button>
                </div>
             </div>
             {/* <hr style={{borderTop:"1px solid #DFDFDF"}} /> */}
        </Layout>
    );
};

export default ProjectViewPage;