// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("tr");
let i;
for (i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  const table = document.querySelector('.playlist-table');
  let tr = document.createElement("tr");

  let songInput = document.getElementById("songInput").value;
  let artistInput = document.getElementById("artistInput").value;
  let explicitInput = document.getElementById("explicitInput").value;

  tr.innerHTML = `
    <td>${songInput}</td>
    <td>${artistInput}</td>
    <td>${explicitInput}</td>`;

  if (table) {
    table.append(tr);
  }

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  tr.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}