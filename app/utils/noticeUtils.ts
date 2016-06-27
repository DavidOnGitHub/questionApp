import '../../node_modules/toastr/toastr.scss';
import * as toastr from 'toastr';

toastr.options = {
    positionClass: 'toast-top-center'
}
export function showSuccess(message) {
    toastr.success(message);
}

export function showError(message) {
    toastr.error(message);
}