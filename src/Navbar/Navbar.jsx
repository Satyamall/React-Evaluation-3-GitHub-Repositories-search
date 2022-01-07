import { Link} from "react-router-dom";

export default function Navbar(){
    return(
        <div style={{display: "flex", gap: "2rem", margin: 30}}>
            <div>
            <Link to="/">HOME</Link>
            </div>
            {/* <div>
            <Link to="/search">SEARCH</Link>
            </div> */}
            <div>
            <Link to="/login">LOGIN</Link>
            </div>
        </div>
    )
}