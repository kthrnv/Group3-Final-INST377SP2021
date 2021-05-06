function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 let song=document.getElementById("song_row"+no);
 let artist=document.getElementById("artist_row"+no);
 let explicit=document.getElementById("explicit_row"+no);
	
 let song_data=song.innerHTML;
 let artist_data=artist.innerHTML;
 let explicit_data=explicit.innerHTML;
	
 song.innerHTML="<input type='text' id='song_text"+no+"' value='"+song_data+"'>";
 artist.innerHTML="<input type='text' id='artist_text"+no+"' value='"+artist_data+"'>";
 explicit.innerHTML="<input type='text' id='explicit_text"+no+"' value='"+explicit_data+"'>";
}

function save_row(no)
{
 let song_val=document.getElementById("song_text"+no).value;
 let artist_val=document.getElementById("artist_text"+no).value;
 let explicit_val=document.getElementById("explicit_text"+no).value;

 document.getElementById("song_row"+no).innerHTML=song_val;
 document.getElementById("artist_row"+no).innerHTML=artist_val;
 document.getElementById("explicit_row"+no).innerHTML=explicit_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 let new_song=document.getElementById("songInput").value;
 let new_artist=document.getElementById("artist_name").value;
//  if (document.getElementById("explicitInput").checked) {
//     let new_explicit=document.getElementById("explicitInput").value;
//  }
let new_explicit=document.getElementById("explicitInput").value;
	
 let table=document.getElementById("data_table");
 let table_len=(table.rows.length)-1;
 let row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='song_row"+table_len+"'>"+new_song+"</td><td id='artist_row"+table_len+"'>"+new_artist+"</td><td id='explicit_row"+table_len+"'>"+new_explicit+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("songInput").value="";
 document.getElementById("artist_name").value="";
 document.getElementById("explicitInput").value="";
}