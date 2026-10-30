// Preventive Maintenance Scheduler: works out the next due date and a status.
(function () {
  var DUE_SOON_DAYS = 7;
  var MS_PER_DAY = 24 * 60 * 60 * 1000;

  var form = document.getElementById("scheduler-form");
  var result = document.getElementById("result");

  // Turns "2026-10-30" into a date at local midnight, so the time of day never matters.
  function parseDate(value) {
    var parts = value.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function todayAtMidnight() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // Whole days from one date to another. Rounding absorbs the 1-hour shift when clocks change.
  function daysBetween(from, to) {
    return Math.round((to - from) / MS_PER_DAY);
  }

  function formatDate(date) {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function showError(messages) {
    result.className = "result result-error";
    result.innerHTML = "";
    var list = document.createElement("ul");
    messages.forEach(function (message) {
      var item = document.createElement("li");
      item.textContent = message;
      list.appendChild(item);
    });
    result.appendChild(list);
  }

  function daysText(daysLeft) {
    if (daysLeft === 0) return "Due today";
    if (daysLeft > 0) return daysLeft + (daysLeft === 1 ? " day left" : " days left");
    var overdue = -daysLeft;
    return overdue + (overdue === 1 ? " day overdue" : " days overdue");
  }

  function statusFor(daysLeft) {
    if (daysLeft < 0) return "Overdue";
    if (daysLeft <= DUE_SOON_DAYS) return "Due soon";
    return "OK";
  }

  function addRow(list, label, value) {
    var term = document.createElement("dt");
    term.textContent = label;
    var detail = document.createElement("dd");
    detail.textContent = value;
    list.appendChild(term);
    list.appendChild(detail);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("vehicle-name").value.trim();
    var type = document.getElementById("vehicle-type").value;
    var lastValue = document.getElementById("last-date").value;
    var frequencyText = document.getElementById("frequency").value.trim();
    var frequency = Number(frequencyText);
    var today = todayAtMidnight();
    var errors = [];

    if (name === "") {
      errors.push("Please enter a vehicle name.");
    }

    if (lastValue === "") {
      errors.push("Please choose the last maintenance date.");
    } else if (parseDate(lastValue) > today) {
      errors.push("The last maintenance date can't be in the future. Please choose a date that has already happened.");
    }

    if (frequencyText === "" || !Number.isInteger(frequency) || frequency < 1) {
      errors.push("Please enter the maintenance frequency as a whole number of days, 1 or more.");
    }

    if (errors.length > 0) {
      showError(errors);
      return;
    }

    var lastDate = parseDate(lastValue);
    var dueDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + frequency);
    var daysLeft = daysBetween(today, dueDate);
    var status = statusFor(daysLeft);

    result.className = "result";
    result.innerHTML = "";

    var heading = document.createElement("h2");
    heading.textContent = name + " (" + type + ")";
    result.appendChild(heading);

    var list = document.createElement("dl");
    addRow(list, "Next due date", formatDate(dueDate));
    addRow(list, "Days remaining", daysText(daysLeft));
    addRow(list, "Status", status);
    result.appendChild(list);
  });
})();
