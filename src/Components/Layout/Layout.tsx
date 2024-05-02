import { Layout as AntLayout } from 'antd';

import '../Layout/Layout.css';
import { useEffect, useState } from 'react';
import ApiService from '../../Api.Service';
import ApiUrls from '../../ApiUrls';
import AppMainHeader from './Header';
import LoadingSpinner from '../LoadingSpinner';
import AppSider from './Sider';

const { Content } = AntLayout;

function MainLayout(props: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const [user, setUser] = useState<any>();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            ApiService.post(ApiUrls.login, { email: email, password: password }),
        ])
            .then(([userData]) => {
                if (!userData.error) {
                    setUser(userData)
                }
            })
            .catch(error => {
                console.log("Something went wrong!!!");
            })
            .finally(() => setLoading(false))
    }, [])

    return loading ? <LoadingSpinner /> : <AntLayout>
        <AppMainHeader user={user} />

        <AntLayout className="app-sider">
            <AppSider />

            <AntLayout className="content-layout">
                <Content className="content">
                    {props.children}
                </Content>
            </AntLayout>
        </AntLayout>
    </AntLayout>
}

export default MainLayout;
