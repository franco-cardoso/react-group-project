import { motion } from "framer-motion";
import { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Btn } from "../../Cards/Confirmacion";
import LoginInput from "./LoginInput";
import { useEffect } from "react";

const LoginForm = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(userInfo.email)) {
            setTimeout(() => {
                setEmailError("Este email es inválido");
            }, 2000);
        }
        if (
            !/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/.test(
                userInfo.password
            )
        ) {
            setPasswordError(
                "Tu contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
            );
        }
        setEmailError(null);
        setPasswordError(null);
    }, [userInfo])

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
    };

    return (
        <FormContainer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: null, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={anim.formContAnim}
        >
            <form style={s.form}>
                <div style={s.formInputs}>
                    <LoginInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={handleChange}
                        error={emailError}
                    />
                    <LoginInput
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={userInfo.password}
                        onChange={handleChange}
                        error={passwordError}
                    />
                </div>
                <div style={s.formBtns}>
                    <Btn action="confirm" type="submit" onClick={submitForm}>
                        Iniciar Sesión
                    </Btn>
                    <Btn>Registrarse</Btn>
                </div>
            </form>
        </FormContainer>
    );
};

const anim = {
    formContAnim: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
    },
};

const s = {
    form: {
        margin: "auto",
        width: "75%",
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        alignItems: "center",
    },
    formInputs: {
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        width: "100%",
    },
    formBtns: {
        display: "flex",
        gap: "5px",
    },
    input: {
        height: "40px",
        borderRadius: "15px",
        fontFamily: "Poppins",
        fontSize: "18px",
        background: "transparent",
        padding: "1px 10px",
    },
};

const FormContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 70px;
    width: 350px;
    height: 250px;
    background: white;
    border-radius: 30px;
    box-shadow: 0px 0px 15px -5px;
`;

export default LoginForm;