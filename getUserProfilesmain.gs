function doPost(e) {
  var ssId = "13q5P73vHQC4jTE8QmBjRmOV40DgOuOyz5yKll4kmDfE";
  var ss = SpreadsheetApp.openById(ssId);
  var sheetData1 = ss.getSheetByName("data1");
  var sheetUsers = ss.getSheetByName("users");
  var sheet = SpreadsheetApp.getActiveSheet();
  //use BetterLog
  Logger = BetterLog.useSpreadsheet(ssId);

  //Logger.log("Hello from BetterLog :)");

  var requestJSON = e.postData.contents;
  Logger.log(requestJSON);
  
  var requestObj = JSON.parse(requestJSON).events[0];
  
  var token = requestObj.replyToken;
  
  //if (requestObj.type === "message") 
  {
    var userId = requestObj.source.userId;
    //Logger.log("This is user Id: " + userId);
   // var Logger.log(userMessage) ;
    var userProfiles = getUserProfiles(userId);
    var userMessage = requestObj.message.text;
 //    var userMessage = Logger.log(userMessage);
    var valueRound = sheet.getRange("A1").getValue();
    var valueopen = sheet.getRange("A2").getValue();
    var lastRow = sheetUsers.getLastRow();
    sheetUsers.getRange(lastRow + 1, 1).setValue(valueRound);
    sheetUsers.getRange(lastRow + 1, 2).setValue(valueopen);
    sheetUsers.getRange(lastRow + 1, 3).setValue(userId);
    sheetUsers.getRange(lastRow + 1, 4).setValue(userProfiles[0]);
    sheetUsers.getRange(lastRow + 1, 5).setValue(userProfiles[1]);
    sheetUsers.getRange(lastRow + 1, 6).setValue(userMessage);
    sheetUsers.getRange(lastRow + 1, 7).setFormula("=image(E"+ (lastRow + 1) + ")");
    sheetUsers.getRange(lastRow + 1, 8).setFormula("=SPLIT(F"+ (lastRow + 1) +","+'"/"'+'"="'+'"-"'+'"\"'+'"+"'+'";"'+'":"'+ ")");
//  function mySplit() {
//  var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//  var cell = sh.getActiveCell().getValues()[0];
//  var sCell = cell[0].split(",");
//  var row = sh.getActiveCell().getRowIndex();
//  var col = sh.getActiveCell().getColumnIndex();

//  sh.getRange(row,col+1,1,sCell.length).setValues([sCell]);  
//}
  
    var replyText = "Hello "+ userProfiles[0] + ", Welcome to bot world!!!";
    return initReply(token, replyText);
  }
  
  var userMessage = requestObj.message.text;
  // Logger.log(userMessage);
  var replyText = userMessage;
  var replyText = JSON.stringify(requestObj);
  
  return initReply(token, replyText);
}
/////////////////

function MoveEstimatingToListOfProposals() {
  // Takes a copy of sales records after any adjustments are required and sends to GID Warehouse Qty
  // Then have added these to the Audit Trail to keep track of sales
  // beginnings of our Online Qtys
  
  var spreadsheet = SpreadsheetApp.getActive();

  // *** Have to figure out how to make the target a different document!!!! ***

  var target = SpreadsheetApp.openById("13q5P73vHQC4jTE8QmBjRmOV40DgOuOyz5yKll4kmDfE");
    
  /* 
  Next we need to pick the particular sheets within those spreadsheets.
  Let's say your row is on the sheet named "New Stuff", and you have a sheet in the target spreadsheet named "Archive".
  */

  var source_sheet = spreadsheet.getSheetByName("users");
  var target_sheet = target.getSheetByName("data1");
    
  // The below makes the highlighted cells the range that will be copied.

  var source_range = source_sheet.getRange('A:D');
  var last_row = target_sheet.getLastRow();
  target_sheet.insertRowBefore(3);
  var values = source_range.getValues();
  target_sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
  spreadsheet.getRange('O1').activate();
}

/////////////////
