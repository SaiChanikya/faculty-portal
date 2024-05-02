import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Form } from "antd";

import './Login.css';
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [passwordMessage, setPasswordMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const emailPrefix: string = email.split('@')[0];
    const domain: string = email.split('@')[1];
    const history = useHistory();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const emailPatternValidation = (email: string): boolean => {
        const regex = new RegExp(/<(?=>)/);
        return regex.test(email);
    };

    const validateEmail = () => {
        const payload = {
            "email": email,
            "password": password
        }

        setButtonLoading(true);
        ApiService.post(ApiUrls.login, payload)
            .then(data => {
                if (data !== 'invalid' && data.type === "Faculty") {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                    localStorage.setItem("course_name", data.course)
                    history.push('/home')
                }
                else {
                    setErrorMessage(`Invalid credentials, please try again!`);
                    // setErrorMessage(data.error);
                    setButtonLoading(false);
                    console.error(data);
                }
            }).catch((error) => {
                setErrorMessage("Something went wrong");
                setButtonLoading(false);
                console.error(error);
            })
    }

    function handleSubmit() {
        console.log(emailPatternValidation(email))
        if (email.length === 0 || password.length === 0) {
            setMessage("");
            setErrorMessage("");
            if (email.length === 0) {
                setMessage("Email is required");
            }
            else {
                setPasswordMessage("Password is required");
            }
        }
        else if (!email.includes('@') || emailPrefix === "" || domain === "" || !domain.includes('.') ||
            domain.split('.')[0] === "" || domain.split('.')[1] === "" || emailPatternValidation(email)) {
            setErrorMessage("");
            setMessage("Please enter a valid email");
        }
        else if (password.length < 8) {
            setMessage("");
            setErrorMessage("");
            setPasswordMessage("Password must contain atleast 8 characters");
        }
        else {
            setMessage("");
            setErrorMessage("");
            setPasswordMessage("")
            validateEmail();
        }
    }

    function checkInvalid(): 'success' | 'error' {
        if ((email.length === 0 || !email.includes('@') || emailPrefix === "" || domain === "" ||
            !domain.includes('.') || domain.split('.')[0] === "" || domain.split('.')[1] === "" || emailPatternValidation(email)) &&
            message.length !== 0) {
            return 'error';
        }
        return 'success';
    }

    return (
        <div
            style={{
                height: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${window.location.origin}/login.jpeg)`
            }}
        >
            <div id="login-container">
                <div style={{ paddingTop: '35px' }}>
                    <img src={window.location.origin + "/faculty/Login.png"} width={"60%"} />
                </div>

                <div className="heading"><span>Faculty Portal</span></div>

                <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '23px' }} >
                    {errorMessage}
                </div>

                <Form onFinish={handleSubmit} layout="vertical"
                    style={{ textAlign: 'left', padding: '35px 35px 20px 35px' }}
                >
                    <Form.Item
                        label={<div style={{ color: "white" }}>Email<span style={{ color: "red" }}>*</span></div>}
                        validateStatus={checkInvalid()}
                        style={{ marginBottom: '25px' }}
                    >
                        <Input
                            style={{ borderRadius: '5px' }}
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value.split(" ").join("")) }}
                            size="large"
                        />
                        <div style={{ color: 'red', textAlign: 'left' }}>{message}</div>
                    </Form.Item>

                    <Form.Item
                        label={<div style={{ color: "white" }}>Password<span style={{ color: "red" }}>*</span></div>}
                        style={{ marginBottom: '25px' }}
                    >
                        <Input.Password
                            style={{ borderRadius: '5px' }}
                            autoFocus
                            onChange={(e) => { setPassword(e.target.value) }}
                            size="large"
                        />
                        <div style={{ color: 'red', textAlign: 'left' }}>{passwordMessage}</div>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button type="primary" loading={buttonLoading} className="submit-button" size="large"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                        <div style={{ textAlign: 'center', paddingTop: "10px", color: "white" }}>
                            Don't have an account?&nbsp;<a onClick={() => history.push("/sign-up")}><b>Signup</b></a>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
