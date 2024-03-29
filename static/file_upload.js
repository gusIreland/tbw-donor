var nameList;

$(document).ready(function() {
  getList();
    $('#table').dataTable();
} );


function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var f = files[0];
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            // Get each row
            var file_contents = e.target.result;
            var rows = file_contents.split("\r");

            // Create a new array to populate
            var array = [];
            for (var i = 0; i < rows.length; i++){
                // Split up each row into separate columns
                var record = rows[i].split(",");
                array.push(record);
            }
            array.shift();
            console.log(array);
            add(array);
        };
    })(f);
    reader.readAsText(f);
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);

function populateList(){
  if(nameList === undefined) return;
  console.log(nameList);
  var container = $("#names");
  container.html("");
  for(var i = 0; i < nameList.length; i++){ 
    var tableItem = $("<tr>");
    var name = ("<td>"+nameList[i].name+"</td>");
    var email = ("<td>"+nameList[i].email+"</td>");
    var edit= ("<td>Edit</td>");
    var del = $("<td><a>Delete</a></td>");
    (
      function(){
        var index = i;
        var id = nameList[i].name;
        del.click(function(){
        nameList.splice(index, 1);
        remove(id);
    });
    })(); 
    tableItem.append(name);
    tableItem.append(email);
    tableItem.append(edit);
    tableItem.append(del);
    container.append(tableItem);
  }
}


  function add(files) {
    $.ajax({
      type: "post",
      data: {"files": files},
      url: "/create",
      success: function(data) {
        getList();
           }
    });
  }

  function getList() {
    $.ajax({
      type: "get",
      url: "/create",
      success: function(data) {
        nameList = data.list;
        populateList();
           }
    });
  }

  function remove(id) {
    $.ajax({
      type: "delete",
      url: "/create/" + id,
      success: function(data) {
        populateList();
           }
    });
  }  


