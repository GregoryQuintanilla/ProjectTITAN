//var route = [] //array to house the completed route
export function calcRoute(origin, stops, directionsService, directionsRenderer, distanceMatrix){
     var route = []
     //function to start the route calculation kick off. uses inputted origina on desired stops and the disatance matrix service to create the route.
     //var distanceMatrix = new google.maps.DistanceMatrixService();
     route.push(origin[0].toString()); // put the desired origin as teh first element of the list.

     distanceMatrix.getDistanceMatrix(
     {
               origins: origin,
               destinations: stops,
               travelMode: 'DRIVING',
     }, function(response, status){chooseNextDestination(response, status, directionsService, directionsRenderer,distanceMatrix, route )}); // create the distance matrix and then call the chooseNextDestination callback function
     return route //eventually return the completed route
}

export function chooseNextDestination(response, status, directionsService, directionsRenderer,distanceMatrix,route){
     if (status =='OK'){ //if the callback was successful
          // set up initial variables
          //var distanceMatrix = new google.maps.DistanceMatrixService() // distance matrix function so that we can eventually recursively call
          var origin = response.originAddresses; // origin point of this step of the route finding process. the 'last' chosen address.
          var destinations = response.destinationAddresses; // the rest of the address still to be processed
          var shortestDest =  null; // initialize the shortest destinatio with a sentinel
          var shortestDist = Infinity;// initialize the shortest distance with a sentinel
          var shortestTime = Infinity;// initialize the shortest time with a sentinel
          var index = -1; //initialize the index of the shortest destination
          var SortBy = 'DISTANCE' // keyword for how we want the route calculated. by DISTANCE or by TIME
          var nextStops = response.rows[0].elements; //the distances from the last chosen address to the remaining addresses

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
               },function(response, status) {chooseNextDestination(response, status, directionsService, directionsRenderer, distanceMatrix, route)} );
          }
          //console.log(destinations);


     }
     displayRoute(route, directionsService, directionsRenderer)
}

export function displayRoute(routeToDisplay,directionsService,directionsRenderer){
     let routeLength = routeToDisplay.length;
     var routePackage = {'origin': routeToDisplay[0],'stops':[],'destination':routeToDisplay[routeLength-1]};

     for(let i = 1; i < routeLength-1;i++){
          routePackage['stops'].push({location:routeToDisplay[i],stopover:true});
     }
     directionsService.route({
         origin: routePackage['origin'],
         destination: routePackage['destination'],
         waypoints: routePackage['stops'],
         travelMode: 'DRIVING',

         },
         function(response, status) {
              if (status === 'OK') {
                   directionsRenderer.setDirections(response);
              }
              else {
                   window.alert('Directions request failed due to ' + status);
              }
         });
}

export function printRoute(route){
     console.log(route)
}
// returns the route array if needed
export function returnRoute(route){
     return route;
}

export function tester(num){
     alert("I'm called from routeBuilder! " + 10);
}
