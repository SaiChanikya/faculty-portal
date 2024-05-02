import { Button, Form, Input, Modal, Table } from "antd";
import MainLayout from "./Layout/Layout";
import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import Urls from "../ApiUrls";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

function Subjects() {
    const history = useHistory();
    const [subjects, setSubjects] = useState<any>([]);
    const courseName = localStorage.getItem("course_name");
    const [modal, setModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const initialValues = {
        "subject": "",
        "semester": "",
        "description": "",
        "course": "Mechanical Engineering"
    }
    const [form] = Form.useForm();
    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            width: '25%'
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            width: '25%'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '40%'
        },
        {
            title: 'Actions',
            render: (text: any, record: any) => <Button type="primary" onClick={() => history.push(`/subjects/${record.id}`)}>Add Credits</Button>
        }
    ];

    console.log(subjects)

    useEffect(() => {
        ApiService.get(Urls.getSubjectsByCourse(courseName))
            .then((data: any) => {
                console.log(data)
                setSubjects(data)
            })
    }, [])

    function handleOk() {
        form
            .validateFields()
            .then((values) => {
                form.getFieldsValue();
                values["course"] = courseName
                setConfirmLoading(true);
                ApiService.post(Urls.addSubject, values)
                    .then((result) => {
                        if (!result.error) {
                            var data: any = {};
                            data["id"] = result[0];
                            data["subject"] = result[1];
                            data["semester"] = result[2];
                            data["description"] = result[3];
                            setSubjects([...subjects, data])
                            form.resetFields();
                        }
                    });
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setConfirmLoading(false);
                setModal(false)
            })
    }

    return <MainLayout>
        <div className='content-header'>
            Subjects
        </div>

        <div
            style={{
                width: '100%',
                border: '1px solid #D7D7DC',
                borderBottom: 'none',
                padding: '10px 10px 10px 25px',
                backgroundColor: '#f5f5f6'
            }}
        >
            <Button
                type='primary'
                size='large'
                onClick={() => setModal(true)}
            >
                Add Subject
            </Button>
        </div>

        <Table
            columns={columns}
            bordered
            dataSource={subjects}
            pagination={false}
        />

        <Modal open={modal} onCancel={() => setModal(false)} onOk={handleOk} okText={"Add"} confirmLoading={confirmLoading}
            title={"Add Subject"}
        >
            <div className="content-container">
                <Form form={form} initialValues={initialValues}>
                    <Form.Item name={"subject"} label="Subject"
                        rules={[
                            {
                                required: true,
                                message: "Subject is Required.",
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={"semester"} label="Semester"
                        rules={[
                            {
                                required: true,
                                message: "Semester is Required.",
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={"description"} label="Description"
                        rules={[
                            {
                                required: true,
                                message: "Description is Required.",
                            },
                        ]}>
                        <TextArea />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </MainLayout>
}

export default Subjects;
