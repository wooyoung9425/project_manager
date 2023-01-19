import React,{useState, useEffect} from 'react'
import { Layout, DataGrid } from '../../allcomponents';
import { User, Company } from '../../alltypes';
import { apiHelper, messageBox } from '../../allutils';
import { useNavigate } from 'react-router-dom';
import { ReturnValues } from '../../allmodels';
import { Select } from 'antd';
import moment from 'moment';
import { render } from '@testing-library/react';

function CompanyProject(props: any) {

    const [isBind, SetIsBind] = useState(false);
    const [isCompany, setIsCompany] = useState(false)
    const [isProject, setIsProject]=useState(false)

    const [companyList, setCompanyList] = useState<Company[]>()
    const [searchCompany, setSearchCompany] = useState<any[]>()
    // 프로젝트 관리페이지 목록
    const [projectList, setProjectList] = useState<any[]>()
    const[test, setTest]=useState<any[]>()
    const [list, setList] = useState<any[]>();
    const [selectProject,setSelectProject]=useState<any[]>()
    const [selectedOptions, setSelectedOptions] = useState()
    const [optionList, setOptionList] = useState<any>()
    const [ProjectNameList,setProjectNameList]=useState<any[]>()
    
    const navigate = useNavigate();
    useEffect(function () {
        CompanyList()
     }, [isBind, isCompany,test]);
    
    //회사 리스트 및 회사 검색을 위한 select 회사 리스트
    const CompanyList = () => {
        apiHelper.Get('/company/list', {}, (rst: ReturnValues<any[]>) => {
            if (rst.check && rst.data !== null && rst.data !== undefined) {
                setCompanyList(rst.data)
                const tmpList: any = []
                rst.data.map((item: any) => {
                    tmpList.push({ value: item.id, label: item.name })
                })
                setSearchCompany(tmpList)
                SetIsBind(true)
            }
        })
    }

    // 회사 검색했을때 회사 값 삽입
    const handleSelect = (data:any) => {
        setSelectedOptions(data)
    }

    const change = () => {
        setTest(selectProject)
    }

    //회사 검색했을때 해당 회사의 프로젝트 리스트 불러오기
    const CompanySearch = () => {
        if (isCompany === true) {
            setIsCompany(false)
        } 
        apiHelper.Get(`/project/list/company/${Number(selectedOptions)}`, {}, (rst: ReturnValues<any[]>) => { 
            console.log(rst)
            if (rst.check && rst.data !== null && rst.data !== undefined) {
                setIsCompany(true)
                let projecttmp: any[] = rst.data
                let projectName : any[]=[]
                rst.data.map((item: any, c: number) => {
                    // console.log(item)
                    projectName.push({ value: item.id, label: item.title })
                    projecttmp[c] = {
                        ...projecttmp[c],
                        createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
                        updatedAt: moment(item.updatedAt).format('YYYY-MM-DD')
                    }

                })
                setList(projecttmp)
                setProjectList(projecttmp)
                setProjectNameList(projectName)
                setCompanyList(projecttmp)
            }
        })
    }
     const onRowClick = (row: any) => {
        navigate(`/company/projects/${row.key}`);
    };
    const columns = [
        { key: 'id', name: 'ID', show:false, isKey:true },
        { key: 'title', name: '프로젝트명', show:true, isKey:false },
        { key: 'projectType', name: '시설물', show:true, isKey:false },
        { key: 'ownerID', name: '관리자', show:false, isKey:false },
        { key: 'createdAt', name: '생성일자', show:true, isKey:false },
        { key: 'updatedAt', name: '업데이트', show: true, isKey: false}
    ];
    const ChangeSearchOption = (selectoption: string) => {
        setIsProject(false)
        let option = []
        if (selectoption === '0') {
            console.log(projectList)
            setList(projectList)
        }else if (selectoption === '1') {
            option.push(
                <>
                <Select
                     showSearch
                     style={{ width: 400, marginLeft:"10px",marginRight:"10px"}}
                     placeholder="Search to Select"
                     optionFilterProp="children"
                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
                     filterSort={(optionA, optionB) =>
                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                     }
                     options={ProjectNameList} onChange={(e)=>ChangeOption("title",e)}
                />
                </>
            )
        } else if (selectoption === '2') {
            option.push(
                <Select style={{ width: '200px', marginLeft: '20px' }} onChange={(e: any) => ChangeOption("type", e)}  >
                    <option value='Tunnel'>Tunnel</option>
                    <option value='Dam'>Dam</option>
                    <option value='Airport'>Airport</option>
                    <option value='Bridge'>Bridge</option>
                    <option value='Building'>Building</option>
                </Select>
            )
        } else {
            option.push(
                <input type='datetime-local' style={{width:"380px", marginLeft:"10px", marginRight:'10px', borderRadius:'5px'}} onChange={(e:any)=>ChangeOption("create", e)} ></input>
            )
        }
        setOptionList(option)
        
    }

    const ChangeOption = (str: string, e: any) => {
        let projectSearch: any = []
        if (str === 'title') {
            console.log(str, e)
            projectList?.map((item: any) => {
                if (item.id === e) {
                    projectSearch.push(item)
                    setIsProject(true)
                }
            })
            console.log(projectSearch)
            setSelectProject(projectSearch)
            setTest(projectSearch);

           
        } else if (str === 'type') {
            console.log(2, isProject)
            console.log(str, e)
            projectList?.map((item: any) => {
                if (item.projectType === e) {
                    projectSearch.push(item)   
                    setIsProject(true)
                }
            })
            
            setTest(projectSearch)
           
        } else {
            console.log(str, e.target.value)
            console.log(moment(e.target.value).format('YYYY-MM-DD'))
        }
    }
    

    return (
        <Layout section="Member" title="프로젝트 관리">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="input-group" style={{height:'50px'}}> 
                                <div className='col-1'>회사 선택</div>
                                <div className='col-4'>
                                    <div className='dropdown-container'>
                                        <Select
                                            showSearch
                                            style={{ width: 400 }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={searchCompany} onChange={handleSelect}
                                        />
                                    </div>
                                </div>        
                                <div  className='col-4'>
                                    <button type="button" className="btn btn-primary" onClick={CompanySearch}>
                                        <i className="fas fa-search"> 검색</i>
                                   </button>
                                </div>    
                            </div>
                            {
                                (!isCompany) ? 
                                    <div style={{ margin: "150px 40% 200px 40%", width: "200px", height: "200px" }}>   
                                        <div style={{ paddingBottom: "20px" }}> 회사를 선택해주세요.</div>
                                        <div className="spinner-border text-primary" role="status" style={{ width: "200px", height: "200px" }}></div>
                                    </div> 
                                    :

                                    <>
                                    <div className="row">
                                        <div className='col-5'>
                                            <div className="input-group mb-3">
                                                <Select style={{ width: "110px" }} onChange={ChangeSearchOption}>
                                                    <option value='0'> 전체</option>        
                                                    <option value='1'>프로젝트명</option>        
                                                    <option value='2'>시설물</option>        
                                                    <option value='3'>생성일자</option>        
                                                </Select>
                                                {
                                                    optionList
                                                }    
                                            </div>
                                            </div>
                                        </div>
                                        {
                                            (!isProject) ? <DataGrid cols={columns} data={list} size={10} onRowClicked={onRowClick} fontsize={12} /> :
                                            <><DataGrid cols={columns} data={test} size={10} onRowClicked={onRowClick} fontsize={12} /></> 
                                        }
                                        
                                    </>
                        }
                            <>
                            
                            </>
                             
                            
                    </div>
                    </div>
                </div>
             </div>
        </Layout>
  )
}
export default CompanyProject;