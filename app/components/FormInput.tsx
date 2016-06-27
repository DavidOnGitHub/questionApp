import * as React from 'react';
import {connect} from 'react-redux';
import {Glyphicon} from 'react-bootstrap';
import {Troolean} from '../constants/Troolean';
import * as formAction from '../actions/formActions';
import {debounce} from '../utils/functionUtils';
import {IField} from '../models/FormAction';

import {log} from '../utils/debugUtils';

interface IProps {
    placeholderText?: string,
    type?: string,
    classes?: string,
    showIconForValidation?: boolean,
    immediateValidate?: boolean,
    isTextArea?: boolean,
    formName: string,
    fieldName: string,
    validateErrorMessage?: string,
    asyncValidateErrorMessage?: string,
    validateFunction?(value: string): boolean,
    asyncValidateFunction?(value: string): Promise<any>,
    actions: {
        validate?(value: string): Promise<any>,
        asyncValidate?(value: string): boolean,
        asyncValidateReset?(): void,
        onChange(value: string): void,
        onBlur(): void
    }
    field: IField
}
interface IState {
    isShowValidationError?: boolean,
    isShowAsyncValidationError?: boolean,
    isAsyncValidating?: boolean
}

class FormInput extends React.Component<IProps, IState> {
    constructor() {
        super();
        
        const debounced = debounce(this.debounceAsyncValidate, 800, false);
        if (debounced) {
            this.debounceAsyncValidate = debounced.newFunc;
            this.cancelAsyncValidate = debounced.cancel;
        }
        
        this.onChange = this.onChange.bind(this);
    }
    
    debounceAsyncValidate(value: string) {
        const {asyncValidate} = this.props.actions;
        if (asyncValidate) {
            return asyncValidate(value);
        }
        return null;
    }
    
    cancelAsyncValidate() {}
    
    onChange(event) {
        const {type} = this.props;
        const {onChange, validate, asyncValidate} = this.props.actions;
        let value = null;
        if (type === 'checkbox') {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }

        onChange(value);
        if (validate) {
            validate(value);
            if (asyncValidate) {
                if (this.props.validateFunction(value)) {
                    this.props.actions.asyncValidateReset();
                    this.debounceAsyncValidate(value);
                } else {
                    this.cancelAsyncValidate();
                }
            }
        }
    }
    render() {
        const {field,
               type,
               isTextArea,
               classes,
               fieldName,
               validateErrorMessage, 
               asyncValidateErrorMessage, 
               placeholderText, 
               showIconForValidation,
               immediateValidate} = this.props;
        
        const {onBlur} = this.props.actions;
        const placeholder = placeholderText || '';
        const inputType = type || 'text';
        const showValidationError = immediateValidate && (field.isTouched || !!field.value) || field.isTouched;
        
        return (
            <div>
                {!isTextArea && <input name={fieldName} type={type}
                       className={classes}
                       placeholder={placeholder}
                       onChange={this.onChange}
                       onBlur={onBlur}/>}
                {isTextArea && <textarea name={fieldName} type={type}
                       className={classes}
                       placeholder={placeholder}
                       onChange={this.onChange}
                       onBlur={onBlur}/>}
                {field.isAsyncValidating && <Glyphicon glyph='repeat' className='glyphicon-spin'></Glyphicon>}
                {showIconForValidation && showValidationError && field.isValid && <Glyphicon glyph='ok'></Glyphicon>}
                {showIconForValidation && showValidationError && !field.isValid && <Glyphicon glyph='remove'></Glyphicon>}
                {!showIconForValidation && showValidationError && !field.isValid && <span>{validateErrorMessage}</span>}
                {field.isValid && Troolean.isFalse(field.isAsyncValid) && !field.isAsyncValidating && <span>{asyncValidateErrorMessage}</span>}
                {field.isValid && Troolean.isTrue(field.isAsyncValid) && !field.isAsyncValidating && <Glyphicon glyph='ok'></Glyphicon>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {fieldName, formName} = ownProps;
    
    return {
        field: state.form[formName][fieldName]
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {fieldName, formName, validateFunction, asyncValidateFunction} = ownProps;
    const actions = {
        onChange: (value: string) => dispatch(formAction.onChange(formName, fieldName, value)),
        onBlur: () => dispatch(formAction.onBlur(formName, fieldName))
    };
    if (validateFunction) {
        Object.assign(actions, {
            validate: (value: string) => dispatch(formAction.validate(formName, fieldName, validateFunction, value))
        });
    }
    if (asyncValidateFunction) {
        Object.assign(actions, {
            asyncValidate: (value: string) => dispatch(formAction.asyncValidate(formName, fieldName, asyncValidateFunction, value)),
            asyncValidateReset: () => dispatch(formAction.asyncValidateReset(formName, fieldName))
        });
    }
    return {
        actions
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);