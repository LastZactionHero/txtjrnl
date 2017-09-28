var fs = require("fs");

module.exports = {
  // Import data from a JSON fixture file
  import: (fixture_name) => {    
    var rawContent = fs.readFileSync("./spec/support/fixtures/" + fixture_name + ".json");
    return JSON.parse(rawContent);
  }

}