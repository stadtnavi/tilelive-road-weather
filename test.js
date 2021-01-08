const fs = require("fs");
const assert = require("assert");
const WeatherSource = require("./index");

describe("WeatherSource", function() {

  it("fetch data", (done) => {
    const source = new WeatherSource(null, () => {});
    assert.ok(source);

    // request tile in Herrenberg
    source.getTile(18, 137526, 90476, (err, response) => {
      assert.ok(response.length > 100);
      assert.ok(response);

      // request another tile
      // should come from the cache
      source.getTile(18, 137526, 90476, (err, response) => {
        assert.ok(response.length > 100);
        assert.ok(response);
        assert.ok(source.cache.has(source.cacheKey));
        done();
      })

    })
  });
});
