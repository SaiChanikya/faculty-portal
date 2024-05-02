import { Card, Carousel, Input, Select, Statistic } from "antd";
import MainLayout from "./Layout/Layout";
import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const { Search } = Input;

function Home() {
    const contentStyle: any = {
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };

    useEffect(() => {
    }, [])

    return <MainLayout>
        <div style={{ padding: "20px 0 20px 0", fontSize: "20px" }}>
            Primary duties of faculty include effective classroom teaching, academic advising and counseling of students, participation in departmental committee work, continuous development of the curriculum through assessment, applied research or scholarly activity
        </div>

        <div style={{ textAlign: "center" }}>
            <img src={`${window.location.origin}/faculty/faculty1.jpeg`} height={"50%"} width={'30%'} />
        </div>

        <div style={{ padding: "80px 0 30px 0", fontSize: "20px" }}>
            Go to subjects screen to add your subject
        </div>
    </MainLayout>
}

export default Home;
