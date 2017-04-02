import {FileUploadInfo} from "../shared/fileUploadInfo";

export class ClientRequest {

    constructor() {
    }

    public launch(file?: File): void {

        var formData = new FormData();
        formData.append(FileUploadInfo.FIELD_FILE, file);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.updateProgress);
        xhr.upload.addEventListener("load", this.transferComplete);
        xhr.upload.addEventListener("error", this.transferFailed);
        xhr.upload.addEventListener("abort", this.transferCanceled);

        xhr.open('POST', "http://localhost:3030" + FileUploadInfo.ROUTE_XLSJS, true);
        //xhr.setRequestHeader("Access-Control-Request-Headers", "*");
        //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");                
        xhr.send(formData);
    }

    private updateProgress(event: any): void {

    }

    private transferComplete(event: any) {
        console.log("The transfer is complete.");
    }

    private transferFailed(event: any) {
        console.log("An error occurred while transferring the file.");
    }

    private transferCanceled(event: any) {
        console.log("The transfer has been canceled by the user.");
    }
}