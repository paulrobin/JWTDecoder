function JSONTokentoTable(tokenRaw){
    
    try{
        //decode token
        var decodedToken = jwt_decode(tokenRaw, Object);
        
        //get elements
        var myTableDiv = document.getElementById("list-tab");
        var dt = document.getElementById("decodedTable");
        var TextFieldRawToken = document.getElementById('TextFieldRawToken');
        
        //clear page of old entires
        //myTableDiv.innerHTML = ''; // clear tabList at each call
        TextFieldRawToken.innerHTML = ''

        /*
        //write decoded token to console
        for (const property in decodedToken) {
            console.log(`${property}: ${decodedToken[property]}`);
        } */
        
        //Write raw token to page
        //myTableDiv.appendChild(rawTokenToTable(tokenRaw));
        rawTokenToTextArea(tokenRaw);

        //write table to page   
        myTableDiv.appendChild(decodedTokenToTable(decodedToken));

        //check for existance of decoded table and remove
        if(dt !== null){
            dt.remove();
        }
    }catch(err){
        invalidToken();
        //console.log('Big Fat Error');
        var myTableDiv = document.getElementById("list-tab");
        myTableDiv.appendChild(invalidToken());
    }      
}

function rawTokenToTable (tokenRaw){
    
    var rawTable = document.createElement('TABLE');
    rawTable.classList.add('table');
    rawTable.classList.add('table-striped');
    rawTable.border = '1';
    //rawTable.style.width = 'auto'
    rawTable.style.wordBreak = 'break-all'
    
    var rawTableBody = document.createElement('TBODY');
    rawTable.appendChild(rawTableBody);

    //write Table headers
    var tr = document.createElement('TR');
    rawTableBody.appendChild(tr);

    var td = document.createElement('TH');
    td.appendChild(document.createTextNode("Raw Token"));
    tr.appendChild(td);
    
    var tr = document.createElement('TR');
    rawTableBody.appendChild(tr);

    var td = document.createElement('TD');
    td.appendChild(document.createTextNode(tokenRaw));
    tr.appendChild(td);

    return rawTable;

}

function rawTokenToTextArea(tokenRaw){

    var TextFieldRawToken = document.getElementById('TextFieldRawToken');
    TextFieldRawToken.value = tokenRaw;

}

function decodedTokenToTable(decodedToken){

    var decodedTable = document.createElement('TABLE');
    decodedTable.id = 'decodedTable';
    decodedTable.classList.add('table-striped');
    decodedTable.border = '1';
    decodedTable.style.paddingLeft = '10px';
    decodedTable.style.paddingRight = '10px';
        
    var decodedTableBody = document.createElement('TBODY');
    decodedTable.appendChild(decodedTableBody);

    //write Table headers
    var tr = document.createElement('TR');
    decodedTableBody.appendChild(tr);

    var td = document.createElement('TH');
    td.style.paddingLeft = '10px';
    td.style.paddingRight = '10px';
    td.appendChild(document.createTextNode("Attribute"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    td.style.paddingLeft = '10px';
    td.style.paddingRight = '10px';
    td.appendChild(document.createTextNode(`Value`));
    tr.appendChild(td);
    
    //write JWT attributes into table
    for (const property in decodedToken) {
      var tr = document.createElement('TR');
      decodedTableBody.appendChild(tr);
  
        var td = document.createElement('TH');
        td.style.paddingLeft = '10px';
        td.style.paddingRight = '10px';
        td.appendChild(document.createTextNode(`${property}`));
        tr.appendChild(td);

        var td2 = document.createElement('TD');
        td2.style.wordBreak = 'break-all'
        td2.style.width = '100%'
        td2.style.paddingLeft = '10px';
        td2.style.paddingRight = '10px';
        if(`${property}` == "iat" || `${property}` == "nbf" || `${property}` == "exp"){
            var convertedDate = ticksToDate(`${decodedToken[property]}`)
            td2.appendChild(document.createTextNode(convertedDate));
        } else if (`${property}` == "groups") {
            let groups = splitComma(`${decodedToken[property]}`);
            td2.style.whiteSpace = 'pre'
            td2.appendChild(document.createTextNode(groups));        
        } else {
            td2.appendChild(document.createTextNode(`${decodedToken[property]}`));        
        }
        tr.appendChild(td2);
    }

    return decodedTable;
}

//takes a comma seperated list and returns a multi line
function splitComma(rawGroups){
    let groups = rawGroups.split(",").join("\r\n");
    return groups;
}

function clearOriginalText(elementID, originalText){
    var selectedTextField = document.getElementById(elementID);
    //console.log(selectedTextField.value);
    //console.log(elementID);
    //console.log(originalText);
    if(selectedTextField.value == originalText){
        selectedTextField.value = '';
    }
}

function ticksToDate(ticks) {
    return new Date((ticks * 1000) + new Date('1970-01-01T00:00:00Z').getTime());
}

function invalidToken(){
    var dt = document.getElementById("decodedTable");
    if(dt !== null){
        dt.remove();
    }
    
    //create cell for invalid token message
    var decodedTable = document.createElement('TABLE');
    decodedTable.id = 'decodedTable';
    decodedTable.classList.add('table-striped');
    decodedTable.border = '1';
    decodedTable.style.paddingLeft = '10px';
    decodedTable.style.paddingRight = '10px';
        
    var decodedTableBody = document.createElement('TBODY');
    decodedTable.appendChild(decodedTableBody);

    //write Table headers
    var tr = document.createElement('TR');
    decodedTableBody.appendChild(tr);

    var td = document.createElement('TH');
    td.style.paddingLeft = '10px';
    td.style.paddingRight = '10px';
    td.appendChild(document.createTextNode("Invalid Token"));
    tr.appendChild(td);

    return decodedTable;
}

function setSessionVar(elementID){
    var elementID = document.getElementById(elementID);
    sessionStorage.setItem(elementID, elementID.value);
    console.log(sessionStorage.getItem(elementID));
}

function loadSessionVar(elementID){
    var elementID = document.getElementById(elementID);
    elementID.value = sessionStorage.getItem(elementID)
}