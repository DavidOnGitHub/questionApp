import * as Type from './actionType';
import {IFormAction} from '../models/FormAction';
import {Troolean} from '../constants/Troolean';

import {log} from '../utils/debugUtils';

function validate(formName: string, fieldName: string, validateFunction: (value: string) => boolean, value: string): IFormAction {
    return <IFormAction>{
        type: Type.FORM_VALIDATE,
        formName,
        fieldName,
        validateFunction,
        value
    };
}

function asyncValidateRequested(formName: string, fieldName: string): IFormAction {
    return {
        type: Type.FORM_ASYNC_VALIDATE_REQUESTED,
        formName,
        fieldName
    };
}

function asyncValidateReceived(formName: string, fieldName: string, isAsyncValid: Troolean): IFormAction {
    return <IFormAction>{
        type: Type.FORM_ASYNC_VALIDATE_RECEIVED,
        formName,
        fieldName,
        isAsyncValid
    };
}

function asyncValidateReset(formName: string, fieldName: string): IFormAction {
    return <IFormAction>{
        type: Type.FORM_ASYNC_VALIDATE_RESET,
        formName,
        fieldName
    };
}

function asyncValidate(formName: string, fieldName: string, asyncValidateFunction: (value: string) => Promise<any>, value: string) {
    return (dispatch) => {
        dispatch(asyncValidateRequested(formName, fieldName));
        return asyncValidateFunction(value)
               .then((isAsyncValid) => {
                   dispatch(asyncValidateReceived(formName, fieldName, Troolean.valueOf(isAsyncValid)));
               }).catch((error) => {
                   console.log(`async validate error: ${error}`);
               });
    };
}

function onChange(formName: string, fieldName: string, value: any): IFormAction {
    return <IFormAction>{
        type: Type.FORM_ON_CHANGE,
        formName,
        fieldName,
        value
    };
}

function onBlur(formName: string, fieldName: string): IFormAction {
    return {
        type: Type.FORM_ON_BLUR,
        formName,
        fieldName
    };
}

function resetField(formName: string, fieldName: string):IFormAction {
    return {
        type: Type.FORM_RESET_FIELD,
        formName,
        fieldName
    };
}

export {validate, asyncValidate, asyncValidateReset, onChange, onBlur, resetField};