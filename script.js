// Function used to switch between submission types.
function submissionType() {
  var type = document.getElementById("typeOfSubmission");
  var awards = document.getElementById("awards");
  var appointments = document.getElementById("appointments");
  var form = document.getElementsByClassName("form");
  console.log(type);
  if (type.value === "awards") {
    appointments.style.display = "none";
    awards.style.display = "block";
    form[0].style.height = "500px";
  } else {
    awards.style.display = "none";
    appointments.style.display = "block";
    form[0].style.height = "420px";
  }
}

// Sets up the initial state of the web app when the DOM is loaded.
document.addEventListener("DOMContentLoaded", function(event) {
  var awards = document.getElementById("awards");
  awards.style.display = "block";
});

// Helper function used to alert the user if the inputted SID is not found in the database (google sheets)
function noSid() {
  alert("SID not found.");
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
  google.script.run.withFailureHandler(noSid).addRecordToSheets(vars);
  document.getElementById("sid").value = "";
  document.getElementById("amount").value = "";
}
