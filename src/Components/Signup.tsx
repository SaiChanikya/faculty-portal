import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Form, Select } from "antd";

import './Login.css';
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";

export const commonInputNumberProps = {
    onKeyUp: ((event: any) => {
        let value = event.target.value
        if (!/[a-zA-z,?></'"|=+)(*&^%$#@!~`{});:]/.test(event.target.value)) {
            if (value !== "") {
                if (event.target.ariaValueMax !== null && String(value).length >= event.target.ariaValueMax.length && value > Number(event.target.ariaValueMax)) {
                    value = event.target.ariaValueMax
                }
                else if (event.target.ariaValueMin !== null && String(value).length > event.target.ariaValueMin.length && value < Number(event.target.ariaValueMin)) {
                    value = event.target.ariaValueMin
                }
                if (value.includes("-") && value[0] !== "-") {
                    value = value.substr(0, value.indexOf("-"))
                }
                event.target.value = value
            }
        }
        else {
            if (event.key !== "Backspace") {
                event.target.value = value.replace(/[^0-9]/g, '');
            }
        }
    }),
}

function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [phonenumber, setPhonenumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [passwordMessage, setPasswordMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const emailPrefix: string = email.split('@')[0];
    const domain: string = email.split('@')[1];
    const history = useHistory();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const emailPatternValidation = (email: string): boolean => {
        const regex = new RegExp(/<(?=>)/);
        return regex.test(email);
    };

    useEffect(() => {
        setButtonLoading(false);
    }, [])

    const validateEmail = () => {
        const payload = {
            first_name: firstname,
            last_name: lastname,
            password: password,
            email: email,
            type: "Faculty",
            course: course,
            ph_number: phonenumber,
        }

        setButtonLoading(true);
        ApiService.post(ApiUrls.signup, payload)
            .then(data => {
                if (!data.error) {
                    if (data?.["message"] === "User record created successfully") {
                        localStorage.setItem("email", email)
                        localStorage.setItem("password", password)
                        localStorage.setItem("course_name", course)
                        history.push('/home')
                    }
                }
                else {
                    setErrorMessage(`${data.error}, login failed due to an internal error`);
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
                setMessage("Email is required.");
            }
            else {
                setPasswordMessage("Password is required.");
            }
        }
        else if (!email.includes('@') || emailPrefix === "" || domain === "" || !domain.includes('.') ||
            domain.split('.')[0] === "" || domain.split('.')[1] === "" || emailPatternValidation(email)) {
            setErrorMessage("");
            setMessage("Please enter a valid email.");
        }
        else if (password.length < 8) {
            setMessage("");
            setErrorMessage("");
            setPasswordMessage("Password must contain atleast 8 characters.");
        }
        else {
            const error = validatePassword(password);
            if (error !== "Password contains atleast") {
                setPasswordMessage(error)
            }
            else {
                setMessage("");
                setErrorMessage("");
                setPasswordMessage("")
                validateEmail();
            }
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

    const initialValues = {
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        ph_number: "",
    };

    function containsUppercase(str: any) {
        return /[A-Z]/.test(str);
    }

    function containsLowercase(str: any) {
        return /[a-z]/.test(str);
    }

    function containsNumber(str: any) {
        return /[0-9]/.test(str);
    }

    function containsSpecialChars(str: any) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function validatePassword(password: string | any[]) {
        var error = "Password contains atleast";
        if (!containsUppercase(password)) {
            error += " one upper case,"
        }

        if (!containsLowercase(password)) {
            error += " one lower case,"
        }

        if (!containsNumber(password)) {
            error += " one number,"
        }

        if (!containsSpecialChars(password)) {
            error += " one special character."
        }

        if (error !== "Password contains atleast") {
            error = error.slice(0, -1) + '.'
        }

        return error;
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
                <div style={{ fontWeight: "500", fontSize: "35px", paddingTop: '35px' }}>
                    Sign up
                </div>

                <div className="heading"></div>

                <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '23px' }} >
                    {errorMessage}
                </div>

                <Form onFinish={handleSubmit} initialValues={initialValues} layout="vertical"
                    style={{ textAlign: 'left', padding: '35px 35px 20px 35px' }}
                >
                    <Form.Item
                        label={<div style={{ color: "white" }}>First name</div>}
                        style={{ marginBottom: '25px' }}
                        name={"first_name"}
                        rules={[
                            {
                                required: true,
                                message: "First name is required.",
                            },
                        ]}
                    >
                        <Input
                            style={{ borderRadius: '5px' }}
                            placeholder="Enter first name"
                            autoFocus
                            onChange={(e) => { setFirstname(e.target.value) }}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<div style={{ color: "white" }}>Last name</div>}
                        name={"last_name"}
                        style={{ marginBottom: '25px' }}
                        rules={[
                            {
                                required: true,
                                message: "Last name is required.",
                            }
                        ]}
                    >
                        <Input
                            style={{ borderRadius: '5px' }}
                            placeholder="Enter last name"
                            autoFocus
                            onChange={(e) => { setLastname(e.target.value) }}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<div style={{ color: "white" }}>Email</div>}
                        validateStatus={checkInvalid()}
                        name={"email"}
                        style={{ marginBottom: '25px' }}
                    >
                        <Input
                            style={{ borderRadius: '5px' }}
                            placeholder="Enter email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value.split(" ").join("")) }}
                            size="large"
                        />
                        <div style={{ color: 'red', textAlign: 'left' }}>{message}</div>
                    </Form.Item>

                    <Form.Item
                        label={<div style={{ color: "white" }}>Password</div>}
                        style={{ marginBottom: '25px' }}
                        name={"password"}
                    >
                        <Input.Password
                            style={{ borderRadius: '5px' }}
                            placeholder="Enter password"
                            autoFocus
                            onChange={(e) => { setPassword(e.target.value) }}
                            size="large"
                        />
                        <div style={{ color: 'red', textAlign: 'left' }}>{passwordMessage}</div>
                    </Form.Item>

                    <Form.Item
                        label={<div style={{ color: "white" }}>Course</div>}
                        style={{ marginBottom: '25px' }}
                        name={"course"}
                        rules={[
                            {
                                required: true,
                                message: "Course is required.",
                            }
                        ]}
                    >
                        <Select
                            style={{ borderRadius: '5px' }}
                            placeholder="Select course"
                            onChange={(value) => { setCourse(value) }}
                            size="large"
                            options={[{ label: "Mechanical Engineering", value: "Mechanical Engineering" }, { label: "Electrical Engineering", value: "Electrical Engineering" }, { label: "Civil Engineering", value: "Civil Engineering" }, { label: "Computer Engineering", value: "Computer Engineering" }, { label: "Biomedical Engineering", value: "Biomedical Engineering" }]}
                        />
                    </Form.Item>

                    <div style={{ color: "white", paddingBottom: "5px" }}>
                        Mobile number
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <Form.Item>
                            <Input value={"+1"} readOnly style={{ width: "40px", borderRadius: '5px' }} size="large" />
                        </Form.Item>
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <Form.Item
                            name={"ph_number"}
                            rules={[
                                {
                                    required: true,
                                    message: "Mobile number is required.",
                                }
                            ]}
                        >
                            <Input
                                style={{ borderRadius: '5px', width: "290px" }}
                                {...commonInputNumberProps}
                                autoFocus
                                placeholder="Enter mobile number"
                                onChange={(e) => {
                                    if (!Number(e.target.value)) {
                                        return;
                                    }
                                    setPhonenumber(e.target.value)
                                }}
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button type="primary" loading={buttonLoading} className="submit-button" size="large"
                            htmlType="submit"
                        >
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Signup;
