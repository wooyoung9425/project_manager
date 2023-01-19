import { useState, useEffect } from 'react';
import { useRecoilValue, atom } from 'recoil';
import { projectType } from '../../../repositories/accountRepository';


function DamProject(props: any) {
    const setting = useRecoilValue<any>(projectType)
    const ListName : any= {
        'dam_kor': '댐 이름(한)', 'dam_eng': '댐 이름(영)', 'dam_type': '댐 구역',
        'dam_latitude_start': '댐 시작 위도','dam_latitude_end': '댐 끝 위도', 'dam_longitude_start': '댐 시작 경도','dam_longitude_end': '댐 끝 경도',
        'dam_height_start': '댐 높이 시작지점', 'dam_height_end': '댐 높이 끝지점',
        'dam_height_area': '댐 높이 영역 개수', 'dam_width_area': '댐 가로 영역 개수'
    }
    const rendering = () => {
        let render :any[]=[]
        for (let key in ListName) {
            render.push(<>
                
                    <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                        <div className="col-2"></div>    
                        <div className="col-2">
                            <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> {ListName[key]} </label></div>
                        <div className="col-6">
                            <input type="text" value={setting[key]} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                        </div>
                    </div>
            </>)
        }
        return render
    }

    return (
        <>
            {rendering()}
        </>
    );
};

export default DamProject;