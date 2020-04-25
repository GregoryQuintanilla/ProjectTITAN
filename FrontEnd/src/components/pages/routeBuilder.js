export function computeRoute(){
     var LatLngList = [new google.maps.LatLng(40.695109,-73.6110072),
      new google.maps.LatLng(40.6857795,-73.57024799999999),
      new google.maps.LatLng(40.695868,-73.629774),
      new google.maps.LatLng(40.6818527,-73.6029112),
      new google.maps.LatLng(40.6978262,-73.6185509),
      new google.maps.LatLng(40.74655,-73.671145),
      new google.maps.LatLng(40.7403987,-73.6553915),
      new google.maps.LatLng(40.7052884,-73.61786099999999),
      new google.maps.LatLng(40.7377786,-73.6844891),
      new google.maps.LatLng(40.748296,-73.6662447),
      new google.maps.LatLng(40.6981291,-73.6207013),
      new google.maps.LatLng(40.6813619,-73.6478952),
      new google.maps.LatLng(40.6939629,-73.620121),
      new google.maps.LatLng(40.6968793,-73.6067293),
      new google.maps.LatLng(40.70740259999999,-73.6130312),
      new google.maps.LatLng(40.6718501,-73.5599419),
      new google.maps.LatLng(40.7063818,-73.6392027),
      new google.maps.LatLng(40.6985801,-73.6709583),
      new google.maps.LatLng(40.68284500000001,-73.59302079999999),
      new google.maps.LatLng(40.7371419,-73.629498),
      new google.maps.LatLng(40.6765105,-73.6842247),
      new google.maps.LatLng(40.7060504,-73.6920416),
      new google.maps.LatLng(40.716992,-73.657851),
      new google.maps.LatLng(40.6743832,-73.6155151),
      new google.maps.LatLng(40.6860189,-73.6910415),
      new google.maps.LatLng(40.675948,-73.5750788),
      new google.maps.LatLng(40.67176329999999,-73.6111682),
      new google.maps.LatLng(40.697845,-73.61151319999999),
      new google.maps.LatLng(40.700689,-73.6106392),
      new google.maps.LatLng(40.71535859999999,-73.6274282),
      new google.maps.LatLng(40.7342721,-73.6799827),
      new google.maps.LatLng(40.7174414,-73.6753038),
      new google.maps.LatLng(40.6711105,-73.6400306),
      new google.maps.LatLng(40.7075221,-73.5848896),
      new google.maps.LatLng(40.6817111,-73.6328786),
      new google.maps.LatLng(40.7255935,-73.6908461),
      new google.maps.LatLng(40.740882,-73.63218499999999),
      new google.maps.LatLng(40.7494423,-73.62844009999999),
      new google.maps.LatLng(40.7115854,-73.67962640000002),
      new google.maps.LatLng(40.7477238,-73.664957),
      new google.maps.LatLng(40.6967186,-73.6177),
      new google.maps.LatLng(40.6831577,-73.59596499999999),
      new google.maps.LatLng(40.710867,-73.6709353),
      new google.maps.LatLng(40.7066062,-73.6537819),
      new google.maps.LatLng(40.6921384,-73.57866729999999),
      new google.maps.LatLng(40.702549,-73.6237026),
      new google.maps.LatLng(40.6774944,-73.5679476),
      new google.maps.LatLng(40.7100819,-73.6482171),
      new google.maps.LatLng(40.70673559999999,-73.5734686),
      new google.maps.LatLng(40.7478882,-73.63207369999999),
      new google.maps.LatLng(40.705002,-73.59679299999999),
      new google.maps.LatLng(40.7342442,-73.6273362),
      new google.maps.LatLng(40.7164729,-73.6134172),
      new google.maps.LatLng(40.6743489,-73.6139511),
      new google.maps.LatLng(40.7207149,-73.61146719999999),
      new google.maps.LatLng(40.6742166,-73.6239325),
      new google.maps.LatLng(40.7493699,-73.6477917),
      new google.maps.LatLng(40.7310112,-73.6584728),
      new google.maps.LatLng(40.7137228,-73.60891099999999),
      new google.maps.LatLng(40.71085799999999,-73.63336149999999),
      new google.maps.LatLng(40.7137921,-73.6584383),
      new google.maps.LatLng(40.6740929,-73.6725907),
      new google.maps.LatLng(40.747748,-73.6797643),
      new google.maps.LatLng(40.6873132,-73.6801782),
      new google.maps.LatLng(40.6707555,-73.6192409),
      new google.maps.LatLng(40.6889134,-73.6246685),
      new google.maps.LatLng(40.7164729,-73.6134172),
      new google.maps.LatLng(40.740796,-73.63321499999999),
      new google.maps.LatLng(40.7295581,-73.6378229),
      new google.maps.LatLng(40.72132269999999,-73.5621504),
      new google.maps.LatLng(40.7215401,-73.6876274),
      new google.maps.LatLng(40.7098451,-73.67040639999999),
      new google.maps.LatLng(40.7050065,-73.6111452),
      new google.maps.LatLng(40.7418916,-73.6545177),
      new google.maps.LatLng(40.721948,-73.687462),
      new google.maps.LatLng(40.671811,-73.6730966),
      new google.maps.LatLng(40.7250278,-73.6563113),
      new google.maps.LatLng(40.6826458,-73.57866729999999),
      new google.maps.LatLng(40.7008949,-73.66123209999999),
      new google.maps.LatLng(40.7315306,-73.6688429),
      new google.maps.LatLng(40.7222358,-73.6879033),
      new google.maps.LatLng(40.71843630000001,-73.6584728),
      new google.maps.LatLng(40.7476387,-73.6910645),
      new google.maps.LatLng(40.6696416,-73.57471079999999),
      new google.maps.LatLng(40.6709156,-73.6086643),
      new google.maps.LatLng(40.7184503,-73.6088912),
      new google.maps.LatLng(40.7218328,-73.5656472),
      new google.maps.LatLng(40.6847437,-73.6315678),
      new google.maps.LatLng(40.7023049,-73.6647041),
      new google.maps.LatLng(40.749616,-73.6261863),
      new google.maps.LatLng(40.71966159999999,-73.6336835),
      new google.maps.LatLng(40.7315681,-73.6611171),
      new google.maps.LatLng(40.6983606,-73.6119624),
      new google.maps.LatLng(40.7378956,-73.648769),
      new google.maps.LatLng(40.7051007,-73.6344309),
      new google.maps.LatLng(40.71469039999999,-73.6567906),
      new google.maps.LatLng(40.736602,-73.622382),
      new google.maps.LatLng(40.7459873,-73.6373346),
      new google.maps.LatLng(40.7455434,-73.6696017),
      new google.maps.LatLng(40.7128068,-73.60370470000001)]
      printLatLngs(LatLngList);
     let origin = LatLngList[0];
     route.push(origin);
     LatLngList.splice(0,1)
     let stops = LatLngList;
     console.log(LatLngList);
     chooseNextDestination(origin,stops);
}

export function chooseNextDestination(origin, stops){
     if(stops.length <= 0){
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


export function computeDists(origin, locations){
     let dists = [];
     for(let i = 0; i< locations.length ;i++){
          let currDist = getDistanceFromLatLonInMeters(origin.lat(),origin.lng(),locations[i].lat(),locations[i].lng());
          dists.push(currDist);
     }
     return dists;

}

export function getDistanceFromLatLonInMeters(lat1,lon1,lat2,lon2) {
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

export function deg2rad(deg) {
     return deg * (Math.PI/180)
}
