// Create a "close" button and append it to each list item
// let myNodelist = document.getElementsByTagName("tr");
// let i;
// for (i = 0; i < myNodelist.length; i++) {
//   let span = document.createElement("SPAN");
//   let txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
// let close = document.getElementsByClassName("close");
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     let div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// Create a new list item when clicking on the "Add" button
// function newElement() {
//   const table = document.querySelector('.playlist-table');
//   let tr = document.createElement("tr");

//   let songInput = document.getElementById("songInput").value;
//   let artistInput = document.getElementById("artistInput").value;
//   let explicitInput = document.getElementById("explicitInput").value;

//   tr.innerHTML = `
//     <td>${songInput}</td>
//     <td>${artistInput}</td>
//     <td>${explicitInput}</td>`;

//   if (table) {
//     table.append(tr);
//   }

//   let span = document.createElement("SPAN");
//   let txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   tr.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       let div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }

function add_row(){
 let new_song=document.getElementById("songInput").value;
 let new_explicit=document.getElementById("explicitInput").value;
	
 let table=document.getElementById("myTable");
 let table_len=(table.rows.length)-1;
 let row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='song_row"+table_len+"'>"+new_song+"</td><td id='explicit_row"+table_len+"'>"+new_explicit+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

//  document.getElementById("songInput").value="";
//  document.getElementById("explicitInput").value="";
}

function edit_row(no){
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 let song=document.getElementById("song_col"+no);
 let explicit=document.getElementById("explicit_col"+no);
	
 let song_data=song.innerHTML;
 let explicit_data=explicit.innerHTML;
	
 song.innerHTML="<input type='text' id='songInput"+no+"' value='"+song_data+"'>";
 explicit.innerHTML="<input type='radio' id='explicitInput"+no+"' value='"+explicit_data+"'>";
}

function save_row(no){
 let song_val=document.getElementById("songInput"+no).value;
 let explicit_val=document.getElementById("explicitInput"+no).value;

 document.getElementById("song_col"+no).innerHTML=song_val;
 document.getElementById("explicit_col"+no).innerHTML=explicit_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no){
//  document.getElementById("row"+no+"").outerHTML="";
 document.getElementsByTagName("tr"+no+"").outerHTML="";
}