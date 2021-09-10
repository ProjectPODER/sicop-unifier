const fs = require('fs');
const parse = require('csv-parse/lib/sync');

function buildClassifierList(paths) {
    if(paths.length > 0) {
        let lines = [];
        paths.map( (path) => {
            chainCSV(lines, path);
        } );

        return linesToObj(lines);
    }
    return null;
}

function linesToObj(lines) {
    let obj = {}
    lines.map( (line) => {
        let cedula = line[0].trim().toString();
        if( cedula.match(/^0/) ) cedula = cedula.substr(1);

        let nacionalidad = line[1].trim();
        let proveedor = line[2].trim();
        let tipo = line[3].trim();
        let direccion = line[4].trim();
        obj[proveedor] = {
            cedula: cedula,
            nacionalidad: nacionalidad,
            nombre: proveedor,
            tipo: tipo,
            direccion: direccion
        }
    } );

    return obj;
}

function chainCSV(acc, file) {
    let rawdata = fs.readFileSync(file);
    let lines = parse(rawdata, {
        delimiter: ';',
        skip_empty_lines: true,
        relax_column_count: true
    });

    acc.push(...lines);
}

module.exports = buildClassifierList;
