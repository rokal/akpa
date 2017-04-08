import { FileUploadInfo } from "../server/fileUploadInfo";

export class ClientRequest {

    constructor() {
    }

    public launch(filename: string, file: File): void {

        var formData = new FormData(document.getElementById("toto") as HTMLFormElement);
        //formData.append(FileUploadInfo.FIELD_FILE, file);

        console.log("FIELD: " + FileUploadInfo.FIELD_FILE);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.updateProgress);
        xhr.addEventListener("load", function () {                    
                    var i =xhr.getResponseHeader('header');
                }, false);
        // xhr.upload.addEventListener("load", (event:Event) => {
        //     if (xhr.readyState == 4){
        //         let t = xhr.response;
        //     }
        // });
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