import { FileUploadInfo } from "../server/fileUploadInfo";
import {DataModel} from "../model/dataModel";

export class ClientRequest {

    constructor() {
    }

    public launch(filename: string, callback:(dm:DataModel) => void): void {

        var formData = new FormData(document.getElementById("existingForm") as HTMLFormElement);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.updateProgress);
        xhr.addEventListener("load", function () {                    
                    let dm = new DataModel(xhr.responseText);
                    callback(dm);
                }, false);
        xhr.upload.addEventListener("error", this.transferFailed);
        xhr.upload.addEventListener("abort", this.transferCanceled);

        xhr.open('POST', "http://localhost:3030" + FileUploadInfo.ROUTE_XLSJS, true);
        xhr.send(formData);
    }

    private updateProgress(event: any): void {

    }

    private transferComplete(event: Event) {
        console.log("The transfer is complete.");
    }

    private transferFailed(event: any) {
        console.log("An error occurred while transferring the file.");
    }

    private transferCanceled(event: any) {
        console.log("The transfer has been canceled by the user.");
    }


}