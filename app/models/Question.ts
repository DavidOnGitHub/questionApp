interface IQuestion {
    id: string
    title: string
    content: string
    tags: Array<string>
    accountId: string
}

class Question implements IQuestion {
    id: string
    accountId: string
    content: string
    tags: Array<string>
    title: string
    
    constructor() {
        this.tags = [];
    }
}

export {IQuestion, Question};
    
