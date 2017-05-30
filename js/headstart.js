var headstartProjectId = "23125";
var headstartEmbedUrl = "http://www.headstart.co.il/embed.aspx?id=" + headstartProjectId;
var headstartFullUrl = "http://www.headstart.co.il/project.aspx?id=" + headstartProjectId;
var yqlUrl = "https://query.yahooapis.com/v1/public/yql"
var yqlQuery1 = "select * from html where url='" + headstartEmbedUrl + "' and xpath='//div[@class=\"cash\"]|//div[@class=\"target\"]'";
var yqlQuery2 = "select * from html where url='" + headstartFullUrl + "' and xpath='//div[@class=\"cu\"]'";

function executeYql(query, callback) {
  $.getJSON(
    yqlUrl,
    {
      "q": query,
      "format": "json",
    },
    callback);
}

function loadHeadstartData() {
  executeYql(
    yqlQuery1,
    function(data) {
      var divs = data.query.results.div;
      var fundingTarget = divs[0].span.b;
      var fundedPercent = divs[1].b.replace("%", "");
      var remainingDays = divs[2].b;
      var numSupporters = divs[3].b;
      //alert("Supporters: " + numSupporters + ", Funded: " + fundedPercent + "%, Remaining Days: " + remainingDays +", Target: " + fundingTarget);
      setHeadstartData(fundingTarget, fundedPercent, remainingDays, numSupporters);
    });

  executeYql(
    yqlQuery2,
    function(data) {
      var amountFunded = $.trim(data.query.results.div.content);
      //alert("Amount funded: " + amountFunded);
      setHeadstartAmountFunded(amountFunded);
    });
}

$(document).ready(function() {
  loadHeadstartData();
});

function setHeadstartData(fundingTarget, fundedPercent, remainingDays, numSupporters) {
  $(".total-amount-sum").text(fundingTarget);
  $(".progress .progress-bar").width(fundedPercent + "%");
  $(".funded-percent").text(fundedPercent + "%");
  $(".num-supporters").text(numSupporters);
  $(".remaining-days").text(remainingDays);
}

function setHeadstartAmountFunded(amountFunded) {
  $(".current-amount-sum").text(amountFunded);
}
