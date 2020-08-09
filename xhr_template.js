
// function savedata(name, data) {
//     var xhr = new XMLHttpRequest();
//     xhr.timeout = 5000;
//     savedata_status_div.textContent = 'uploading...';
//     xhr.onerror = () => {
//         savedata_status_div.textContent = 'upload failed';
//     };
//     xhr.onload = () => {
//         savedata_status_div.textContent = 'upload success:';
//         let json_response = JSON.parse(xhr.response);
//         savedata_status_div.textContent += json_response.c;
//     };

//     xhr.open('POST', 'receive.php');
//     xhr.send(JSON.stringify({ filename: name, filedata: data }));
// }
