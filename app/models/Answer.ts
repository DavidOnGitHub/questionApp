interface IAnswer {
    id: string
    content: string
    createdTime: Date
    questionId: string
    accountId: string
    metadata?: any
}

class Answer implements IAnswer {
    id: string
    content: string
    createdTime: Date
    questionId: string
    accountId: string
    metadata: any
    
    constructor(questionId) {
        this.questionId = questionId;
    }
}

export {IAnswer, Answer};