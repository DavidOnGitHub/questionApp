export default {
    display: {
        showLoginPopup: false,
        showQuestionPopup: false
    },
    form: {
        signUpForm: {
            email: {}
        },
        registrationForm: {
            username: {},
            mainPassword: {},
            confirmPassword: {},
            showMainPassword: {},
            showConfirmPassword: {}
        },
        loginForm: {
            accountName: {},
            password: {}
        },
        newAnswerForm: {
            content: {}
        },
        questionForm: {
            title: {},
            content: {},
            tags:[]
        }
    },
    question: {
        isAddingQuestion: false,
        addQuestionLocation: null,
        selectedQuestionId: null,
        hoveredQuestionId: null,
        questions: [],
        questionToView: null
    },
    tag: {
        allTags: [],
        isFetchingTags: false
    }
};