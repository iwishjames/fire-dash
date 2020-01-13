// Before API, used a random generator to get the Danger rating
  // const theRatings = ["Low-Moderate", "High", "Very High", "Severe", "Extreme", "Catastrophic"];
  // let randomiser = theRatings[Math.floor(Math.random() * theRatings.length)];


  // api.openweathermap.org/data/2.5/weather?q=Campbelltown,aus&APPID=7f8dd784177f0f775f30b9fedeb91543"

  // Creating a consolidated list of all the values of the council areas. Here Object.values provides an array of arrays with the values, while flat consolidates it all together into a single array. This will be used to create a dynamic select menu.
    const areasList = ((Object.values(councilAreas)).flat()).sort();
