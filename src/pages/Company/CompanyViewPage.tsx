import { useState, useEffect } from 'react';
import { Layout,DataGrid } from '../../allcomponents';
import { useRecoilState, atom } from 'recoil';
import { ManagerLogin } from '../../repositories/accountRepository';
import { apiHelper, util } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User, Company } from '../../alltypes';
import { useNavigate,useParams } from 'react-router-dom';
import { listenerCount } from 'process';

function CompanyViewPage(props:any) {
    const [manager, setManager] = useRecoilState(ManagerLogin);
    const [isBind, SetIsBind] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [company, setCompany] = useState<Company>();
    const { companyid } = useParams();
    const navigate = useNavigate();
    const [price, setPrice] = useState<String>()
    const [accept,setAccept]=useState<String>()

    const DataBind = () => {
        if (!isBind) {
            apiHelper.Get(`/company/view/${companyid}`, {}, (rst:ReturnValues<Company>) => {
                if (rst.check && rst.data !== null && rst.data !== undefined) {
                    console.log(typeof rst.data.masterID)
                    setCompany(rst.data);
                    if (rst.data.isAccept === false) {
                        setAccept("미승인")
                    } else {
                        setAccept("승인")
                    }
                    if (String(rst.data.masterID) === "2" ) {
                        setPrice("베이직")
                    } else if(String(rst.data.masterID) === "3") {
                        setPrice("프리미엄")
                    } else {
                        setPrice("미정")
                    }
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
        navigate("/company/list");
    };
    const companyEdit = () => {
        if (isEdit === true) {
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }
    const onChangeEdit = () => {
        
    }

    //bootstrap의 기본 구성 요소인 row, col 에 개념은 인터넷에서 bootstrap grid 로 검색해서 참고하세요
    return (
        <Layout section="Member" title="회원상세">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>회사명</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={company?.name} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <input type="text" placeholder={company?.name} onChange={ onChangeEdit} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>사업자 번호</span></div>
                                    <div className="col-6">
                                        <input type="text" value={company?.businessRegNo} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>담당자</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={company?.employee} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <input type="text" placeholder={company?.employee} onChange={onChangeEdit} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>연락처</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={company?.phone} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <input type="text" placeholder={company?.phone} onChange={onChangeEdit} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>주소</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={company?.addr1} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <input type="text" placeholder={company?.addr1} onChange={onChangeEdit} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>상세주소</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={company?.addr2} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <input type="text" placeholder={company?.addr2} onChange={onChangeEdit} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>요금제</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={String(price)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <select className="form-select form-select-lg mb-3" onChange={ onChangeEdit} aria-label="Default select example" style={{ "fontSize": "18px", width:"650px", height: "40px", marginTop:"5px", borderRadius:"10px"}}>
                                                <option selected>요금제 선택</option>
                                                <option value="2"> 베이직 </option>
                                                <option value="3"> 프리미엄  </option>
                                            </select>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" >
                                <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                    <div className="col-2"></div>    
                                    <div className="col-2">
                                        <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>승인</span></div>
                                    <div className="col-6">
                                        {!isEdit ?
                                            <input type="text" value={String(accept)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                            :
                                            <select className="form-select form-select-lg mb-3" onChange={ onChangeEdit} aria-label="Default select example" style={{ "fontSize": "18px", width:"650px", height: "40px", marginTop:"5px", borderRadius:"10px"}}>
                                                <option selected>승인 여부</option>
                                                <option value="true"> 승인 </option>
                                                <option value="false"> 미승인  </option>
                                            </select>
                                        }
                                        {/* <input type="text" value={String(accept)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{ "marginBottom": "20px" }}>
                                <div className='col-2'></div>
                                {!isEdit ?
                                    <>
                                    <div className='col-4'>
                                    <button type="button" className="btn btn-outline-primary btn-lg" style={{ margin: "10px", width: "100%", fontSize: "20px" }} onClick={ companyEdit}>
                                            수정
                                        </button>
                                    </div>
                                    <div className='col-4'>
                                        <button type="button" className="btn btn-outline-primary btn-lg" style={{ margin: "10px", width:"100%", fontSize:"20px"}}> 삭제 </button>
                                    </div>
                                    
                                    </>
                                    :
                                    <>
                                    <div className='col-8'>
                                    <button type="button" className="btn btn-outline-primary btn-lg" style={{ margin: "10px", width: "100%", fontSize: "20px" }} onClick={ companyEdit}>
                                            수정 완료
                                        </button>
                                    </div>
                                    </>
                                }
                            </div> 
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

export default CompanyViewPage;