  //Update Student Information button. When clicked, it displays the form. 
  function updateForm() {
    var home = document.getElementById("home");
    var form = document.getElementById("update");
    home.style.display = "none";
    form.style.display = "block";
  }

  //Search Student Information button. When clicked, it displays the form. 
  function searchForm() {
    var home = document.getElementById("home");
    var form = document.getElementById("search");
    home.style.display = "none";
    form.style.display = "block";
  }

  // Back button. When clicked, it returns to the home page
  function back() {
    var home = document.getElementById("home");
    var updateForm = document.getElementById("update");
    var searchForm = document.getElementById("search");
    let summary = document.getElementById("summary");

    if (updateForm.style.display == "block") {
      home.style.display = "block";
      updateForm.style.display = "none";
    } else if (summary.style.display == "block") {
      home.style.display = "block";
      summary.style.display = "none";
      searchForm.style.display = "none";
    } else {
      home.style.display = "block";
      searchForm.style.display = "none";
    }
  }

  // Function used to switch between search types.
  function searchType() {
    var type = document.getElementById("searchType");
    var sid = document.getElementById("sidInput");
    var uid = document.getElementById("uidInput");
    var email = document.getElementById("emailInput");
    if (type.value == "sid") {
      sid.style.display = "block";
      uid.style.display = "none";
      email.style.display = "none";
    } else if (type.value == "uid") {
      sid.style.display = "none";
      uid.style.display = "block";
      email.style.display = "none";
    } else {
      sid.style.display = "none";
      uid.style.display = "none";
      email.style.display = "block";
    }
  }

  // Function called by recordFound(data)
  function informationSumm() {
    let summary = document.getElementById("summary");
    let form = document.getElementById("search");
    form.style.display = "none";
    summary.style.display = "block";
  }

  // If record in found in the database (google sheets), retrieves the information 
  // and displays it in the web app by calling informationSumm()
  function recordFound(data) {
    if (data.internCell != "") {
      document.getElementById("summInternBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summInternBox").innerHTML = "&#10060;";
    }
    if (data.tbbCell != "") {
      document.getElementById("summTbbBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summTbbBox").innerHTML = "&#10060;";
    }
    if (data.emergencyCell != "") {
      document.getElementById("summEmergencyBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summEmergencyBox").innerHTML = "&#10060;";
    }
    if (data.scholarshipCell != "") {
      document.getElementById("summScholarshipBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summScholarshipBox").innerHTML = "&#10060;";
    }
    if (data.undocuScholarsCell != "") {
      document.getElementById("summUndocuBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summUndocuBox").innerHTML = "&#10060;";
    }
    if (data.firebaughCell != "") {
      document.getElementById("summFirebaughBox").innerHTML = "&#9989;";
    } else {
      document.getElementById("summFirebaughBox").innerHTML = "&#10060;";
    }
    document.getElementById("summName").innerHTML = data.nameCell;
    document.getElementById("summSid").innerHTML = data.sidCell;
    document.getElementById("summUid").innerHTML = "n/a";
    document.getElementById("summIntern").innerHTML = "$" + data.internCell;
    document.getElementById("summTbb").innerHTML = "$" + data.tbbCell;
    document.getElementById("summEmergency").innerHTML = "$" + data.emergencyCell;
    document.getElementById("summScholarship").innerHTML = "$" + data.scholarshipCell;
    document.getElementById("summUndocu").innerHTML = "$" + data.undocuScholarsCell;
    document.getElementById("summFirebaugh").innerHTML = "$" + data.firebaughCell;
    document.getElementById("summStaff").innerHTML = data.staffCell;
    informationSumm();
  }

  // Function used to search a specific record based on its search type inputted by the user on the web app from google sheets.
  // This function is triggered when the "search" button is clicked.
  function searchRecord() {
    let type = document.getElementById("searchType");
    let sid = document.getElementById("sidSearch");
    let uid = document.getElementById("uidSearch");
    let email = document.getElementById("emailSearch");
    if (type.value == "sid") {
      google.script.run.withSuccessHandler(recordFound).withFailureHandler(noSid).searchRecordBySid(sid.value);
      sid.value = "";
    } else if (type.value == "uid") {
      google.script.run.searchRecordByUid(uid.value);
    } else {
      google.script.run.withSuccessHandler(recordFound).withFailureHandler(noSid).searchRecordByEmail(email.value);
      email.value = "";
    }
  }

  // Function used to switch between submission types.
  function submissionType() {
    var type = document.getElementById("typeOfSubmission");
    var awards = document.getElementById("awards");
    var appointments = document.getElementById("appointments");
    if (type.value == "awards") {
      appointments.style.display = "none";
      awards.style.display = "block";
    } else {
      awards.style.display = "none";
      appointments.style.display = "block";
    }
  }

  // Sets up the initial state of the web app when the DOM is loaded.
  // document.addEventListener("DOMContentLoaded", function(event) {
  //   var awards = document.getElementById("awards");
  //   awards.style.display = "block";
  // });

  // Helper function used to alert the user if the inputted SID is not found in the database (google sheets)
  function noSid() {
    alert("Record not found.");
  }

  // Helper function used to alert the user if the inputted SID is not found in the database (google sheets)
  function recordAdded() {
    document.getElementById("sid").value = "";
    document.getElementById("amount").value = "";
  }

  // Function used to add the given infomation inputted by the user on the web app to google sheets.
  // This function is triggered when the "add" button is clicked.
  function addRecord() {
    let typeOfSubmission = document.getElementById("typeOfSubmission").value;
    let vars = {
      sid: document.getElementById("sid").value,
      tbb: "",
      intern: "",
      scholarship: "",
      emergency: "",
      undocuScholars: "",
      firebaugh: "",
      staff: ""
    }
    if (typeOfSubmission == "awards") {
      let awardType = document.getElementById("typeOfAward").value;
      let amount = document.getElementById("amount").value;
      for (var key in vars) {
        if (awardType == key) {
          vars[key] = amount;
        }
      }
    } else {
      vars.staff = document.getElementById("staff").value;
    }
    // google.script.run.withSuccessHandler(recordAdded).withFailureHandler(noSid).addRecordToSheets(vars);
    google.script.run.withFailureHandler(noSid).addRecordToSheets(vars);
    document.getElementById("sid").value = "";
    document.getElementById("amount").value = "";
  }