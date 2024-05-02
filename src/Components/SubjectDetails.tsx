import { Button, Table, InputNumber } from "antd";
import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import Urls from "../ApiUrls";
import MainLayout from "./Layout/Layout";
import { useHistory } from "react-router-dom";
import { commonInputNumberProps } from "./Signup";

function SubjectDetails() {
    const courseName = localStorage.getItem("course_name");
    const [users, setUsers] = useState<any>([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const history = useHistory();

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
            width: '40%',
        },
        {
            title: 'Grades',
            dataIndex: 'grades',
            width: '20%',
            render: (text: any, record: any, index: any) => {
                return <>
                    <InputNumber key={record.uid}
                        min={1}
                        max={5}
                        maxLength={4}
                        {...commonInputNumberProps}
                        onChange={(value) => {
                            setUsers(users.map((user: any) => {
                                if (record.id === user.id) {
                                    return {
                                        ...user,
                                        grades: value
                                    }
                                }
                                else {
                                    return user;
                                }
                            }))
                        }}
                    /> / 5 </>
            }
        }
    ];

    useEffect(() => {
        setTableLoading(true);
        Promise.all([
            ApiService.get(Urls.getSubjectsByCourse(courseName)),
            ApiService.get(Urls.getPendingMarksById(window.location.pathname.split('/')[3]))
        ])
            .then(([subjects, data]: any) => {
                data = data.users
                data?.map((key: any) => {
                    subjects.map((subject: any) => {
                        if (subject.id === window.location.pathname.split('/')[3]) {
                            key.subject = subject.subject
                        }
                    })
                })

                data?.map((key: any) => {
                    key.user_id = key.id
                    key.grades = null
                })

                data = data.filter((user: any) => user.type === "Student")

                setUsers(data)
            })
            .catch((e: any) => {
                console.log(e)
            })
            .finally(() => setTableLoading(false))
    }, [])

    console.log(users)

    function updateMarks() {
        setConfirmLoading(true)
        const payload = users.filter((user: any) => user.grades !== null)
        ApiService.post(Urls.addMarks, payload)
            .then((data: any) => {
                history.push("/subjects")
            })
            .catch((e: any) => {
                console.log(e)
            })
            .finally(() => setConfirmLoading(false))
    }

    return <MainLayout>
        <div className="content-header">
            Add Grades
        </div>

        <Table
            loading={tableLoading}
            columns={columns} rowKey={"id"}
            bordered
            dataSource={users}
            pagination={false}
        />

        {
            users.length > 0 && <div style={{ paddingTop: "10px", paddingRight: "45px" }}>
                <Button type="primary" style={{ float: "right" }} loading={confirmLoading}
                    onClick={() => {
                        updateMarks()
                    }}
                >
                    Save
                </Button>
            </div>
        }
    </MainLayout>
}

export default SubjectDetails;
