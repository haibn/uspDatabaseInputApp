// Gets the main html file and runs it
function doGet(e){
    return HtmlService.createTemplateFromFile('index').evaluate();
}

// Helper function used to link multiple html files
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
    let sid = vars.sid;
    let tbb = vars.tbb;
    let intern = vars.intern;
    let scholarship = vars.scholarship;
    let emergency = vars.emergency;
    let undocuScholars = vars.undocuScholars;
    let firebaugh = vars.firebaugh;
    let staff = vars.staff;
    Logger.log("Variables: " + [sid, tbb, intern, scholarship, emergency, undocuScholars, firebaugh, staff]);
    let url = "https://docs.google.com/spreadsheets/d/1TrRa9c8rLXf63JnLqOF8VW2xCTo44fEbl4RyOkRi3SY/edit#gid=1510457293";
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
  