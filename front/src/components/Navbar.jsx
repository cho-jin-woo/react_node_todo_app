import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth); // auth: store.js에 정의된 reducer 객체요소의 키

  const { isAuth, setIsAuth } = useState(!userInfo); // userInfo가 없는 상태 초기화

  const handleLoginSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    // userInfo.jti
    dispatch(
      login({
        userName: userData.given_name,
        userImage: userData.picture,
        userToken: userData.jti,
        userEmail: userData.email,
      })
    );
  };

  const handleLogout = () => {};
  dispatch(logout);

  return (
    <div className="navi">
      {/* <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      ; */}

      {isAuth ? (
        <div>
          <h2>{userInfo.name}님 로그인</h2>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요헙니다.</h2>
          <button oncClick>\\LOGIN</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

// (credentialResponse) => {
//   const userInfo = jwtDecode(credentialResponse.credential);
//   // console.log(credentialResponse);
//   console.log(userInfo.jti);
//   console.log(userInfo.email);
//   console.log(userInfo.given_name);
//   console.log(userInfo.picture);
// }
