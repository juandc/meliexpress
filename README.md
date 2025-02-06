# MeliExpress

## API

Required data transformations to pass from MercadoLibre API to MeliExpress API.

### Search

- author -- hardcoded
- categories -- [...filters[id===category].values[0?].path_from_root]
- items [...] -- results
  - id "String" -- .id
  - title "String" -- .title
  - price.currency "String" -- .currency_id
  - price.amount "Number" -- .price
  - price.decimals "Number" -- .price ???
  - picture "String" -- .thumbnail
  - condition "String -- .condition
  - free_shipping "Boolean" -- .shipping.free_shipping

### Product Detail

- author -- hardcoded
- item
  - id "String" -- .id
  - title "String" -- .title
  - price.currency "String" -- .currency_id
  - price.amount "Number" -- .price
  - price.decimals "Number" -- .price ??
  - picture "String" -- .pictures[0].url
  - condition "String -- .condition
  - free_shipping "Boolean" -- .shipping.free_shipping
  - sold_quantity "Number" -- .initial_quantity - ??
  - description "String" -- .descriptions[0]?
