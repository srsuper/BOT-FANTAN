function getUserProfiles(userId) {
  var url = "https://api.line.me/v2/bot/profile/" + userId;
  var lineHeader = {
    "Content-Type": "application/json",
    "Authorization": "Bearer KLF0sEroZJQuNMJfDClKP33FTPjpMEc2qcbl2sXqtcjrJ8DOug3QRwxTtiOQAFNxsLmTRp7ZWbUjkgw9umOBKcpjjzCu/REJCERZbvGoAfXYSoVnameTpM/GfbST5kH/kADOr/treSOq7DFZhQsyZAdB04t89/1O/w1cDnyilFU="
  };
  
  var options = {
    "method" : "GET",
    "headers" : lineHeader
  };
  
  var responseJson = UrlFetchApp.fetch(url, options);
  
  Logger.log("User Profiles Response: " + responseJson);
  
  var displayName = JSON.parse(responseJson).displayName;
  var pictureUrl = JSON.parse(responseJson).pictureUrl;
  
  return [displayName, pictureUrl];
}
