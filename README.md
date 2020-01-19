**[THIS IS STILL A WORK IN PROGRESS]**

**Fire Dash**: Your centralised dashboard for the bushfire season!

I wanted to create this app to develop my skills with React and general coding. I also felt it was an annoyance that I had to have multiple apps to keep up to date on the bushfire events happening around me.

#### >>> [VIEW LIVE SITE](https://iwishjames.github.io/fire-dash/) <<<
---

# Reference/Resources
### Data:
- RFS Website - Fire Danger Chart - [rfs](http://www.rfs.nsw.gov.au/fire-information/fdr-and-tobans?a=1421)
- Fire Danger Rating XML file - [rfs](http://www.rfs.nsw.gov.au/feeds/fdrToban.xml)
- BOM - Weather JSON file - [bom](http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94757.json)


### Functionality:
- Embed twitter timeline on react - [dev.io](https://dev.to/heymarkkop/embed-twitter-widget-on-reactjs-1768)
- needing require for img element in react - [stackoverflow](https://stackoverflow.com/questions/34582405/react-wont-load-local-images)
- array randomising - [css-tricks](https://css-tricks.com/snippets/javascript/select-random-item-array/)
- overcoming CORS policy uing a CORS proxy - [stackoverflow](https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors)
- fetching and reading XML data - because the data was in XML! :( - [youtube](https://www.youtube.com/watch?v=MDAWie2Sicc)
- XML to JSON npm  - [npmjs](https://www.npmjs.com/package/xml2js)
- Fetch error resolution to  "React Js: Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0" - [stackoverflow](https://stackoverflow.com/questions/37269808/react-js-uncaught-in-promise-syntaxerror-unexpected-token-in-json-at-posit)
- Looping through objects in JS - [zellwk](https://zellwk.com/blog/looping-through-js-objects/)
- flattening an array of arrays into a single array - flat() - [MDN web docs] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

### CSS and Styling:
- rotate at anchor point - [css-tricks](https://css-tricks.com/almanac/properties/t/transform-origin/)
- animating an inline style [used this to animate the moving arrow] - [Link](https://css-tricks.com/animate-to-an-inline-style/)
- positioning images on top of each other - [stackoverflow](https://stackoverflow.com/questions/48474/how-do-i-position-one-image-on-top-of-another-in-html)

### Media:
- Original Fire Danger Rating Chart - [google images](http://dmiq0kz125zbt.cloudfront.net/images/12487.png)


### Other:

---

##### Ideas for the FIRE Dashboard! 🔥🔥🔥

- Fire Danger Rating for the Day.
- Weather for the Day - refer to the BOM App. - For throughout the day: Temperature, Humidity, Wind speed etc.
- Tweets from RFS and Others.
- App would have to be mobile first! Given that it is where people are most likely to view it.
- Dark mode option or permanent dark mode...so that it doesn't use up battery life on phones? I think better to give the option, that be fixed - have to think about accessibility for people with difficulty viewing the screen.
- Data would need to be updated every 5 minutes or so?
- Some kind of timer - to show the last time the page updated.
- The notification/email option if the fire thing goes above high - Use the trick we had learnt from class??
- Map of Regions as classified by RFS
- AirQuality Data?

- Anything else related to fire?

- potentially could use local memory/storage to hold on to/save the person's location - so that they would only have to state it once and it should use that for everytime the page is reloaded.

##### Things to do!
- Drop Down to select your council/region


##### Challenges!
- Providing the option to select your council area so that the users can select their own area. The issue was that there was a long list of areas and they were allocated by a region number in the XML data.
  - My solution was to: 1) Create an object with the list of councils areas allocated to their region, 2) create a single array with the list of all the areas and use that to dynamically create values for a select tag. 3) When a user selects one of the values, use that value to refer to the object list to identify the region number of the specific council area and that value to retrieve the data from the XML data.
