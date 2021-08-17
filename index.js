const JSONStream = require('JSONStream');
const es = require('event-stream');
const commandLineArgs = require('command-line-args');

const buildClassifierList = require('./lib/classify');
const unifyRows = require('./lib/unify');

const optionDefinitions = [
    { name: 'classifiers', alias: 'x', type: String, multiple: true }
];
const args = commandLineArgs(optionDefinitions);
let classifierList = null;
if(args.classifiers) {
    classifierList = buildClassifierList(args.classifiers);
}
const rows = {};

process.stdin.setEncoding('utf8');
process.stdin
    .pipe(JSONStream.parse())
    .pipe(es.mapSync(function (doc) {
        unifyRows(doc, rows, classifierList);
    }))

process.stdin.on('end', () => {
    Object.keys(rows).forEach(function(key) {
        process.stdout.write( JSON.stringify(rows[key]) + '\n' );
    });
    process.exit(0);
});
