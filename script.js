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

document.addEventListener("DOMContentLoaded", function(event) {
  var awards = document.getElementById("awards");
  awards.style.display = "block";
});

function noSid() {
  alert("SID not found.");
}

function addRecord() {
  let typeOfSubmission = document.getElementById("typeOfSubmission").value;
  let awardType = 'n/a';
  let amount = 'n/a';
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
  console.log(vars.sid);
  console.log(typeOfSubmission);
  if (typeOfSubmission == "awards") {
    awardType = document.getElementById("typeOfAward").value;
    amount = document.getElementById("amount").value;
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
