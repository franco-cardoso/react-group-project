import React from "react";
import useWindowSize from "../Utilidades/windowSize";
import HeaderIconos from "./HeaderIconos";
import Navbar from "./Navbar";
import styled from "styled-components";
import Menu from "./Menu";
import Notificacion from "./Notificacion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = (props) => {
  const { width } = useWindowSize();
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [showNotif, setShowNotif] = useState(true);

  return (
    <motion.header
      initial={{ height: "150px" }}
      animate={{ height: showNotif ? "150px" : "100px" }}
      transition={{ duration: 0.4 }}
    >
      <div style={s.header}>
        <AnimatePresence>
          {showNotif && (
            <motion.div
              style={{ overflow: "hidden" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Notificacion showNotif={showNotif} setShowNotif={setShowNotif} />
            </motion.div>
          )}
        </AnimatePresence>

        <Container>
          <AnimatePresence>
            {isSearchBar && (
              <motion.div
                style={{
                  ...s.inputWrapper,
                  width: `${width * 0.8}px`,
                  left: width < 660 ? "20px" : "150px",
                }}
                initial={{ width: 0 }}
                animate={{ width: null }}
                exit={{ width: 0 }}
                transition={{ type: "tween", duration: 0.8 }}
              >
                <input
                  type="text"
                  placeholder="Buscar..."
                  autoFocus="autofocus"
                  style={{
                    ...s.input,
                    width: `${width * 0.4}px`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Img isSearchBar={isSearchBar} screenWidth={width}>
            <Link to="/">
              <img
                src="https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png"
                width="100%"
                height="100%"
                alt=""
              />
            </Link>
          </Img>

          {width > 1279 && (
            <NavContainer>
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
                animate={{
                  opacity: isSearchBar ? [1, 0, 0, 0] : 1,
                  visibility: isSearchBar
                    ? ["visible", "visible", "visible", "hidden"]
                    : "visible",
                  left: isSearchBar ? 300 : null,
                }}
                transition={{ duration: 0.8, times: [0, 0.4, 0.9, 1] }}
              >
                <Navbar />
              </motion.div>

              <IconsWrapper>
                <HeaderIconos
                  data={props.data}
                  setIsSearchBar={setIsSearchBar}
                  isSearchBar={isSearchBar}
                />
              </IconsWrapper>
            </NavContainer>
          )}

          {width < 1280 && (
            <Menu
              showNotif={showNotif}
              data={props.data}
              setIsSearchBar={setIsSearchBar}
              isSearchBar={isSearchBar}
            />
          )}
        </Container>
      </div>
    </motion.header>
  );
};

const s = {
  inputWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto",
    height: "40px",
    overflow: "hidden",
  },
  input: {
    height: "30px",
    borderRadius: "15px",
    fontFamily: "Poppins",
    fontSize: "18px",
    background: "transparent",
    padding: "1px 10px",
  },
  header: {
    backgroundColor: "#fff",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "2",
  },
};

const Img = styled.div`
  width: 80px;
  height: 70px;
  visibility: ${(props) =>
    props.screenWidth > 660 || (!props.isSearchBar && props.screenWidth < 659)
      ? "visible"
      : "hidden"};
  @media (min-width: 780px) {
    width: 130px;
    height: 100px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin: 0 40px 0 0;
  box-shadow: 0px 4px 20px 0px rgb(0, 0, 0, 0.2);
  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 60px;
`;

export default Header;
