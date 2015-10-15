$(function() {
	checkAvaiable();

	var file = $("#upload");
	file.on("change", fileInputHandler);

});

function checkAvaiable() {
	if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  		alert("File APIs are not fully supported in this browser.");
  	}
}

function fileInputHandler(fileInput) {
	var reader = new FileReader();
	var file = fileInput.target.files[0];
	reader.onload = function(evt) {
		var content = evt.target.result;
		var rows = content.split("\n");

		rows.forEach(function(row) {
			$("#filecontent").append("<p>" + row + "</p>");
		});

		var jarr = csvToJson(rows);
		jarr.forEach(function(j) {
			console.log(j.toString());
			$("#jsoncontent").append("<p>" + j.toString() + '</p>');
		});
	};



	if(file != null) reader.readAsText(file);
}

function csvToJson(rows) {
	var jsonArr = [];
	var len = rows.length;
	var keys = rows[0].split(",");


	for(var i = 1; i < len; i++) {
		var vals = rows[i].split(',');
		var item = _.object(keys, vals);
		item.toString = function() {
			var self = this;
			var str = keys.reduce(function(accum, k) {
				return accum += ("" + k + ": " + self[k] + ", ");
			}, "{ ");
			return str.substring(0, str.length-2)+" }";
		};
		jsonArr.push(item);
	}

	return jsonArr;
}

//function


