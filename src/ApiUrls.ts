const Urls = {
    login: `login/user`,
    signup: `user`,
    getSubjectsByCourse: (courseName: any) => `subject/course/${courseName}`,
    addSubject: `subject`,
    getSubjectById: (id: any) => `subject/${id}`,
    getMarksBySubjectName: (name: any) => `marks/subject/${name}`,
    addMarks: `marks`,
    getPendingMarksById: (id: any) => `marks/pending/${id}`
}

export default Urls
