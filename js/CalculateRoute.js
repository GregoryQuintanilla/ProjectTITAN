var route = []

function calcRoute(origin, stops){
     var distanceMatrix = new google.maps.DistanceMatrixService();
     route.push(origin[0].toString());

     distanceMatrix.getDistanceMatrix(
     {
               origins: origin,
               destinations: stops,
               travelMode: 'DRIVING',
     },chooseNextDestination);
     return route
}

function chooseNextDestination(response, status){
     if (status =='OK'){
          var distanceMatrix = new google.maps.DistanceMatrixService()
          var origin = response.originAddresses;
          var destinations = response.destinationAddresses;
          var shortestDest =  null;
          var shortestDist = Infinity;
          var shortestTime = Infinity;
          var index = -1;
          var SortBy = 'DISTANCE'
          var nextStops = response.rows[0].elements;

          //console.log(origin);
          //console.log(destinations);

          for (let i = 0; i < nextStops.length; i++){
               let element = nextStops[i]
               let distance = element.distance.value;
               let duration = element.duration.value;
               //console.log(destinations[i] + " " + distance + " " + duration);
               if(distance < shortestDist && SortBy == 'DISTANCE'){
                    shortestDest = destinations[i];
                    shortestDist = distance;
                    shortestTime = duration;
                    index = i;
               }

               else if(duration < shortestTime && SortBy == 'DURATION'){
                    shortestDest = destinations[i];
                    shortestDist = distance;
                    shortestTime = duration;
                    index = i;
               }
          }
          //console.log(shortestDest + " " + shortestDist + " " + shortestTime);
          var newOrigin = shortestDest;
          destinations.splice(index,1);
          //console.log(newOrigin);
          route.push(newOrigin);

          if(destinations.length != 0){
               distanceMatrix.getDistanceMatrix(
               {
                    origins: [newOrigin],
                    destinations: destinations,
                    travelMode: 'DRIVING',
               },chooseNextDestination);
          }
          //console.log(destinations);


     }
     printRoute();
}

function printRoute(){
     console.log(route)
}
// returns the route array if needed
function returnRoute(){
     return route;
}
