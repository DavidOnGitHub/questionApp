import {Troolean} from '../constants/Troolean';

export interface IFormAction {
    type: string,
    formName: string,
    fieldName: string
};

export interface IField {
    value?: any
    isValid?: boolean,
    isTouched?: boolean,
    isAsyncValidating?: boolean,
    isAsyncValid?: Troolean
}

export const FieldProp = {
    IS_VALID: 'isValid',
    VALUE: 'value',
    IS_TOUCHED: 'isTouched',
    IS_ASYNC_VALIDATING: 'isAsyncValidating',
    IS_ASYNC_VALID: 'isAsyncValid'
};