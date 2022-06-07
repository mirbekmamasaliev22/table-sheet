const tableWrapper = document.getElementById("table-journal");
const tableHeader = tableWrapper.getElementsByTagName("thead")[0];
const tableBody = tableWrapper.getElementsByTagName("tbody")[0];

const headers = ["Student name", "Student surname"];
for (let i = 0; i < 30; i++) {
  headers.push(`05/${i}`);
}

const headTr = document.createElement("tr");
for (const header of headers) {
  const th = document.createElement("th");
  th.textContent = header;
  headTr.appendChild(th);
}
tableHeader.appendChild(headTr);

for (let j = 0; j < 25; j++) {
  const bodyTr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = `Name ${j}`;
  bodyTr.appendChild(tdName);

  const tdSurname = document.createElement("td");
  tdSurname.textContent = `Surname ${j}`;
  bodyTr.appendChild(tdSurname);

  for (let i = 0; i < 30; i++) {
    const mark = Math.round((Math.random() * 11) % 5);

    const td = document.createElement("td");
    const input = document.createElement("input");
    input.className = "cell";
    input.type = "text";
    input.max = 5;
    input.min = 2;
    input.maxLength = 1;
    input.value = [2, 3, 4, 5].includes(mark) ? mark : "";
    input.addEventListener("keydown", navigateInTable.bind(this));
    td.appendChild(input);

    bodyTr.appendChild(td);
  }
  tableBody.appendChild(bodyTr);
}

function navigateInTable(event) {
  const keyCodes = { up: 38, right: 39, down: 40, left: 37 };
  const curKeyCode = event.keyCode;
  if (![37, 38, 39, 40].includes(curKeyCode)) {
    return;
  }
  const tableWrapper = document.getElementById("table-journal");
  const tableBody = tableWrapper.getElementsByTagName("tbody")[0];

  const inputs = tableBody.getElementsByTagName("input");
  const rows = tableBody.getElementsByTagName("tr");
  const cols = Math.round(inputs.length / rows.length);
  const indexOfEl = Array.prototype.indexOf.call(inputs, event.target);

  let focusedEl = null;
  if (curKeyCode === keyCodes.up) {
    if (0 <= indexOfEl - cols) {
      focusedEl = inputs[indexOfEl - cols];
    }
  }
  if (curKeyCode === keyCodes.right) {
    if (indexOfEl + 1 < inputs.length) {
      focusedEl = inputs[indexOfEl + 1];
    }
  }
  if (curKeyCode === keyCodes.down) {
    if (indexOfEl + cols < inputs.length) {
      focusedEl = inputs[indexOfEl + cols];
    }
  }
  if (curKeyCode === keyCodes.left) {
    if (indexOfEl - 1 >= 0) {
      focusedEl = inputs[indexOfEl - 1];
    }
  }
  if (focusedEl) {
    focusedEl.focus();
    focusedEl.setSelectionRange(0, -1);

    const inputVal = focusedEl.value;
    if (inputVal.length) {
      window.setTimeout(function () {
        focusedEl.setSelectionRange(inputVal.length - 1, inputVal.length);
      }, 0);
    }
  }
  /* 
    Up: 38
    Right: 39
    Down: keyCode: 40
    Left: 37
    */
}
