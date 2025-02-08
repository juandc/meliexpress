# MeliExpress

Clon de MercadoLibre usando React.js y Next.js para buscar, visualizar y guardar (como favoritos) productos.

## UI

...

### UI TODOs

- [x] Search Bar
- [x] Search Results
- [x] Product Detail
- [x] Favorites
- [ ] Loading Skeletons
- [ ] Error Handling
- [ ] Debounce Search Bar Previews
- [ ] Image Modal (?)
- [ ] Optimistic UI (favorites delete, abort notification?)
- [ ] I18N / Tropicalization (?)
- [ ] UI Tests
- [ ] A11Y (manual?) Tests
- [ ] E2E Test
- [ ] Final work docs

## API

Por agilidad se usará el mismo App Router de Next.js para generar la API intermedia entre MercadoLibre y MeliExpress.

### API TODOs

- [x] API Hardcodeada pata Search y Product Detail
- [x] Conectar la API de MercadoLibre
- [x] API Hardcodeada para Favoritos
- [x] Some Clean Architecture practices
- [ ] SQLite para guardar Favoritos (?)
- [ ] Final work docs

### Transformations

Required data transformations to pass from MercadoLibre API to MeliExpress API.

#### Search

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

#### Product Detail

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
