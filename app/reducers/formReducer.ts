import * as Type from '../actions/actionType';
import initialState from '../initialState';
import {Troolean} from '../constants/Troolean';
import {IFormAction, FieldProp} from '../models/FormAction';

const form = (state = initialState.form, action) => {
    const {formName, fieldName, value} = action;
    const newState = Object.assign({}, state);
    let field = null;
    
    if (formName && fieldName) {
        field = newState[formName][fieldName];
    }
    
    function setFormFieldProp(fieldProp: string, value: any): Object {
        return Object.assign(newState[formName], {
            [fieldName]: Object.assign({}, newState[formName][fieldName], {
                [fieldProp]: value
            })
        });
    }
    
    switch (action.type) {
        case Type.FORM_VALIDATE:
            setFormFieldProp(FieldProp.IS_VALID, action.validateFunction(value));
            break;
            
        case Type.FORM_ON_CHANGE:
            setFormFieldProp(FieldProp.VALUE, value);
            break;
            
        case Type.FORM_ON_BLUR:
            setFormFieldProp(FieldProp.IS_TOUCHED, true);
            break;
            
        case Type.FORM_ASYNC_VALIDATE_REQUESTED:
            setFormFieldProp(FieldProp.IS_ASYNC_VALIDATING, true);
            break;
            
        case Type.FORM_ASYNC_VALIDATE_RECEIVED:
            setFormFieldProp(FieldProp.IS_ASYNC_VALIDATING, false);
            setFormFieldProp(FieldProp.IS_ASYNC_VALID, action.isAsyncValid);
            break;

        case Type.FORM_ASYNC_VALIDATE_RESET:
            setFormFieldProp(FieldProp.IS_ASYNC_VALID, Troolean.NONE);
            break;

        case Type.FORM_RESET_FIELD:
            setFormFieldProp(FieldProp.VALUE, null);
            setFormFieldProp(FieldProp.IS_ASYNC_VALID, undefined);
            setFormFieldProp(FieldProp.IS_TOUCHED, undefined);
            setFormFieldProp(FieldProp.IS_VALID, undefined);
            setFormFieldProp(FieldProp.IS_ASYNC_VALIDATING, undefined);
            break;
            
        default:
            return state;
    }
    return newState;
};

export default form;