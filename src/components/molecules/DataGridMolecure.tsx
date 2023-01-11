import { useState, useEffect } from 'react';
import { util } from '../../allutils';

var columns:any[] = [];
var data:any[] = [];
var list:any[] = [];
var option = {
    isSeq:true,
    size:10,
    curpage:1,
    totalCount:0,
    pagesize:1,
    getPages:function() {
        let result = [];
        for(let i = 0; i < this.pagesize; i++) {
            result.push(i + 1);
        }
        return result;
    },
    maxCount:function() {
        let result = this.totalCount;

        if (result > this.size && this.curpage > 0) {
            result -= ((this.curpage - 1) * this.size);
        }

        return result;
    }
};
var onClickEventHandler:Function|undefined = undefined;
var onBtnDeleteHandler:Function|undefined = undefined;
var StyleClass:string = "";

//목록화된 표를 표현하기 위한 컴포넌트
const DataGridMolecure = (props:any) => {
    const [cols, setCols] = useState(columns);
    const [item, setItems] = useState(data);
    const [pageNo, SetPageNo] = useState(1);
    const [sortCheck,setSortCheck]=useState(true)

    StyleClass = (props.fontsize !== null && props.fontsize !== undefined) ? `font${props.fontsize}` : "";

    const PageMove = (num:number):void => {
        option.curpage = num;
        SetPageNo(num);
        if (option.size >= option.totalCount) {
            list = data;
        } else {
            let st = 0;
            let ed = option.size;
            if (option.curpage > 1) {
                st = ((option.curpage - 1) * option.size);
                ed = (st + option.size);
                if (ed > option.totalCount) {
                    ed = option.totalCount;
                }
            }
            list = data.slice(st, ed);

            option.pagesize = Math.floor((option.totalCount / option.size));
            if ((option.totalCount % option.size) > 0)
            {
                option.pagesize++;
            }

            if (option.pagesize < 1)
            {
                option.pagesize = 1;
            }
        }
    };

    const getKeyFieldName = ():string => {
        let result = "";
        for(let i = 0; i < columns.length; i++) {
            if (columns[i].isKey) {
                result = columns[i].key;
                break;
            }
        }
        return result;
    };

    const gotoPageMove = (e:any) => {
        let btn = e.target as HTMLElement;
        let pageNo = Number(btn.getAttribute("data-page"));
        PageMove(pageNo);
    };

    const previousPageMove = () => {
        let pageNo = option.curpage - 1;
        if (pageNo < 1) {
            pageNo = 1;
        }
        PageMove(pageNo);
    };

    const nextPageMove = () => {
        let pageNo = option.curpage + 1;
        if (pageNo > option.pagesize) {
            pageNo = option.pagesize;
        }
        PageMove(pageNo);
    };

    const btnClickEventHandler = (e:any) => {
        if (onClickEventHandler !== null && onClickEventHandler !== undefined) {
            e.preventDefault();
            let target = (e.target as HTMLElement).parentElement;
            if (target?.hasAttribute("data-value")) {
                let idx = Number(target?.getAttribute("data-value"));
                onClickEventHandler({
                    key : idx,
                    origin : e.target,
                    parent : target
                });
            }
        }
    };

    const btnDeleteEventHandler = (e:any) => {
        if (onBtnDeleteHandler !== null && onBtnDeleteHandler !== undefined) {
            e.stopPropagation();
            let target = ((e.target as HTMLElement).parentElement as HTMLElement).parentElement;
            if (target?.hasAttribute("data-value")) {
                let idx = Number(target?.getAttribute("data-value"));
                onBtnDeleteHandler({
                    key : idx,
                    origin : e.target,
                    parent : target
                });
            }
        }
    };

    const JsonIndex = (obj:any, str:string):string => {
        let result = "";

        try {
            if (str !== null && str !== undefined && str !== "") {
                if (str.indexOf(".") > 0) {
                    let arr = str.split('.');
                    let tmp = obj;
                    for(let i = 0; i < arr.length; i++) {
                        tmp = tmp[arr[i]];
                    }
                    result = tmp;
                } else {
                    result = obj[str];
                }
            } else {
                result = obj[0];
            }
        } catch (e:any) {
            console.log(e.message);
        }

        return result;
    };

    useEffect(() => {
        columns = props.cols;
        setCols(columns);
        
        data = props.data;
        setItems(data);

        if (props.isSeq !== null && props.isSeq !== undefined) {
            option.isSeq = props.isSeq;
        }

        if (props.size !== null && props.size !== undefined) {
            option.size = Number(props.size);
            option.totalCount = (data !== null && data !== undefined) ? data.length : 0;
            PageMove(1);
        } else {
            list = data;
        }

        if (props.onRowClicked !== null && props.onRowClicked !== undefined) {
            onClickEventHandler = props.onRowClicked;
        }

        if (props.onDelete !== null && props.onDelete !== undefined) {
            onBtnDeleteHandler = props.onDelete;
        }
    }, [columns, data]);
    const table_sort = (row_name: string) => {
        console.log(row_name)
        if (sortCheck === true) {
            item.sort((obj1, obj2) => {
                if (obj1[row_name] > obj2[row_name]) {
                    return 1
                }
                if (obj1[row_name] < obj2[row_name]) {
                    return -1
                }
                return 0;
            })
            setSortCheck(false)
        } else {
            item.sort((obj1, obj2) => {
                if (obj1[row_name] < obj2[row_name]) {
                    return 1
                }
                if (obj1[row_name] > obj2[row_name]) {
                    return -1
                }
                return 0;
            })
            setSortCheck(true)
        }
    }

    return (
        <>
        <div className="table-responsive-sm list">
        <table className="table mb-0">
        <caption>
        TotalCount : {option.totalCount}
        </caption>
        <thead>
        <tr>
        {
            (option.isSeq) ?
                <th className={StyleClass} scope="col" key={`column_0`}>no            
                </th> : null
        }
        
        {
            columns.map((column, index) => {
                return ((column.show) ? <th className={StyleClass} scope="col" key={`column_${index}`}>{column.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" onClick={() => table_sort(column.key)}>
                            {sortCheck ? <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /> : <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />}
                    </svg>
                </th> : null)
            })
        }
        {
            (props.onDelete !== null && props.onDelete !== undefined)
            ?<th>기능</th>
            :<></>
        }
        </tr>
        </thead>
        <tbody>
        {
            (list !== null && list !== undefined && list.length > 0) ?
            list.map((item, index) => {
                if (item.masterID === "2") {
                    item={...item, ['payment']: "베이직"}
                } else if (item.masterID === "3") {
                    item={...item, ['payment']: "프리미엄"}
                } else {
                    item = {...item, ['payment']:"미정"}
                }
                return (
                    <tr key={ `row_${index}` } data-value={item[getKeyFieldName()]} onClick={btnClickEventHandler} style={{ cursor : "pointer" }}>
                    {
                        (option.isSeq) ? <td className={StyleClass} key={ `row_col_0` }>{option.maxCount() - index}</td> : null
                    }
                    {
                        columns.map((col, subindex) => {
                            
                            return (typeof item[col.key] === "boolean" && col.on !== null && col.off !== null && col.on !== undefined && col.off !== undefined) ? 
                            (<td className={StyleClass} key={ `row_col_${subindex}` }>{((item[col.key]) ? col.on:col.off)}</td>)
                            : ((col.show) ? <td className={StyleClass} key={ `row_col_${subindex}` }>
                            {(col.key.indexOf('.') > -1) ? JsonIndex(item, col.key) : item[col.key]}
                            </td> : null);
                        })
                    }
                    {
                        (props.onDelete !== null && props.onDelete !== undefined)
                        ?<td>
                            <button type="button" onClick={btnDeleteEventHandler} className="btn btn-danger">삭제</button>
                        </td>
                        :<></>
                    }
                    </tr>
                )
            })
            :
            <tr>
                <td colSpan={50} className="center" style={{ height:"200px" }}>
                    Data is Empty.
                </td>
            </tr>
        }
        </tbody>
        </table>
        </div>
        <div className="row" style={ { marginTop:"-45px" } }><div className="col-12">
        <nav aria-label="Page navigation example">
            <ul className="pagination" style={ { float:"right" } }>
                <li className="page-item">
                    <button className="page-link" aria-label="Previous" onClick={previousPageMove}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                </li>
                {
                    option.getPages().map((n, idx) => {
                        return (
                            (n === option.curpage) ? 
                        <li className="page-item active" key={`page_${idx}`}><button className="page-link" data-page={n} onClick={gotoPageMove}>{n}</button></li>
                            :
                        <li className="page-item" key={`page_${idx}`}><button className="page-link" data-page={n} onClick={gotoPageMove}>{n}</button></li>
                        )
                    })
                }
                <li className="page-item">
                    <button className="page-link" aria-label="Next" onClick={nextPageMove}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
        </div>
        </div>
        </>
    );
};

export default DataGridMolecure;