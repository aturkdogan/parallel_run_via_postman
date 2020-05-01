/**
 * @fileOverview A sample script to demonstrate parallel collection runs using async.
 */
var path = require('path'), // ensures that the path is consistent, regardless of where the script is run from

    async = require('async'), // https://npmjs.org/package/async
    newman = require('newman'), // change to require('newman'), if using outside this repository

    /**
     * A set of collection run options for the paralle collection runs. For demonstrative purposes in this script, an
     * identical set of options has been used. However, different options can be used, so as to actually run different
     * collections, with their corresponding run options in parallel.
     *
     * @type {Object}
     */
    options = {
        collection: path.join(__dirname, 'Parallel_Run_in_Postman.json'),
        folder: 'request'
    },

    options2 = {
        collection: path.join(__dirname, 'Parallel_Run_in_Postman.json'),
        folder: 'response'
    },

    options3 = {
        collection: path.join(__dirname, 'Parallel_Run_in_Postman.json'),
        folder: 'time'
    },
    /**
     * A collection runner function that runs a collection for a pre-determined options object.
     *
     * @param {Function} done - A callback function that marks the end of the current collection run, when called.
     */
    parallelCollectionRun = function (done) {
        //console.log("Started");
        newman.run(options, done);
        //console.log("Finished");
    };

    var parallelCollectionRun2 = function (done) {
        newman.run(options2, done);
    };

    var parallelCollectionRun3 = function (done) {
        newman.run(options3, done);
    };
// Runs the Postman sample collection thrice, in parallel.
async.parallel([
    parallelCollectionRun,
    parallelCollectionRun2,
    parallelCollectionRun3
],


/**
 * The
 *
 * @param {?Error} err - An Error instance / null that determines whether or not the parallel collection run
 * succeeded.
 * @param {Array} results - An array of collection run summary objects.
 */
function (err, results) {
    err && console.error(err);

    results.forEach(function (result) {
        var failures = result.run.failures;

        console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
            `${result.collection.name} ran successfully.`);

        console.log("******API CALLED******");
        console.log(JSON.stringify(result.run.executions[0].item.name));

        //console.log("******RESULT STATS******");
        //console.log(JSON.stringify(result.run.stats));

        console.log("********RESULT TIMING*******");
        console.log("responseAverage:"+JSON.stringify(result.run.timings.responseAverage)+" | Started:"+ JSON.stringify(result.run.timings.started)+" | Completed:"+ JSON.stringify(result.run.timings.completed));
    });
});