import { useState, useEffect } from 'react';
import { Layout,DataGrid } from '../../allcomponents';
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../../repositories/accountRepository';
import { apiHelper, util } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User } from '../../alltypes';
import { useNavigate,useParams } from 'react-router-dom';

function ProjectViewPage(props:any) {
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const [isBind, SetIsBind] = useState(false);
    const [user, setUser] = useState<User>();
    const { userid } = useParams();
    const navigate = useNavigate();
    
    const DataBind = () => {
        if (!isBind) {
            // apiHelper.Post(`/account/member/view/${userid}`, {}, (rst:ReturnValues<User>) => {
            //     if (rst.check && rst.data !== null && rst.data !== undefined) {
            //         setUser(rst.data);
            //         SetIsBind(true);
            //     }
            // });
        }
    };

    //useEffect를 기준으로 페이지 Initialize에 해당하는 요소는 상단에, 개별 구현 요소(개별 함수)는 하단에 배치합니다.
    useEffect(function() {
        DataBind();
    }, [isBind]);

    const btnList = () => {
        navigate("/member/list");
    };

    //bootstrap의 기본 구성 요소인 row, col 에 개념은 인터넷에서 bootstrap grid 로 검색해서 참고하세요
    return (
        <Layout section="Member" title="회원상세">
             <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <label>회원명:</label>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <label>연락처:</label>
                            <p>{user?.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <label>등급:</label>
                            <p>{(user?.role === "admin") ? "관리자" : "일반회원"}</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <label>가입일:</label>
                            <p>{(user?.createdAt !== null && user?.createdAt !== undefined) ? util.DateString(user?.createdAt, "yyyy.MM.DD") : ""}</p>
                        </div>
                    </div>
                </div>
             </div>
             <hr style={{borderTop:"1px solid #DFDFDF"}} />
             <div className="row">
                <div className="col-6">
                    <button type="button" className="btn btn-primary" onClick={btnList}>목록보기</button>
                </div>
             </div>
        </Layout>
    );
};

export default ProjectViewPage;