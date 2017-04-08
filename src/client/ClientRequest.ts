import { FileUploadInfo } from "../server/fileUploadInfo";
import {DataModel} from "../model/dataModel";

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
                    //let dm = new DataModel(xhr.responseText);

                    let obj = [
    {
        "A": "ID",
        "B": "Name",
        "C": "Analysis Active",
        "D": "Analysis Done",
        "E": "Dev Active",
        "F": "Dev Done",
        "G": "Testing",
        "H": "Done",
        "I": "Team",
        "J": "Type",
        "K": "Blocked Days"
    },
    {
        "A": "100001",
        "B": "Sample Item 1",
        "C": "Mar 05 2017",
        "D": "Mar 05 2017",
        "E": "Mar 13 2017",
        "F": "Mar 13 2017",
        "G": "Mar 13 2017",
        "I": "Team 3",
        "J": "User Story",
        "K": "2"
    },
    {
        "A": "100002",
        "B": "Sample Item 2",
        "C": "Mar 04 2017",
        "D": "Mar 04 2017",
        "E": "Mar 04 2017",
        "F": "Mar 13 2017",
        "G": "Mar 13 2017",
        "I": "Team 4",
        "J": "User Story",
        "K": "0"
    },
    {
        "A": "100350",
        "B": "Sample Item 350",
        "I": "Team 4",
        "J": "User Story",
        "K": "0"
    }
];
                    let str = JSON.stringify(obj);
                    let dm = new DataModel(str);
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