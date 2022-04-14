export const MatDialogRefStub = {
    close: () => { }
}

export const MAT_DIALOG_DATA_STUB = {
    callback: () => { }
}

export const ConfirmServiceStub = {
    ask: (callback: Function, prompt?: string) => {
        callback()
    }
}
