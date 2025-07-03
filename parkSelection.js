// Dataset Used: National Parks, Source: nps.gov (National Park Service)
var parks = getColumn("US National Parks", "Name");
var states = getColumn("US National Parks", "Location");
var acres = getColumn("US National Parks", "Area in acres");
var descriptions = getColumn("US National Parks", "Description");
var images = getColumn("US National Parks", "Image");
var parkCandidates = [];
var parkRecommendationIndex;
onEvent("startButton", "click", function() {
  setScreen("locationSelectionScreen");
});
onEvent("restartButton", "click", function() {
  parkCandidates = [];
  setScreen("startScreen");
  setProperty("chooseLocationButton", "text", "Choose a Location!");
});
onEvent("submitButtonLocation", "click", function() {
  for (var i = 0; i < states.length; i++) {
    if (states[i] == getText("chooseLocationButton")) {
      appendItem(parkCandidates, i);
} }
  setScreen("parkSizeQuestionScreen");
});
onEvent("bigParkOption", "click", function() {
  parkRecommendationIndex = sizeOfParkFunction("largest");
  finalScreenFunction(parkRecommendationIndex);
});
onEvent("randomParkOption", "click", function() {
  parkRecommendationIndex = sizeOfParkFunction("random");
  finalScreenFunction(parkRecommendationIndex);
});
function sizeOfParkFunction(parkSizeComparison) {
  var indexOfBestParkMatch = parkCandidates[0];
  for (var i = 1; i < parkCandidates.length; i++) {
    if (parkSizeComparison == "largest" && acres[parkCandidates[i]] > acres[indexOfBestParkMatch]) {
      indexOfBestParkMatch = parkCandidates[i];
    } else if (parkSizeComparison == "random") {
      indexOfBestParkMatch = parkCandidates[randomNumber(1, parkCandidates.length-1)];
} }
  return indexOfBestParkMatch;
}
function finalScreenFunction(selectedPark) {
  setText("parkNamePlaceholder", "Park Name: " + parks[selectedPark]);
  setText("parkState", "State: " + states[selectedPark]);
  setText("parkDescription", "Description: " + descriptions[selectedPark]);
  setImageURL("parkImage", images[selectedPark]);
  setScreen("finalScreen");
}
