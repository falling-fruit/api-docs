var clusters = {};

/**
 * @apiDefine KeyParam
 * @apiParam {String} key API key.
 */

 /**
  * @apiDefine Clusters Cluster endpoints
  *
  * Clusters summarize the number of locations available in an area.
  */

/**
 * @api {get} /clusters.json Get clusters
 * @apiVersion 0.2.0
 * @apiName GetClusters
 * @apiGroup Clusters
 *
 * @apiDescription Get location clusters.
 *
 * @apiUse KeyParam
 * @apiParam {Integer[]} [types] IDs of types to count (or all if empty or missing).
 * @apiParam {Integer} [zoom=0] Zoom level, where world is divided into a 2^zoom x 2^zoom grid.
 * @apiParam {Boolean} [muni=true] Whether to count locations from municipal tree inventories.
 * @apiParam {Number[]} [bounds=-180,180,-90,90] Map bounding box [W Longitude, E Longitude, S Latitude, N Latitude] in WGS84 decimal degrees.
 *
 * @apiExample Example usage:
 * /clusters.json?key=APIKEY&zoom=0
 *
 * @apiSuccess {Object[]} clusters List of clusters.
 * @apiSuccess {Number} cluster.lng Longitude in WGS84 decimal degrees, as the mean of the location longitudes.
 * @apiSuccess {Number} cluster.lat Latitude in WGS84 decimal degrees, as the mean of the location latitudes.
 * @apiSuccess {Integer} cluster.count Total number of locations.
 */
clusters.list = function(req, res) {
  // Type_ids
  var type_ids = [];
  if (req.query.t) {
    type_ids = req.query.t.split(",").map(function(x) { return parseInt(x) });
  }
  // Bounds
  var bounds = [req.query.swlng, req.query.nelng, req.query.swlat, req.query.nelat];
  if (__.every(bounds)) {
    bounds = bounds.map(function(x) { return parseFloat(x) });
    sw_xy = common.wgs84_to_web_mercator(bounds[0], bounds[2]);
    ne_xy = common.wgs84_to_web_mercator(bounds[1], bounds[3]);
    bounds = [sw_xy[0], ne_xy[0], sw_xy[1], ne_xy[1]];
  } else {
    return common.send_error(res, 'Bounding box not defined');
  }
  // Zoom
  var zoom = req.query.zoom ? parseInt(req.query.zoom) : 0;
  if (zoom > 12 || zoom < 0) {
    return common.send_error(res, 'Zoom must be in the interval [0, 12]');
  }
  if (zoom > 3) {
    zoom += 1;
  }
  // Filters
  var filters = {
    muni: req.query.muni == "1" ?
      null :
      "NOT muni",
    type_ids: type_ids.length > 0 ?
      "type_id IN (" + type_ids.join(",") + ")" :
      null, // "type_id IS NULL"
    zoom: "zoom = " + zoom,
    bounds: [
      "(x > " + bounds[0] +
      (bounds[1] > bounds[0] ? " AND " : " OR ") +
      "x < " + bounds[1] + ")",
      "y > " + bounds[2], "y < " + bounds[3]
    ].join(" AND ")
  };
  var filter_str = __.reject(filters, __.isNull).join(" AND ");
  // Query
  var query_str = " \
    SELECT ST_X(center) as lng, ST_Y(center) as lat, count \
    FROM ( \
      SELECT \
        SUM(count) as count, \
        ST_Transform(ST_SetSRID(ST_POINT( \
          SUM(count * x) / SUM(count), SUM(count * y) / SUM(count) \
        ), 900913), 4326) as center \
      FROM clusters \
      WHERE " + filter_str + " \
      GROUP BY geohash \
    ) subq; \
  ";
  db.pg.connect(db.conString, function(err, client, done) {
    if (err) {
      common.send_error(res, 'Error fetching client from pool', err);
      return done();
    }
    async.waterfall([
      function(callback) {
        common.check_api_key(req, client, callback)
      },
      function(callback) {
        console.log("Running query");
        client.query(query_str, [], function(err, result) {
          if (err) {
            console.log(err.stack);
            return callback(err, 'Error running query');
          }
          console.log("Sending result")
          res.send(__.map(result.rows, function(x) {
            x.count = parseInt(x.count);
            return x;
          }));
          console.log("Leaving waterfall and cleaning up");
          return callback(null);
        });
      }
    ],
    function(err, message) {
      done();
      if (message) {
        common.send_error(res,message,err);
      }
    });
  });
};

module.exports = clusters;
