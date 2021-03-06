
import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams,Link} from "react-router-dom";
import { getDataSuccess } from "../Redux/app/action";
import BoxGrid from "./Box";
import Pagination from "./Pagination";

export default function Home() {
    const isAuth = useSelector((state) => state.auth.isAuth);

    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const getData = (text,page) => {
        return fetch(`https://api.github.com/search/repositories?q=${text}&page=${page}`)
            .then((res) => res.json())
            .then((res) => {
                const getdata= getDataSuccess(res.items);
                dispatch(getdata)
            })
    }

    const handleSearch = () => {
        getData(text,page)
    }

    
    const changePageTo = (num) => {
        if (num <= 1) {
            setPage(1);
            return;
        }
        setPage(num);
    };
    const perPage = 5;
    
    const {data}=useSelector((state)=>state.app)

    if (!isAuth) {
        return <Redirect to="/login" />
    }
    return (
        <div>
             <div>
            <Link to={`/${text}`}>SEARCH Repository Page</Link>
            </div>
            <h1>Search For Repositories</h1>
            <div>
                <input value={text} placeholder="Search Repository" onChange={(e) => setText(e.target.value)} />
                <button onClick={handleSearch}>SEARCH</button>
            </div>
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
            <div style={{marginBottom: 20}}>
                <Pagination
                    currentPage={page}
                    onClickCallback={(page) => changePageTo(page)}
                    total={Math.ceil(30/perPage)}
                />
            </div>
        </div>
    )
}