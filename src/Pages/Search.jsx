
import {useDispatch,useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getDataSuccess } from "../Redux/app/action";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import BoxGrid from "./Box";

export default function Search() {
    const isAuth = useSelector((state) => state.auth.isAuth);

    const [page, setPage] = useState(1);
    // const [data,setData]=useState([]);

    const {id} = useParams();
    // console.log(id,"Satya")
    const dispatch = useDispatch();
    const getData = (id) => {
        return fetch(`https://api.github.com/search/repositories?q=${id}`)
            .then((res) => res.json())
            .then((res) => {
                const getdata= getDataSuccess(res.items);
                dispatch(getdata)
                // setData(res.items)
            })
    }

    useEffect(()=>{
        getData(id);
    },[id])

    const { data } = useSelector((state) => state.app)

    const changePageTo = (num) => {
        if (num <= 1) {
            setPage(1);
            return;
        }
        setPage(num);
    };
    const perPage = 5;


    if (!isAuth) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <h1>Search {id} Repositories</h1>
            <div>
                {
                    data?.filter(
                        (_, i) => i >= (page - 1) * perPage && i < page * perPage
                    ).map((item) => {
                        return <BoxGrid key={item.id} id={item.id}
                            title={item.full_name}
                            description={item.discription}
                            data={item.created_at}
                            url={item.clone_url}
                        />
                    })
                }
            </div>
            <div style={{ marginBottom: 40 }}>
                <Pagination
                    currentPage={page}
                    onClickCallback={(page) => changePageTo(page)}
                    total={Math.ceil(data.length/ perPage)}
                />
            </div>
        </div>
    )
}