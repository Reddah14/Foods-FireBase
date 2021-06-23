//HANDLE ERRORS: Created a funtion file to show toast when error

import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Dialog.create({
        title: 'Error',
        message: errorMessage
    })
}