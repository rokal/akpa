export class ClientRequest{

    constructor(){

    }

    public launch(file?:File):void{
        
        var formData = new FormData();
        formData.append("myfile", file);
        formData.append("text_unput", "Hello");

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "http://localhost:3030/api/v1/xlsxjs", true);
        xhr.setRequestHeader("Access-Control-Request-Headers", "*");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");                
        xhr.send(formData);
        // let formData = {
        //     // Pass a simple key-value pair 
        //     my_field: 'my_value',
        //     my_buffer: new Buffer([1, 2, 3]),
        //     my_file: file
  // Pass multiple values /w an Array 
//   attachments: [
//     fs.createReadStream(__dirname + '/attachment1.jpg'),
//     fs.createReadStream(__dirname + '/attachment2.jpg')
//   ],
  // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS} 
  // Use case: for some types of streams, you'll need to provide "file"-related information manually. 
  // See the `form-data` README for more information about options: https://github.com/form-data/form-data 
//   custom_file: {
//     value:  fs.createReadStream('/dev/urandom'),
//     options: {
//       filename: 'topsecret.jpg',
//       contentType: 'image/jpeg'
//     }
        // };
        
        // let req = R.post({
        //     url:"localhost:3030/api/v1/jszip",
        //     formData:formData
        // }, this.callback);
    }
}