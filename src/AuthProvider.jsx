import React,{useState,createContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn]=useState(
        !!localStorage.getItem('accessToken')
    );
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
  return (
    <>
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn, email, setEmail,user,setUser}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthProvider;
export {AuthContext};
