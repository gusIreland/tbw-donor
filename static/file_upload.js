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

  function add(files) {
    $.ajax({
      type: "post",
      data: {"files": files},
      url: "/create",
      success: function(data) {
           }
    });
  }
