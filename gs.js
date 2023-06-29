// Gets the main html file and runs it
function doGet(e){
    let tmp = HtmlService.createTemplateFromFile('index');
    return tmp.evaluate();
  }
  
// Helper function used to link multiple html files (Used to link stylesheet.html and js.html to index.html)
function include(filename){ 
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Helper function used to check if value is an Integer
function isInt(value) {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}

// Function used to add the given infomation inputted by the user on the web app to google sheets.
// This function is called by the addRecord() function in js.html when the "add" button is clicked.
function addRecordToSheets(vars) {
    console.log(vars);
    let sid = vars.sid;
    let tbb = vars.tbb;
    let intern = vars.intern;
    let scholarship = vars.scholarship;
    let emergency = vars.emergency;
    let undocuScholars = vars.undocuScholars;
    let firebaugh = vars.firebaugh;
    let staff = vars.staff;
    Logger.log("Variables: " + [sid, tbb, intern, scholarship, emergency, undocuScholars, firebaugh, staff]);
    let url = "";
    let ss = SpreadsheetApp.openByUrl(url);
    let ws = ss.getSheetByName("Sheet1");
    let wssids = ws.getRange(2,2,ws.getLastRow(), 1).getValues();
    let ite = 2;
    let sidFound = false;
    for (let i = 0; i < wssids.length - 1; i++) {
        var wssid = wssids[i][0];
        if (sid == wssid) {
        sidFound = true;
        break;
        }
        ite += 1;
    }
    let tbbCell = ws.getRange('E' + ite);
    let internCell = ws.getRange('F' + ite);
    let scholarshipCell = ws.getRange('G' + ite);
    let emergencyCell = ws.getRange('H' + ite);
    let undocuScholarsCell = ws.getRange('I' + ite);
    let firebaughCell = ws.getRange('J' + ite);
    let staffCell = ws.getRange('K' + ite);
    if (sidFound) {
        if (tbbCell.getValue() == "" || (tbbCell.getValue() != tbb && isInt(tbb))) {
        tbbCell.setValue(tbb);
        }
        if (internCell.getValue() == "" || (internCell.getValue() != intern && isInt(intern))) {
        internCell.setValue(intern);
        }
        if (scholarshipCell.getValue() == "" || (scholarshipCell.getValue() != scholarship && isInt(scholarship))) {
        scholarshipCell.setValue(scholarship);
        }
        if (emergencyCell.getValue() == "" || (emergencyCell.getValue() != emergency && isInt(emergency))) {
        emergencyCell.setValue(emergency);
        }
        if (undocuScholarsCell.getValue() == "" || (undocuScholarsCell.getValue() != undocuScholars && isInt(undocuScholars))) {
        undocuScholarsCell.setValue(undocuScholars);
        }
        if (firebaughCell.getValue() == "" || (firebaughCell.getValue() != firebaugh && isInt(firebaugh))) {
        firebaughCell.setValue(firebaugh);
        }
        if (staffCell.getValue() == "" || (staffCell.getValue() != staff &  staff != "")) {
        staffCell.setValue(staff);
        }
    } else {
        throw Error("sid does not exists");
    }
}

// Function used to search a record in google sheets with the sid inputted by the user on the web app.
// This function is called by the searchRecord() function in js.html when the "search" button is clicked.
function searchRecordBySid(sid) {
    let url = "";
    let ss = SpreadsheetApp.openByUrl(url);
    let ws = ss.getSheetByName("Sheet1");
    let wssids = ws.getRange(2,2,ws.getLastRow(), 1).getValues();

    let sidList = wssids.map(function(r) { return r[0]; });
    let position = sidList.indexOf(Number(sid));
    if (position > -1 && sid != "") {
        position += 2;
        let data = {
            nameCell: ws.getRange('A' + position).getValue(),
            sidCell: ws.getRange('B' + position).getValue(),
            emailCell: ws.getRange('C' + position).getValue(),
            tbbCell: ws.getRange('E' + position).getValue(),
            internCell: ws.getRange('F' + position).getValue(),
            scholarshipCell: ws.getRange('G' + position).getValue(),
            emergencyCell: ws.getRange('H' + position).getValue(),
            undocuScholarsCell: ws.getRange('I' + position).getValue(),
            firebaughCell: ws.getRange('J' + position).getValue(),
            staffCell: ws.getRange('K' + position).getValue()
        }
        Logger.log("Data: " + data);
        return data;
    } else {
        throw Error("sid does not exists");
    }
}

    // Function used to search a record in google sheets with the email inputted by the user on the web app.
    // This function is called by the searchRecord() function in js.html when the "search" button is clicked.
function searchRecordByEmail(email) {
    let url = "";
    let ss = SpreadsheetApp.openByUrl(url);
    let ws = ss.getSheetByName("Sheet1");
    let wsEmails = ws.getRange(2,3,ws.getLastRow(), 1).getValues();

    let emailList = wsEmails.map(function(r) { return r[0]; });
    let position = emailList.indexOf(email);
    if (position > -1 && email != "") {
        position += 2;
        let data = {
            nameCell: ws.getRange('A' + position).getValue(),
            sidCell: ws.getRange('B' + position).getValue(),
            emailCell: ws.getRange('C' + position).getValue(),
            tbbCell: ws.getRange('E' + position).getValue(),
            internCell: ws.getRange('F' + position).getValue(),
            scholarshipCell: ws.getRange('G' + position).getValue(),
            emergencyCell: ws.getRange('H' + position).getValue(),
            undocuScholarsCell: ws.getRange('I' + position).getValue(),
            firebaughCell: ws.getRange('J' + position).getValue(),
            staffCell: ws.getRange('K' + position).getValue()
        }
        Logger.log("Data: " + data);
        return data;
    } else {
        throw Error("sid does not exists");
    }
}