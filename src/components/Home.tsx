import Dashboard from './Dashboard';
import Login from './Login';
import { useDispatch } from "react-redux";
import { IUser } from '../Interfaces/IUser';
import { setRefreshLogin } from '../features/user';


function Home() {
    const dispatch = useDispatch();
    const userDetails: string | null = localStorage.getItem("user");
    console.log("userDetails from APP", userDetails)
    if (!userDetails) {
        return <Login />;
    }
    const user: IUser = JSON.parse(userDetails);
    dispatch(setRefreshLogin(user));
    return <Dashboard />;
}

export default Home;
