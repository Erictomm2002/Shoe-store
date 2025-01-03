import React, { useState } from "react";
import "./Login.scss";
import Navbar from "../../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { toast } from "react-toastify";
import { loginUser } from "../../../service/userService";
import { login } from "../../../utils/utils";
import loginShoe from "../../../assets/images/login-shoe.png";
import {PowerIcon} from "@heroicons/react/16/solid";

function Login(props) {
  const navigate = useNavigate();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleLogin = async () => {
    setObjCheckInput(defaultValidInput);

    if (!valueLogin) {
      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      toast.error("Vui lòng nhập email hoặc tài khoản của bạn");
      return;
    }

    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Vui lòng nhập mật khẩu");
    }

    let response = await loginUser(valueLogin, password);

    if (response && +response.errCode === 0) {
      console.log(response.DT);
      login(response.DT);
      //success
      if (response.DT.roleId === "USER") {
        navigate("/");
      } else {
        navigate("/admin/home");
      }
      //redux
    }

    if (response && +response.errCode !== 0) {
      //error
      toast.error(response.errMessage);
    }
    console.log(">> check response: ", response);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-indigo-100 to-indigo-300  template d-flex justify-content-center align-items-center vh-100 -mb-28">
        <div className="grid lg:grid-cols-2 gap-0 w-[1320px]">
          <div className="py-5 px-4 mx-1.5 lg:px-12 bg-white rounded-l-lg w-full flex flex-col justify-center">
            <form className="w-full">
              <PowerIcon className="w-8 h-8 mb-4 text-indigo-600"/>
              <h3 className="text-start mb-2 font-semibold">Đăng Nhập</h3>
              <p className="text-base text-gray-400">Xin mời điền đầy đủ thông tin tài khoản của bạn</p>
              <div className="mb-4">
                <label htmlFor="email" className="text-base font-medium tracking-wide mb-1.5">Email</label>
                <input
                  type="text"
                  name="email"
                  value={valueLogin}
                  onChange={(event) => {
                    setValueLogin(event.target.value);
                  }}
                  className={
                    objCheckInput.isValidValueLogin
                      ? "form-control"
                      : "is-invalid form-control"
                  }
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="text-base font-medium tracking-wide mb-1.5">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "is-invalid form-control"
                  }
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  className="custom-control custom-checkbox"
                  id="check"
                />
                <label htmlFor="checkbox" className="custom-input-label ms-2">
                  Nhớ mật khẩu
                </label>
                <Link to="" style={{fontSize: "14px", float: "right"}}>
                  Quên mật khẩu
                </Link>
              </div>
              <div className="d-grid">
                <div
                  type="submit"
                  className="bg-indigo-600 py-2.5 text-white rounded-md text-center"
                  onClick={() => handleLogin()}
                >
                  Đăng nhập
                </div>
              </div>
              <p className="mt-2 text-end">
                Bạn chưa có tài khoản?
                <Link to="/register" className="ms-2">
                  Đăng ký
                </Link>
              </p>
            </form>
          </div>
          <img className="w-full rounded-r-lg hidden lg:inline-block" src={loginShoe} alt={''}/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
