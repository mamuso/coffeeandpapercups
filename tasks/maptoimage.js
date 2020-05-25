const glob = require("glob");
const fs = require("fs");
const data = require("../data/data.json");

const StaticMaps = require("staticmaps");

const options = {
  width: 1000,
  height: 1000,
  tileUrl:
    "http://d.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
};

const map = new StaticMaps(options);
const zoom = 18;

data.forEach(function(cup) {
  if(!fs.existsSync(`static/maps/${cup.slug}.png`)){
    const center = [cup.location.lng, cup.location.lat];
    map
      .render(center, zoom)
      .then(() => map.image.save(`static/maps/${cup.slug}.png`))
      .then(() => console.log(`${cup.name} Saved!`))
      .catch(function(err) {
        console.log(err);
      });
  }
});
