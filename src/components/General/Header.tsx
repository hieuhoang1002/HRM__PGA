import React, { useEffect, useState } from "react";
import styles from "../scss/General/Header.module.scss";
import logo from "../../assets/img/logoGeneral.png";
import intlImg from "../../assets/img/intl.png";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "./Profile";
import axios from "axios";
import { API } from "../../API/configAPI";

const Header = () => {
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setuserId] = useState<number>();
  const [userName, setUserName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  useEffect(() => {
    axios({
      method: "get",
      baseURL: API,
      url: `/user/detail`,
      headers: {
        Authorization: localStorage.getItem("CheckToken"),
      },
    })
      .then((res) => {
        setuserId(res.data.data.id);
        setUserName(res.data.data.username);
        setDepartment(res.data.data.department.name);
      })
      .catch((err) => err);
  }, []);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleLanguage = () => {
    setShowLanguage(!showLanguage);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.textName}>HR Management System</div>
      </div>

      <div>
        <div className={styles.language}>
          <button className={styles.btnDropdown} onClick={handleLanguage}>
            <img src={intlImg} alt="" />
            <span>EN</span>
            <IoIosArrowDown className={styles.icon} />
          </button>

          {showLanguage && (
            <div>
              <li>
                <img src={intlImg} alt="" />
                <span>EN</span>
              </li>

              <li>
                <img src={intlImg} alt="" />
                <span>VI</span>
              </li>
            </div>
          )}
        </div>

        <div className={styles.avatar} onClick={handleShow}>
          {userName.charAt(0)}
        </div>
        {showModal && (
          <Profile
            userId={userId}
            userName={userName}
            department={department}
            handleremoveShow={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
