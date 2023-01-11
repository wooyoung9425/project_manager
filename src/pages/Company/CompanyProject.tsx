import React,{useState, useEffect} from 'react'
import { Layout, DataGrid } from '../../allcomponents';
import { User, Company } from '../../alltypes';
import { apiHelper, messageBox } from '../../allutils';
import { useNavigate } from 'react-router-dom';
import { ReturnValues } from '../../allmodels';
import { Select } from 'antd';

function CompanyProject(props: any) {
    const [isBind, SetIsBind] = useState(false);
    const [isCompany, setIsCompany] = useState(false)
    const [companyList, setCompanyList] = useState<Company[]>()
    const [searchCompany, setSearchCompany] = useState<any[]>()
    const [list, setList] = useState<any[]>();
    const [selectedOptions,setSelectedOptions]=useState()
    const navigate = useNavigate();

    useEffect(function () {
        CompanyList()
     }, [isBind, isCompany]);
    
    const CompanyList = () => {
        apiHelper.Get('/company/list', {}, (rst: ReturnValues<Company[]>) => {
            if (rst.check && rst.data !== null && rst.data !== undefined) {
                setCompanyList(rst.data)
                const tmpList:any=[]
                rst.data.map((item: any) => (
                    tmpList.push({ value:item.id, label:item.name})
                ))
                setSearchCompany(tmpList)
                SetIsBind(true)
            }
        })
    }
    const handleSelect = (data:any) => {
        setSelectedOptions(data)
    }
    const CompanySearch = () => {
        console.log(selectedOptions)
        if (isCompany === true) {
            setIsCompany(false)
        } 
        apiHelper.Get(`/project/list/company/${Number(selectedOptions)}`, {}, (rst: ReturnValues<any[]>) => { 
            console.log(rst)
            if (rst.check && rst.data !== null && rst.data !== undefined) {
                setIsCompany(true)
                setList(rst.data)
            }
        })
        // const index = searchCompany?.findIndex((item: any) => {})
    }
     const onRowClick = (row: any) => {
        navigate(`/company/view/${row.key}`);
    };
    const columns = [
        { key: 'id', name: 'ID', show:false, isKey:true },
        { key: 'title', name: '프로젝트명', show:true, isKey:false },
        { key: 'projectType', name: '시설물', show:true, isKey:false },
        { key: 'ownerID', name: '관리자', show:false, isKey:false },
        { key: 'createdAt', name: '생성일자', show:true, isKey:false },
        { key: 'updatedAt', name: '업데이트', show: true, isKey: false}
    ];
    

    return (
        <Layout section="Member" title="프로젝트 관리">
             <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="input-group">
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
                                        <i className="fas fa-search"></i>
                                   </button>
                                </div>    
                            </div>
                            {
                                (isCompany) ? 
                                    <>
                                    <div className="row">
                                        <div className='col-8'>
                                            <div className="input-group mb-3">
                                                <Select></Select>
                                                <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
                                            </div>
                                        </div>
                                        
                                    </div>
                                        <DataGrid cols={columns} data={list} size={10} onRowClicked={onRowClick} fontsize={12} />
                                    </>
                                    :
                                <div style={{ margin: "150px 40% 200px 40%", width: "200px", height: "200px" }}>   
                                    <div style={{ paddingBottom: "20px" }}> 회사를 선택해주세요.</div>
                                    <div className="spinner-border text-primary" role="status" style={{ width: "200px", height: "200px" }}></div>
                                    
                                </div> 
                            }
                    </div>
                    </div>
                </div>
             </div>
        </Layout>
  )
}
export default CompanyProject;