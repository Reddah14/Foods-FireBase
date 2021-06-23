//HANDLE ERRORS: Created a funtion file to show toast when error

import { Dialog } from 'quasar'

export function showMessage(Message) {
    Dialog.create({
        title: 'Error',
        message: Message
    })
}