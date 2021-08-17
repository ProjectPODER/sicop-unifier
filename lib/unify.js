function unifyRows(doc, rows, classifierList) {
    let row_id = doc.body.numero_procedimiento + '-' + doc.body.numero_contrato;
    let row = findRow(row_id, rows);
    if(row) {
        mergeRow(row_id, doc, rows);
    }
    else {
        createRow(row_id, doc, rows, classifierList);
    }
}

function findRow(id, rows) {
    if(rows.hasOwnProperty(id)) return rows[id];
    else return null;
}

function createRow(id, row, rows, classifierList) {
    rows[id] = row;
    rows[id].id = id;
    rows[id].body.items = [ { monto: fixAmount(row.body.monto_estimado), moneda: row.body.moneda_monto_estimado } ];
    rows[id].body.monto_estimado_sum = fixAmount(row.body.monto_estimado);
    rows[id].body.proveedor = getClassifierInfo(row.body.adjudicatario, classifierList);
}

function getClassifierInfo(id, list) {
    if(list.hasOwnProperty(id)) return list[id]
    else return null;
}

function mergeRow(id, row, rows) {
    rows[id].body.items.push( { monto: fixAmount(row.body.monto_estimado), moneda: row.body.moneda_monto_estimado } );
    rows[id].body.monto_estimado_sum += fixAmount(row.body.monto_estimado);
}

function fixAmount(string) {
    if( typeof string == "string" ) return parseFloat( string.replace(',', '.') );
    else return parseFloat( string );
}

module.exports = unifyRows;
