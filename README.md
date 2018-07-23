# restringidos-oracle
Oráculo de Fármacos Restringidos

## Descripcion
El oraculo de farmacos restringidos actualiza el registro de farmacos restringidos en el blockchain.

## API Description

### Actualizar farmaco restringido

`POST /actualizar`

Permite actualizar la condicion de restringido de un fármaco.

#### Body
```
{
  codigo: <codigo de farmaco>,
  restringido: [true|false]
}
```

#### Response

| Status |     Message    |                               |
|:------:|----------------|-------------------------------|
| 200    | Ok.            | Farmaco recuperado            |
| 400    | Bad Request    | Parameter missing or invalid  |
| 500    | Internal Error | Internal error                |


## Install
```
yarn Install
```

## Start Server (port 4000)
```
yarn start
```