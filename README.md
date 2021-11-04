# sicop-unifier

Unify CSV rows from SICOP and augment with provider data.

## Usage

    (stream of CSV lines) | node sicop-unifier/index.js -x PROVIDER_DATA | (stream of JSON lines, one object per line)

## Options

    --classifiers   -x  Path to a CSV file containing provider data downloaded from SICOP (example provided as proveedores.csv)

## Additional notes

The output can be redirected to [transformer-ocds](http://gitlab.rindecuentas.org/equipo-qqw/transformer-ocds) to convert the JSON objects into OCDS documents.
