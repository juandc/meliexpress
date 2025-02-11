# [MeliExpress](https://meliexpress.vercel.app/)

Clon de MercadoLibre usando React.js y Next.js para buscar, visualizar y guardar (como favoritos) productos.


##  Páginas a Implementar

Debe desarrollarse un sitio web con las siguientes cuatro pantallas:

### Página Principal

- Debe contener únicamente una barra de búsqueda donde el usuario pueda escribir un término de
búsqueda. ✅

> ✨ También se agregó un botón para ver la lista de favoritos.

- Al presionar "Enter" o hacer clic en un botón de búsqueda, debe redirigir a la página de resultados.  ✅

- Esta página actúa como la pantalla de inicio de la aplicación. ✅

![Home implementado](https://github.com/user-attachments/assets/9e0c9d79-f2f6-47c6-bfbf-c79c89dcc214)

### Página de Resultados de Búsqueda

- Muestra un listado de máximo 5 productos por búsqueda. ✅

- Cada resultado debe mostrar información relevante del producto. ✅

- Al hacer clic en un resultado, debe redirigir a la página de detalle del producto. ✅

- Debe incluir un botón para agregar a favoritos para cada producto (este botón no aparece en las
imágenes de referencia, por lo que se puede diseñar libremente). ✅

- Se debe mostrar el breadcrumb de categorías de la búsqueda. ✅

> ✨ Se usó la información del `address_state` como ubicación en los resultados de búsqueda.
>
> ✨ El botón de agregar a favoritos se muestra en la esquina superior derecha de cada producto. Si el producto ya está en favoritos, permite eliminarlo de la lista. Pasa a un estado de carga mientras se completa el proceso de agregar o eliminar de favoritos.

![Vista de search results implementada](https://github.com/user-attachments/assets/c2b69d68-965e-471d-a75e-ca41c5d05676)

### Página de Detalle del Producto

- Debe mostrar la información completa del producto. ✅

- Se debe garantizar un buen SEO para esta página, posiblemente usando SSR (Server-Side Rendering). 🛑

> ✨
>
> Desde front se priorizó que toda la información posible fuera estructurada en [server components](https://platzi.com/blog/react-server-components/), así no solo el primer renderizado sucede desde el servidor (SSR), sino que también evita la rehidratación client-side de elementos estáticos.
>
> Para convivir con elementos interactivos (sean client-only o simplemente que sí necesitaran rehidratación) se usaron patrones de composición de componentes ([aquí más información](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props)).
>
> Adicional, para la metadata se usaron las [convenciones de Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), así que aunque haya requests duplicados entre archivos de la misma ruta (e.j. layout y page) su respuesta es memoizada y realmente solo sucede una vez por render ([aquí más información](https://nextjs.org/docs/app/building-your-application/caching#data-cache)).

- Debe incluir un botón para agregar a favoritos (este botón no aparece en las imágenes de referencia,
por lo que se puede diseñar libremente). ✅

> ✨ El botón de agregar a favoritos se muestra debajo del botón de comprar. Replica la funcionalidad del botón de agregar a favoritos en la página de resultados de búsqueda, pero con un tamaño más grande y un link para ver la lista de favoritos si el producto fue previamente guardado.

- Se debe mostrar el breadcrumb de categorías del producto. ✅

![Vista de detalle del producto implementada](https://github.com/user-attachments/assets/4a2969be-683b-48c7-9623-73e7696b4ac3)

### Página de Favoritos

- Lista de productos marcados como favoritos. ✅

- El candidato tiene libertad de elegir el diseño de esta página. ✅

> ✨ Se replicó casi con exactitud el mismo diseño de la vista de resultados.

- Cada producto en favoritos debe permitir redirigir a su página de detalle. ✅

- Los productos marcados como favoritos deben almacenarse en el backend en lugar de localStorage. ✅

- Para almacenar los favoritos en el backend se pueden guardar en memoria. ✅

![Vista de favoritos implementada](https://github.com/user-attachments/assets/a89e6f69-022e-4964-ad93-387b0f4908c6)

### Notas Adicionales

Las vistas son navegables de manera independiente y cuentan con su propia url:

- Caja de Búsqueda: `/` ✅

- Resultados de la búsqueda: `/items?search=` ✅ (como redirect)

> ✨ El path "principal" para los resultados de búsqueda es `/search/{query}`, el path indicado `/items?search={query}` solo hace redirect a `/search/{query}` por agilidad para la implementación.

- Detalle del producto: `/items/:id`  ✅

- Favoritos: `/favorites` ✅

Construir los siguientes endpoints para ser utilizados desde las vistas:

-  `/api/items?q=:query` ✅

> - Este endpoint consume la búsqueda de producto que se describe abajo.
> - Este endpoint debe devolver el resultado en el siguiente formato:
> ```js
> {
>   "author": {
>     "name": "String",
>     "lastname": "String"
>   },
>   "categories": ["String", "String", "String", ...],
>   "items": [
>     {
>       "id": "String",
>       "title": "String",
>       "price": {
>         "currency": "String",
>         "amount": "Number",
>         "decimals": "Number"
>       },
>       "picture": "String",
>       "condition": "String",
>       "free_shipping": "Boolean"
>     },
>     { ... },
>     { ... },
>     { ... },
>   ]
> }
> ```
>
> ✨ Formato implementado:
> ```js
> {
>   data: {
>     "author": {
>       "name": "String",
>       "lastname": "String"
>     },
>     "categories": ["String", "String", "String", ...],
>     "items": [
>       {
>         "id": "String",
>         "title": "String",
>         "price": {
>           "currency": "String",
>           "amount": "Number",
>           "decimals": "Number"
>         },
>       "picture": "String",
>       "condition": "String",
>       "free_shipping": "Boolean",
>       "address_state": "String",
>       "favorite": "Boolean"
>     },
>     { ... },
>     { ... },
>     { ... },
>     ]
>   },
>   error: null
> }
> ```
>

- `/api/items/:id` ✅

> - Este endpoint consume el detalle y descripción de producto que se encuentra abajo.
> - Este endpoint debe devolver el resultado en el siguiente formato:
> ```js
> {
>   "author": {
>     "name": "String",
>     "lastname": "String"
>   },
>   "item": {
>     "id": "String",
>     "title": "String",
>     "price": {
>       "currency": "String",
>       "amount": "Number",
>       "decimals": "Number"
>     },
>     "picture": "String",
>     "condition": "String",
>     "free_shipping": "Boolean",
>     "sold_quantity": "Number",
>     "description": "String"
>   }
> }
> ```
>
> ✨ Formato implementado:
> ```js
> {
>   data: {
>     "author": {
>       "name": "String",
>       "lastname": "String"
>     },
>     "categories": ["String", "String", "String", ...],
>     "item": [
>       {
>         "id": "String",
>         "title": "String",
>         "price": {
>           "currency": "String",
>           "amount": "Number",
>           "decimals": "Number"
>         },
>         "picture": "String",
>         "condition": "String",
>         "free_shipping": "Boolean",
>         "address_state": "String",
>         "favorite": "Boolean",
>         "sold_quantity": "Number",
>         "description": "String"
>       },
>       { ... },
>       { ... },
>       { ... },
>     ]
>   },
>   error: null
> }
> ```

- `/api/favorites/add` ✅
> - Este endpoint debe agregar a favoritos los items que se le envíen. ✅
> - Idealmente se enviará como input el objeto completo a guardar. ✅

> 👀 Se implementó como fue requerido, pero quedo con la duda de por qué guardar el objeto completo, teniendo así dos las fuentes de información, en vez de guardar solo el ID y completar la información del producto con request a la API de Meli.

- `/api/favorites/get` ✅
> - Este endpoint debe devolver los productos favoritos guardados en el backend. ✅
> - Idealmente tendría la misma estructura que el endpoint de detalle pero como un listado. ✅

Adicionalmente para el breadcrumb, se debe utilizar para la búsqueda la propiedad que devuelve la api y para
el detalle del producto la api de categoría de producto. ✅


## Funcionalidades Extra

- Test Unitarios ✅ / Integración 🛑 (Requerido)

- Accesibilidad 🛑 (Plus si se implementa correctamente).

- Por temas de seguridad sería bueno que no se accedan a las API directamente desde el front-end, sino
crear una api intermediaria que devuelva la información ✅ (Requerido).


## Tecnologías Permitidas

- React (puede ser con TypeScript o JavaScript).
- Node.js para crear la API con los endpoints.
- Se puede usar cualquier librería de UI o framework que facilite el desarrollo.
- CSS/Sass o cualquier pre-procesador de estilos.
- Se recomienda el uso de herramientas de pruebas como Jest, React Testing Library o similares (si se
deciden implementar tests).

> ✨ Se usó Next.js tanto para el frontend como para el backend.


## Notas

- La firma del json en el campo autor se refiere a tu nombre y apellido. Deberás agregar esta firma en el manejo de datos entre la API y el front-end. ✅

- El repositorio puede ser público o privado, como prefieras. 🆗

- No es necesario implementar la paginación, ni el filtro por categorías. 🆗

- El breadcrumb que se muestra en el listado de búsqueda debe armarse basado en la categoría que más resultados obtuvo (dicha información está disponible en la API de Search). (Obviamente, el breadcrumb de la página de detalle del ítem debe armarse con la categoría propia del ítem). ✅

- Podés usar en el listado de search la imagen que devuelve la API (90x90) aunque esta se vea pixelada al estirarla para ajustarse al diseño del test. (A fines del test, no hace falta que busques la imagen en el tamaño exacto). 🆗


## Consideraciones Finales

- No es necesario que el diseño sea pixel-perfect, pero debe ser lo más parecido a las imágenes de referencia. ✅

> ✨ Se implementó un diseño responsive, para pantallas de 320px de ancho en adelante (con un ancho máximo a partir de desktop, no está optimizado para ultrawide).

- Se espera un código bien estructurado y buenas prácticas en el desarrollo. 🤞

> ✨
>
> Considerando las tencologías empleadas, la escala del proyecto y el tiempo disponible se optó por crear un monolito en Next.js. Siguiendo el modelo del App Router, las vistas frontend y los endpoints de la API se encuentran en la carpeta `src/app/(ui)|(api)`.
>
> Los elementos comunes entre frontend y backend se encuentran en `src` (como los tipos y mocks).
>
> El resto de la estructura frontend se encuentra en `src/ui` y sigue una estructura convencional de aplicaciones en React.js (componentes, contenedores, requests a la API, hooks...).
>
> Y el resto de la estructura backend se encuentra en `src/api` siguiendo una implementación muy libre de Clean Architecture, priorizando (aunque sin limitarse a) la agilidad para cambiar entre fuentes de datos (e.j. de almacenamiento en memoria a bases de datos u otras APIs).

- La evaluación se basará en la calidad del código, la arquitectura utilizada y la experiencia del usuario. 🤞

> ✨ Para mejorar la experiencia de usuario se implementaron algunas funcionalidades extra:
>
> - **Loading Skeletons**
>
> Se implementaron estados de carga mientras se espera la respuesta de la API al navegar por la aplicación (e.j. al navegar desde el home hasta la página de favoritos).
>
> También hay estados de carga mientras se espera la respuesta de la API durante el primer render server-side de cualquier ruta de la aplicación (e.j. abriendo una nueva pestaña del navegador y entrando directamente a la página de favoritos), esto gracias a las convenciones de React ([Suspense](https://react.dev/reference/react/Suspense)) y Next ([loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)) para hacer streaming ([aquí más información](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)).
>
> El único caso donde no se implementó estado de carga durante el streaming del primer render es en la vista de detalle de producto, ya que se priorizó no dar ninguna respuesta hasta tener la información indispensable para la metadata (y al ser el mismo request para toda la información no queda nada más a esperar para mostrar un estado de carga).
>
> - **SearchBar con placeholder dinámico**
>
> En busca de captar la información del usuario e indicarle la primera acción principal que debe realizar (buscar) se implementó un placeholder con efecto de irse escribiendo y borrando con diferentes frases. Para una implementación real se recomendaría medir entre tener o no placeholders dinámicos (subir el número de búsquedas? bajar el churn en la página principal?) para confirmar que sí ayuda a los usuarios en vez de ser realmente una distracción.
>
> También en la vista de resultados se autocompletó el término buscado (de la url) en la barra de búsqueda.
>
> - **Micro-transiciones**
>
> Aunque no son animaciones especialmente complejas, se agregaron algunos suaves y sencillos cambios de estilo en diferentes elementos al recibir interacción de los usuarios, principalmente buscando indicar que son elementos clickeables / que causan alguna reacción en la aplicación.


## TODOs (just some notes for myself)

UI

- [x] Search Bar
- [x] Search Results
- [x] Product Detail
- [x] Favorites
- [x] Loading Skeletons
- [x] Error Handling
- [x] SEO
- [ ] UI Tests
  - [x] Components
  - [x] Containers
  - [ ] Pages (wont do, e2e instead)
  - [ ] A11Y (manual)
- [ ] Debounce Search Bar Previews
- [ ] Optimistic UI (favorites delete, abort notification?)
- [ ] Image Modal
- [ ] I18N / Tropicalization

API

- [x] API mock para Search y Product Detail
- [x] Conectar la API de MercadoLibre
- [x] API Hardcodeada para Favoritos
- [x] Some Clean Architecture practices
- [ ] API Tests
  - [ ] Endpoint tests
    - [x] favorites
    - [ ] items
  - [ ] Service tests
- [ ] SQLite para guardar Favoritos (?)

General

- [x] Deploy
- [x] Final work docs
- [x] E2E Tests (most important flows)
