import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    userLogin: null,
    userName: null,
    setUserLogin: () => {},
    setUserName: () => {}
});

export function UserContextProvider(props) {
    const [userLogin, setUserLogin] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const username = localStorage.getItem("userName");
        if (token && username) {
            setUserLogin(token);
            setUserName(username);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userLogin, userName, setUserLogin, setUserName}}>
            {props.children}
        </UserContext.Provider>
    );
}



