import { useState, useEffect } from 'react';
import { useRecoilValue, atom } from 'recoil';
import { projectType } from '../../../repositories/accountRepository';


function BridgeProject(props: any) {
    const setting = useRecoilValue<any>(projectType)
    const ListName : any= {
        'bridge_kor': '교량 이름(한)', 'bridge_eng': '교량 이름(영)', 'bridge_length': '교량 길이', 'bridge_type': '교량 타입',
        'span_class_length': '경간 구분 길이', 'span_count': '경간 개수', 'span_length': '경간 길이', 'span_number_list': '경간 촬영 번호',
        'girder_count': '거더 개수','girder_camera_count': '거더 촬영 횟수','girder_width': '거더하면 폭',
        'girderside_height': '거더측면 높이', 'slab_count': '슬라브 수', 'slab_width': '슬라브 폭',
        'pier_count': '교각 개수', 'pier_film_count': '교각 촬영 횟수', 'pier_number_list': '교각 촬영 번호', 'pier_radius':'교각 반지름', 'pier_height':'교각 높이'
        
    }
    const rendering = () => {
        let render: any[] = []
        const arr  = ['span_number_list','pier_number_list']
        for (let key in ListName) {
            if (arr.includes(key)) {
                let value_str :string = ""
                setting[key].map((item: any) => {
                    value_str = value_str+item.num+"번 "
                })
                render.push(
                    <>
                        <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                            <div className="col-2"></div>    
                            <div className="col-2">
                                <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> {ListName[key]} </label></div>
                            <div className="col-6">
                                <input type="text" value={value_str} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                            </div>
                        </div>
                    </>
                )  
            } else if (key === 'bridge_type') { 
                let value_str:any = []
                setting[key].map((item: any) => {
                    if ('Girder' === item) {
                        value_str.push('거더 하면 ')
                    } else if ('GirderSide' === item) {
                        value_str.push('거더 측면 ')
                    } else if ('Slab' === item) {
                        value_str.push('슬라브 하면 ')
                    }else if ('SlabSide' === item) {
                        value_str.push('슬라브 측면 ')
                    }else if ('Pier' === item) {
                        value_str.push('교각 ')
                    }else if ('Abutment' === item) {
                        value_str.push('교대 ')
                    }
                })
                render.push(
                    <>
                        <div className="input-group input-group-lg" style={{"marginBottom": "20px"}}>
                            <div className="col-2"></div>    
                            <div className="col-2">
                                <label className="input-group-text" id="inputGroup-sizing-lg" style={{ "fontSize": "15px" }}> {ListName[key]} </label></div>
                            <div className="col-6">
                                <input type="text" value={value_str} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" style={{ "fontSize": "15px" }} />
                            </div>
                        </div>
                    </>
                )

            } else {
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
            
        }
        return render
    }

    return (
        <>
            {rendering()}
        </>
    );
};

export default BridgeProject;