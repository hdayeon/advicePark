import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authState } from "../../contexts/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginModal from "../../pages/Login/LoginModal";

const Navbar: React.FC = () => {
  //recoil 사용 선언
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  // 로그인 모달
  const [modalOpen, setModalOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // 모달창 열기
  const showModal = () => {
    setModalOpen(true);
  };

  // 토큰 추출
  const params = new URLSearchParams(window.location.search);
  const access_token = params.get("access_token");
  if (access_token) {
    useEffect(() => {
      setCookie("token", access_token);
      console.log(cookies.token);

      setAuth({ isLoggedIn: true });
    }, []);
  }

  // 로그아웃
  const handleLogout = () => {
    setAuth({ isLoggedIn: false });
    removeCookie("token", { path: "/" });
  };

  const navHandler = (menu: string) => {
    location.href = `https://advice-park.vercel.app/${menu}`;
  };

  return (
    <header>
      <div className="sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center py-2 px-4 bg-blue-400">
        <div>박훈수 서비스</div>
        {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
        {auth.isLoggedIn ? (
          <>
            <ul
              className="flex gap-3 flex-nowrap"
              suppressHydrationWarning={true}
            >
              <li onClick={() => navHandler("post")}>글쓰기</li>
              <li onClick={() => navHandler("posts")}>목록</li>
              <li onClick={() => navHandler("my")}>MY</li>
            </ul>
            <button
              className="py-2 px-4 rounded-lg shadow-md text-black bg-green-300 hover:bg-lime-300"
              // onClick={handleLogin}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            className="py-2 px-4 rounded-lg shadow-md text-black bg-white hover:bg-green-300"
            // onClick={handleLogin}
            onClick={showModal}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
