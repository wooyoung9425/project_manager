import React,{useState} from 'react'
import { Layout } from '../../allcomponents';
import { apiHelper } from '../../allutils';
import { ReturnValues } from '../../allmodels';
import { User, Company } from '../../alltypes';
import { useNavigate } from 'react-router-dom';

function CompanyAdd(props: any) {
    const [isBind, SetIsBind] = useState(false);
    const [list, setList] = useState<Company[]>();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>({
        name: "", phone: "", businessRegNo: "", addr1: "",
        addr2: "", masterID: 0, employee: "", isAccept: false
    });
    
    // 고객서 추가 api연결
    const registCompany = () => {
        console.log(company)
        if (!isBind) {
            apiHelper.Post("/company/regist", company, (rst: ReturnValues<Company>) => {
                console.log(rst)
                if (rst.check === true) {
                    alert(" 고객사 정보 추가")
                    SetIsBind(true);
                    navigate('/company/list')
                }
            });
        }
    }

    // 고객사 정보 입력시 정보입력
    const onChangeList = (row_name: string, res: any) => {
        if (row_name === 'masterID') {
            setCompany({...company, [row_name]:Number(res.target.value)})
        } else {
            setCompany({...company, [row_name]:res.target.value})
        }

    }
    // 목록보기로 페이지 이동
    const btnList = () => {
        navigate('/company/list')
    }
    return (
        <Layout section="Company" title="회사 추가">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <div className='row' style={{"margin":"30px"}}>
                            <div className="col-5"></div>
                            <div className="col-5"><h1 style={{ "alignItems": "center" }}> 고객사 정보 </h1></div>
                            <div className="col-5"></div>    
                        </div>
                        <div className="row g-3 align-items-center" >
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>    
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{"fontSize":"18px"}}>회사명</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("name", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>담당자</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("employee", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>주소</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("addr1", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>상세 주소</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("addr2", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>    
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>사업자 번호</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("businessRegNo", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                                </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>회사 메일 도메인</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>연락처</span></div>
                                <div className="col-6">
                                    <input type="text" className="form-control" onChange={ (e:any)=>onChangeList("phone", e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "18px" }} />
                                </div>
                            </div>
                              
                            <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                                <div className="col-2"></div>        
                                <div className="col-2">
                                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "18px" }}>요금제</span></div>
                                <div className="col-6">
                                    <select className="form-select form-select-lg mb-3" onChange={ (e:any)=>onChangeList("masterID", e)} aria-label="Default select example" style={{ "fontSize": "18px", width:"650px", height: "40px", marginTop:"5px", borderRadius:"10px"}}>
                                        <option selected>요금제 선택</option>
                                        <option value="2"> 베이직 </option>
                                        <option value="3"> 프리미엄  </option>
                                    </select>
                                </div>
                                </div>
                                <div className="input-group input-group-lg" style={{ "marginBottom": "20px" }}>
                                    <div className='col-2'></div>
                                    <div className='col-8'>
                                        <button type="button" className="btn btn-outline-primary btn-lg" onClick={ registCompany} style={{ margin: "10px", width:"100%", fontSize:"20px"}}> Submit </button>
                                    </div>
                                    <div className='col-2'>
                                        <button type="button" className="btn btn-primary" onClick={btnList} style={{ margin: "10px",fontSize:"15px"}}>목록보기</button>
                                    </div>
                                    
                                </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
export default CompanyAdd;