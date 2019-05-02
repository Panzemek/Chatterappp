let coords = [
  {
    type: "Feature",
    properties: {
      neighborhood: "Capitol Hill"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.31868743896484, 47.623173768903946]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "South Lake Union"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3377418518066, 47.622826666563675]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Queen Anne"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.36675262451166, 47.632660340454386]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Magnolia"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3993253707885, 47.64697370526775]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Ballard"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.385892868042, 47.67636885973022]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Fremont"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3499298095703, 47.65047193135073]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "University District"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.31328010559076, 47.66110972448931]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Madison Park"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.28014945983887, 47.636014935321185]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "First Hill"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3214340209961, 47.608535619882346]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Central District"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.30843067169184, 47.60309589588304]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Downtown"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3307037353516, 47.603616745009965]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Belltown"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3452949523926, 47.613135795983474]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "International District"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.32641220092773, 47.596671663587045]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Mount Baker"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.28971958160395, 47.57829168890145]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Beacon Hill"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.31061935424805, 47.577394233560945]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "SoDo"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.3312187194824, 47.581157652951454]
    }
  },
  {
    type: "Feature",
    properties: {
      neighborhood: "Denny-Blaine"
    },
    geometry: {
      type: "Point",
      coordinates: [-482.28551387786865, 47.62265311452928]
    }
  }
];

var testCoords= [-482.3377418518066, 47.622826666563675]

//down the line this will need to take in the users coordinate location


function distancesArr(userCoords) {
    let distances = [];
    for (i = 0; i<coords.length; i++) {
        let newVal = {distance: distance(userCoords[0], userCoords[1], coords[i].geometry.coordinates[0], coords[i].geometry.coordinates[1], "K"), nHood: coords[i].properties.neighborhood}
        distances.push(newVal)
    }

    //TODO: sort this list in descending order
    return distances;   
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

//following code is taken from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// function for dynamic sorting
function compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

let unsorted = distancesArr(testCoords);

unsorted.sort(compareValues("distance"));
console.log(unsorted)
