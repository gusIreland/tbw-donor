
//document.onload(refreshDOM());
var list;

function refreshDOM(){
	var container = $("#table");
	container.html("");
	var tableHead = refreshHead()
	container.append(tableHead)
	
	var tableBody = refreshBody();
	
	container.append(tableBody);

}

function refreshHead(){
  var tableHead = $("<thead>");
	var infoRow = $("<tr>")
	newHeader = $("<th>");
	newHeader.append("");
	userRow.append(newHeader);
	for( i in group)
	{
		var newHeader = $("<th>");
		var htmlName = $("<h2>" + auth.group.users[i].username + "</h2>");
		newHeader.append(htmlName);
		userRow.append(newHeader);
		
	}
	tableHead.append(userRow);
	return tableHead;
  }
  
  function refreshBody(){
	var tableBody = $("<tbody>");
	var newRow = $("<tr>");
	var item = $("<td>");
	var itemHtml = "You owe them" 
	item.append(itemHtml);
	newRow.append(item);
	for( i in auth.group.users){
		if(auth.user !== auth.group.users[i].username){
		var item = $("<td>");
		var itemHtml = tallyUserOwed(i); 
		item.append(itemHtml);
		newRow.append(item);
		}
		
	}
	
	
	tableBody.append(newRow);
	return tableBody;
  }



function get() {
    $.ajax({
      type: "get",
      url: "/excel",
      success: function(data) {
        list = data.list;
        //console.log(budgetList);
        refreshDOMBudget();
      }
    });
  }

  function add() {
    $.ajax({
      type: "post",
      data: {},
      url: "/excel",
      success: function(data) {
		 list = data.list;
		 refreshDOMBudget();
		   }
    });
  }

  function edit() {
    refreshDOMBudget();
    $.ajax({
      type: "put",
      data: {},
      url: "/excel/" + id,
      success: function(data) { 
		  refreshDOMBudget();
		  }
    });
  }

  function del(id) {
	  
	$.ajax({
      type: "delete",
      url: "/excel/" + id,
	 data: {auth: auth},
   
      success: function(data) { 
       refreshDOMBudget();
      }
    });
  }

  function del() {
    $.ajax({
      type: "delete",
      url: "/excel",
      success: function(data) { }
    });
  }