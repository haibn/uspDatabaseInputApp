function submissionType() {
    var type = document.getElementById("typeOfSubmission");
    var awards = document.getElementById("awards");
    var appointments = document.getElementById("appointments");
    var form = document.getElementsByClassName("form");
    console.log(type);
    if (type.value === "awards") {
      appointments.style.display = "none";
      awards.style.display = "block";
      form[0].style.height = "550px";
    } else {
      awards.style.display = "none";
      appointments.style.display = "block";
      form[0].style.height = "480px";
    }
  }

document.addEventListener("DOMContentLoaded", function(event) {
  var awards = document.getElementById("awards");
  awards.style.display = "block";
});