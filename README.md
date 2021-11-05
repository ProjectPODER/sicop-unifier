# sicop-unifier

Unify CSV rows from SICOP and augment with provider data.

## Usage

    (stream of JSON lines) | node sicop-unifier/index.js -x PROVIDER_DATA | (stream of JSON lines, one object per line)

To build JSON objects:
1. Download CSV from Datos Abiertos section of [SICOP](https://www.sicop.go.cr/).
2. Convert each line to a JSON object, using CSV header names as property names with stripped accents, all lowercase, and underscores for spaces (for example, Fecha notificación becomes fecha_notificacion).
3. Encapsulate each object inside a new JSON object with a property named "body" like so:
    ```
    {
        body: { (JSON object with contract data) }
    }
    ```
4. (Optional) add the following properties to the new object:
    ```
    httpLastModified: "2021-01-01T00:00:00Z" (date in which data was downloaded, in ISO format)
    dataSource: "sicop" (unique identifier for this data source, to be used later on in your pipeline)
    ```

## Options

    --classifiers   -x  Path to a CSV file containing provider data downloaded from SICOP (example provided as proveedores.csv)

## Additional notes

The output can be redirected to [transformer-ocds](https://github.com/ProjectPODER/transformer-ocds) to convert the JSON objects into OCDS documents.
