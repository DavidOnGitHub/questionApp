export enum Troolean {
    TRUE,
    FALSE,
    NONE
};

export module Troolean {
    export const isTrue = (value: Troolean) => value === Troolean.TRUE;
    export const isFalse = (value: Troolean) => value === Troolean.FALSE;
    export const isNone = (value: Troolean) => value === Troolean.NONE;
    export const valueOf = (value: boolean): Troolean => {
        if (value === true) {
            return Troolean.TRUE;
        } else if (value === false) {
            return Troolean.FALSE;
        } else {
            return Troolean.NONE;
        };
    }
};