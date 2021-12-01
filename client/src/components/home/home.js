import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import UserContext from "../../context/user-context";
import LoginForm from "../login/login";
import RegisterForm from "../register/form";
import MascotaAdmin from '../mascotas/admin';
import axios from "axios";
import Swal from "sweetalert2";


const Home = (props) => {

    const SESSION_USER = 'SESSION_USER';

    const [user, setUser] = useState(null);

    const login = (inputs) => {
        axios.post('/api/login', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    setUser(resp.data.data);
                    sessionStorage.setItem(SESSION_USER, JSON.stringify(resp.data.data));
                    navigate('/mascotas/');
                } else {
                    Swal.fire('Login', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);

            })
    }

    const logout = () => {
        setUser(null);
        sessionStorage.clear();
        navigate('/');
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_USER)) {
            setUser(JSON.parse(sessionStorage.getItem(SESSION_USER)));
            navigate('/mascotas/');
        } else {
            navigate('/');
        }

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            <Routes>
                <Route index element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/mascotas/*" element={<MascotaAdmin />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default Home;