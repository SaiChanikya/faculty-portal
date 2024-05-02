import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

import { useState } from "react";

function AppSider() {
    const history = useHistory();
    const [inlineCollapsed, setInlineCollapsed] = useState<boolean>(false)

    // Sidebar items
    const items = [
        {
            label: "Home",
            key: "home",
        },
        {
            label: "Profile",
            key: "profile",
        },
        {
            label: "Subjects",
            key: "subjects",
        },
        {
            label: "Grades",
            key: "grades",
        }
    ];

    function openScreen(screen: string) {
        history.push(`/${screen}`);
    }

    return (
        <Sider width="250" theme="dark" id="sider" breakpoint="xl" collapsedWidth="60" onCollapse={() => { setInlineCollapsed(!inlineCollapsed) }}>
            <Menu
                mode="inline"
                selectedKeys={[window.location.pathname.split("/")[2]]}
                className="sider-menu"
                onClick={(e) => openScreen(e.key)}
                items={items}
                inlineCollapsed={inlineCollapsed}
                theme="dark"
            />
        </Sider>
    );
}

export default AppSider;
