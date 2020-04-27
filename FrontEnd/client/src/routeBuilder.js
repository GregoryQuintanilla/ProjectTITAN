export function computeRoute(origin, stops){
     let route = [];
     route.push(origin);
     chooseNextDestination(origin,stops,route);
     
     return route;
}

function computeDists(origin, locations){
let dists = [];
for(let i = 0; i< locations.length ;i++){
      let currDist = getDistanceFromLatLonInMeters(origin.lat(),origin.lng(),locations[i].lat(),locations[i].lng());
      dists.push(currDist);
}
return dists;

}

function getDistanceFromLatLonInMeters(lat1,lon1,lat2,lon2) {
var R = 6371; // Radius of the earth in km
var dLat = deg2rad(lat2-lat1);  // deg2rad below
var dLon = deg2rad(lon2-lon1);
var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c; // Distance in km
var dm = d*1000;
return dm;
}

function deg2rad(deg) {
return deg * (Math.PI/180)
}
// helper function to print the route value
function printRoute(LatLngList){
      console.log(LatLngList);
}
// returns the route array if needed
function returnRoute(route){
      return route;
}

// callback function of distanceMatrixRequest.
// Greedily selects the next destination based on distance/duration
function chooseNextDestination(origin, stops, route){
     if(stops.length <= 0){
           printLatLngs(route);
           return;
     }
     else{
           let shortestDest =  null; // the LatLng Object that is the shortest
           let shortestDist = Infinity; // The distance to that shortest LatLng
           let index = -1; //The index in the list of the shortestDest
           let distanceList = computeDists(origin,stops);
           for (let i = 0; i < distanceList.length; i++){
                if(distanceList[i] < shortestDist){
                     shortestDest = stops[i];
                     shortestDist = distanceList[i];
                     index = i;
                }
           }
           //console.log(shortestDest + " " + shortestDist + " " + shortestTime);
           var newOrigin = shortestDest;
           stops.splice(index,1);
           route.push(newOrigin);
           chooseNextDestination(newOrigin,stops)
     }

}

function printLatLngs(givenList){
let newList = []
for (let i = 0;i <givenList.length;i++){
      let currLatLng = givenList[i];
      newList.push("("+ currLatLng.lat() + "," +currLatLng.lng()+ ")");
}
console.log(newList);
}
