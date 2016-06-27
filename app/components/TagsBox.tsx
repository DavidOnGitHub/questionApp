import * as React from 'react';
import {connect} from 'react-redux';
import {onChange} from '../actions/formActions';
import {IField} from '../models/FormAction';
import {contains} from '../utils/collectionUtils';

interface IProps {
    allTags: Array<string>,
    // currentTags: Array<string>,
    formName: string,
    tagsField: IField,
    // onTagsChange: (tags: Array<string>) => void,
    actions: {
        setTags(tags: Array<string>): void
    }
}
interface IState {
    suggestedTags: Array<string>
    inputValue: string
}
function getSuggestedTags(allTags: Array<string>, filterWord: string, tagsToExclude: Array<string>) {
    return allTags.filter((tag) => tag.startsWith(filterWord) && tagsToExclude.indexOf(tag) < 0);
}
class TagsBox extends React.Component<IProps, IState> {
    constructor() {
        super();
        this.state = {
            suggestedTags: [],
            inputValue: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputKeyPress = this.inputKeyPress.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.hideSuggestionBox = this.hideSuggestionBox.bind(this);
        // this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        if (document.documentElement.addEventListener) {
            document.documentElement.addEventListener('click', this.hideSuggestionBox, false);
        }
    }
    componentWillUnmount() {
        if (document.documentElement.removeEventListener) {
            document.documentElement.removeEventListener('click', this.hideSuggestionBox, false);
        }
    }
    hideSuggestionBox(event) {
        const element = event.target;
        if (element.nodeName !== 'LI' && element.nodeName !== 'INPUT') {
            this.setState(Object.assign({}, this.state, {
                suggestedTags: []
            }));
        }
    }
    removeTag(tagValue) {
        const {tagsField, actions} = this.props;
        const newTags = Array.from(Array<string>(tagsField.value));

        newTags.splice(newTags.indexOf(tagValue));
        actions.setTags(newTags);
    }
    
    addTag(tagValue) {
        const {tagsField, actions} = this.props;
        
        const newTags = tagsField.value.slice(0);

        if (!contains(newTags, tagValue)) {
            newTags.push(tagValue);
            actions.setTags(newTags);
        }
        this.setState(Object.assign({}, this.state, {
            suggestedTags: [],
            inputValue: ''
        }));
    }
    inputChange(event) {
        if (event.target.value.trim() !== '') {
            const suggestedTags = getSuggestedTags(this.props.allTags, event.target.value, this.props.tagsField.value);
            this.setState(Object.assign({}, this.state, {
                inputValue: event.target.value,
                suggestedTags,
                shouldShowSuggestion: true
            }));
        } else {
            this.setState(Object.assign({}, this.state, {
                inputValue: '',
                suggestedTags: [],
                shouldShowSuggestion: false
            }));
        }
    }
    inputFocus() {
        this.setState(Object.assign({}, this.state, {
            shouldShowSuggestion: true
        }));
    }
    inputKeyPress(event) {
        if (event.which === 13) {
            event.preventDefault();
            this.addTag(event.target.value);
        }
    }
    render() {
        // const {currentTags} = this.props;
        const currentTags = this.props.tagsField.value || [];
        const {inputValue, suggestedTags} = this.state;
        
        return (
            <div className='tag-box'>
                <div className='tag-container'>
                    <div>
                        {
                            currentTags.map((tagValue) => (
                            <span className='tag-item' key={tagValue}>{tagValue}
                                <a className='glyphicon glyphicon-remove' onClick={() => this.removeTag(tagValue)}/>
                            </span>))
                        }
                        <input className='tag-input' value={inputValue} 
                            onChange={this.inputChange} 
                            onFocus={this.inputFocus} 
                            
                            onKeyPress={this.inputKeyPress}/>
                        {(suggestedTags.length > 0) &&
                        (<div className='suggestion-box-container'>
                            <ul>
                                {suggestedTags.map((tag) => (
                                    <div key={tag} >
                                        <li onClick={() => this.addTag(tag)}>{tag}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {formName} = ownProps;
    return {
        tagsField: state.form[formName]['tags']
    };
    
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {formName} = ownProps;
    return {
        actions: {
            setTags: (tags: Array<string>) => dispatch(onChange(formName, 'tags', tags))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsBox);