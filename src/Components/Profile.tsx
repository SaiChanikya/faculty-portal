import { useState, useEffect } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import LoadingSpinner from "./LoadingSpinner";
import MainLayout from "./Layout/Layout";
import { ProfileOutlined } from "@ant-design/icons";

const displayFields: any = {
    email: "Email",
    first_name: "First name",
    last_name: "Last name",
    type: "Type",
    course: "Course",
    ph_number: "Mobile Number"
}

function Profile() {
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    useEffect(() => {
        setLoading(true);
        Promise.all([
            ApiService.post(ApiUrls.login, { email: email, password: password })
        ])
            .then(([userData]) => {
                if (!userData.error) {
                    console.log(userData)
                    setUser(userData)
                }
            })
            .catch(error => {
                console.log("Something went wrong!!!");
            })
            .finally(() => setLoading(false))
    }, [])

    return <MainLayout>
        {
            loading ?
                <LoadingSpinner /> : <>
                    <div style={{ fontSize: "30px", textAlign: "center", paddingTop: "100px" }}>
                        <ProfileOutlined style={{ fontSize: "30px" }} /> <b>Personal Information</b>
                    </div>
                    <div id="profile-container"
                    // style={{
                    //     fontSize: "20px",
                    //     padding: "40px 10px 40px 40px",
                    //     margin: "0",
                    //     overflow: "hidden",
                    //     border: "1px solid #d7d7dc"
                    // }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "40% 50%",
                                gridRowGap: "15px"
                            }}
                        >
                            {
                                Object.keys(displayFields).map((key) => {
                                    return <>
                                        <div>
                                            <b>{displayFields[key]}</b>
                                        </div>
                                        <div>
                                            {user?.[key]}
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                </>
        }
    </MainLayout>
}

export default Profile;
