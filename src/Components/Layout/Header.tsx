import { useHistory } from "react-router-dom";
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

import '../Layout/Layout.css';

import { Button, Layout, Menu } from "antd";

const { Header } = Layout;

export const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("course_name");
    window.location.replace(`${window.location.origin}/faculty`)
};

function AppMainHeader(props: any) {
    const history = useHistory();
    console.log(props.user)

    const items: any = (user: any, history: any) => {
        return [
            {
                label: user?.first_name,
                key: 'SubMenu',
                icon: <UserOutlined style={{ fontSize: "15px" }} />,
                children: [
                    {
                        label: <p onClick={() => history.push("/profile")} style={{ fontWeight: 600, fontSize: 'medium', }}>
                            Profile
                        </p>,
                        key: 'name',
                    },
                    {
                        label: "Logout",
                        key: 'logout',
                        style: { marginTop: '-16px', },
                        onClick: () => { logout() }
                    }
                ],
            }
        ]
    }
    return (
        <Header className={"header"}>
            <div style={{ "fontSize": "30px", fontWeight: "600" }}>
                <HomeOutlined onClick={() => history.push("/home")} />&nbsp;
                Faculty Portal
            </div>
            <Menu className="border-bottom-0" theme="light" mode="horizontal"
                items={[]}
            />

            <Menu className="border-bottom-0" theme="light" id="logout-menu" mode="horizontal" items={items(props.user, history)} />
        </Header>
    );
}

export default AppMainHeader;
