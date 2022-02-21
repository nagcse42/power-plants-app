var XLSX = require("xlsx");
var fileSystem = require("fs");
var workbook = XLSX.readFile("egrid2020_data.xlsx");
var sheet_name_list = workbook.SheetNames;

var pendingsheets =[
    'Contents-done','UNT20-done','GEN20-done','PLNT20-done','ST20-done','BA20-done',
    'SRL20-done','NRL20-done','US20-done','GGL20'
  ];

 var currentSheet = 'GGL20';
 sheet_name_list=[currentSheet];
 console.log(sheet_name_list);

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  //getting the complete sheet
  // console.log(worksheet);

  var headers = {};
  var data = [];
  for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var col = z.substring(0, 1);
    // console.log(col);

    var row = parseInt(z.substring(1));
    // console.log(row);

    var value = worksheet[z].v;
    // console.log(value);

    //store header names
    if (row == 1) {
        continue;
    }

    if (row == 2) {
      headers[col] = value;
      // storing the header names
      continue;
    }


    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();

  console.log(data);
  fileSystem.writeFile("data/"+currentSheet+".json", JSON.stringify(data), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
});