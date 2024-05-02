import { useEffect, useState } from "react";
import MainLayout from "./Layout/Layout";
import ApiService from "../Api.Service";
import Urls from "../ApiUrls";
import { Select, Table } from "antd";

function Grades() {
    const [grades, setGrades] = useState<any>([]);
    const [subjects, setSubjects] = useState<any>([]);
    const courseName = localStorage.getItem("course_name");
    const [selectSubject, setSelectedSubject] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            width: '20%',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            width: '20%',
        },
        {
            title: 'Grades',
            dataIndex: 'grades',
            width: '10%',
            render: (text: any, record: any) => <>{record.grades} / 10</>
        }
    ]

    useEffect(() => {
        ApiService.get(Urls.getSubjectsByCourse(courseName))
            .then((data: any) => {
                var subjectNames: any = [];
                data?.map((key: any) => {
                    subjectNames.push({ label: key.subject, value: key.subject })
                })
                setSubjects(subjectNames)
            })
            .catch(e => console.log(e))
    }, [])

    function getMarksBySubject(value: string) {
        setLoading(true)
        ApiService.get(Urls.getMarksBySubjectName(value))
            .then((data: any) => {
                data.marks?.map((key: any) => {
                    key.first_name = key.user.first_name
                    key.last_name = key.user.last_name
                    key.email = key.user.email
                })
                setGrades(data.marks)
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    console.log(subjects)

    return <MainLayout>
        <div className="content-header">
            Grades
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "50% 50%", padding: "20px 0" }}>
            <div>
                <b>Subject Name</b>
            </div>
            <div>
                <Select value={selectSubject} style={{ width: "275px" }}
                    placeholder={"Select subject"}
                    onChange={(value: any) => {
                        setGrades([])
                        setSelectedSubject(value)
                        getMarksBySubject(value)
                    }}
                    options={subjects}
                />
            </div>
        </div>

        {
            grades?.length > 0 &&
            <Table
                bordered
                loading={loading}
                columns={columns}
                dataSource={grades}
                pagination={false}
            />
        }
    </MainLayout>
}

export default Grades;
