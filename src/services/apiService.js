import instance from "../utils/axiosCustomize";

//user
const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return instance.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return instance.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return instance.put('api/v1/participant', data);
}

const postUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username)
    data.append('userImage', userImage)
    return instance.post('api/v1/profile', data)
}

const deleteUser = (userId) => {
    return instance.delete('api/v1/participant', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return instance.post(`api/v1/login`, { email, password })
}

const postRegister = (email, password, username) => {
    return instance.post(`api/v1/register`, { email, password, username })
}

const postChangePassword = (current_password, new_password) => {
    return instance.post(`api/v1/change-password`, { current_password, new_password })
}

const postLogout = (email, refresh_token) => {
    return instance.post('api/v1/logout', { email, refresh_token })
}

//Quiz
const getQuizByUser = () => {
    return instance.get('api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return instance.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return instance.post(`api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return instance.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = () => {
    return instance.get('api/v1/quiz/all')
}

const putUpdateQuiz = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return instance.put('api/v1/quiz', data);
}


const deleteQuiz = (id) => {
    return instance.delete(`api/v1/quiz/${id}`)
}

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return instance.post('api/v1/question', data);
}

const postCreateNewAnswerForQuiz = (description, correct_answer, question_id) => {
    return instance.post('api/v1/answer', {
        description,
        correct_answer,
        question_id
    })
}

const postAssignQuiz = (quizId, userId) => {
    return instance.post('api/v1/quiz-assign-to-user', {
        quizId,
        userId
    })
}

const getQuizWithQA = (quizId) => {
    return instance.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return instance.post(`api/v1/quiz-upsert-qa`, { ...data })
}

const getOverview = () => {
    return instance.get(`api/v1/overview`)
}

const getHistory = () => {
    return instance.get(`api/v1/history`)
}


export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister, getQuizByUser,
    getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, deleteQuiz, putUpdateQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuiz, postAssignQuiz, getQuizWithQA, postUpsertQA, postLogout, getOverview, postChangePassword,
    postUpdateProfile, getHistory

}