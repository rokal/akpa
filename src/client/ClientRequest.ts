import { FileUploadInfo } from "../server/fileUploadInfo";
import {DataModel} from "../model/dataModel";

export class ClientRequest {

    private serverAddress:string

    constructor() {
        //this.serverAddress = "http://54.227.206.200:80" + FileUploadInfo.ROUTE_XLSJS;
        this.serverAddress = "http://localhost:3030" + FileUploadInfo.ROUTE_XLSJS;
    }

    public launch(filename: string, callback:(dm:DataModel) => void): void {

        var formData = new FormData(document.getElementById("existingForm") as HTMLFormElement);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", this.updateProgress);
        xhr.addEventListener("load", function () {     
                    console.log(`${new Date().toLocaleTimeString()}: File ${filename} returned to client`);
                    let dm = new DataModel(xhr.responseText);
                    callback(dm);
                }, false);
        xhr.upload.addEventListener("error", this.transferFailed);
        xhr.upload.addEventListener("abort", this.transferCanceled);
        xhr.open('POST', this.serverAddress, true);

        console.log(`${new Date().toLocaleTimeString()}: File ${filename} send to server ${this.serverAddress}`);
        xhr.send(formData);
    }

    private updateProgress(event: any): void {
    }

    private transferComplete(event: Event) {
        console.log(`${new Date().toLocaleTimeString()}: The transfer is complete.`);
    }

    private transferFailed(event: any) {
        console.log(`${new Date().toLocaleTimeString()}: An error occurred while transferring the file.`);
    }

    private transferCanceled(event: any) {
        console.log(`${new Date().toLocaleTimeString()}: The transfer has been canceled by the user.`);
    }
}