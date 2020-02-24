var message_list = document.getElementsByClassName("video-sms-body");
var user_list = document.getElementsByClassName("user-name");
var length =  message_list.length;
// const BOM = '\uFEFF'; 
let data = "\uFEFFuser,comment";
// TODO: Emoji?
function transfer(str)
{
    var tmp = str.replace("\"","\"\"");
    var quotation_flag = tmp.length > str.length;
    var comma_flag = false;
    for(var i = 0 ; i < tmp.length ; i++)
    {
        if(str[i] == ",")
        {
            comma_flag = true;
            break;
        }
    }
    if(quotation_flag | comma_flag)
        return "\"" + tmp + "\"";
    else
        return tmp;
}
for(var i = 0; i < length; i++)
{
    data += '\n';
    data += transfer(user_list.item(i).innerText);
    data += ',';
    data += transfer(message_list.item(i).innerText);
}
var blob = new Blob([data], { type: 'text/csv,charset=UTF-8'});
var url = URL.createObjectURL(blob);
let downloadLink = document.createElement('a');
downloadLink.href = url;
downloadLink.download = "comments.csv";
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
URL.revokeObjectURL(url);