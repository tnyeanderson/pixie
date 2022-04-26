export const MatDialogRefStub = {
    close: () => { }
}

export const MAT_DIALOG_DATA_STUB = {
    callback: () => { }
}

export const MAT_DIALOG_DATA_SCRIPT_STUB = {
    Path: 'MOCKSCRIPTPATH',
    callback: () => { }
}

export const MAT_DIALOG_DATA_CLOUD_CONFIG_STUB = {
    Path: 'MOCKCLOUDCONFIGPATH',
    callback: () => { }
}

export const ConfirmServiceStub = {
    ask: (callback: Function, prompt?: string) => {
        callback()
    }
}
