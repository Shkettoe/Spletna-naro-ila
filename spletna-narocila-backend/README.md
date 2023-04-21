# Backend Spletna naročila

## Spremenljivke okolja

`
#podatki od baze

DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

ORIGIN_HOST=[host od frontenda (localhost, če je lokalno okolje)]
`

## Endpointi

get /orders - pregled vseh naročil
get /orders/:id - pregled posameznega naročila
patch /orders/:id - urejanje posameznega naročila

## Zagon

`php artisan serve`
