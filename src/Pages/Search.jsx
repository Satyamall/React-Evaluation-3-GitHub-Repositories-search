
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDataSuccess } from "../Redux/app/action";
import { useState } from "react";

export default function Search() {
    const isAuth = useSelector((state) => state.auth.isAuth);

    const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const getData = (user) => {
        return fetch(`https://api.github.com/search/users?q=${user}`)
            .then((res) => res.json())
            .then((res) => {
                const getdata= getDataSuccess(res.items);
                dispatch(getdata)
            })
    }

    const {data}=useSelector((state)=>state.app)
    const handleSearch = () => {
        getData(user)
    }

    if (!isAuth) {
       return <Redirect to="/login" />
    }
    return (
        <div>
            <h1>Search For Users</h1>
            <div>
                <input value={user} placeholder="Search Repository" onChange={(e) => setUser(e.target.value)} />
                <button onClick={handleSearch}>SEARCH</button>
            </div>

            <div>
                {
                    data?.map((item) => {
                        return <div key={item.id}>{item.login}</div>
                    })
                }
            </div>
        </div>
    )
}