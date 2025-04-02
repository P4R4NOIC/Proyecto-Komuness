# Proyecto-Komuness Backend

Esta carpeta contiene el backend del proyecto-komuness . 

1 Semestre 2025
## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura Carpetas](#estructura-carpetas)
- [API Endpoints](#api-endpoints)


## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/P4R4NOIC/Proyecto-Komuness.git
    cd Proyecto-Komuness/backend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea el archivo `.env`  en el directorio raiz (aqui) y añada la URL del MongoDB y otras variables de entorno:
    ```env
    BD_URL=your_mongodb_uri
    PORT=your_port
    ```

## Uso

1. Inicie el modo de desarrollador:
    ```sh
    npm run start
    ```

2. Haga el build para producción:
    ```sh
    npm run build
    ```


## Estructura carpetas
- `controllers/` : Capa que contiene los archivos que controlan las solicitudes HTTP recibidas del cliente, aqui se generan las respuestas HTTP de las solicitudes.
- `models/` : Capa que contiene los archivos de los modelos de mongoose que definen los esquemas de las colecciones en MongoDB
- `interfaces/` : Contiene las formas que contiene los objetos que se usan en el backend (importante para typescript)
- `routes/` : Contiene los archivos encargados de definir las rutas de la api y de dirigir las solicitudes HTTP y de gestionar los métodos HTTP
- `utils/` : Contiene funcionalidades externas que puede ser usadas durante todo el proceso de una solicitud (ya sea HTTP o de la base de datos)
- `middlewares/` Contiene las configuraciones que procesan a "medio camino" las solicitudes HTTP, para este proyecto se implementarán para la validación de los usuarios y el procesamento de archivos

## API Endpoints

### Entidad: Publicación
- `GET /publicaciones` - Recuperar todas las publicaciones
    - **Query Params:**
        - `offset` (int): Indica desde qué documento empezar a devolver los resultados. En otras palabras, es la cantidad de documentos a omitir antes de empezar a devolver los resultados.
        - `limit` (int): Especifica cuántos documentos queremos obtener en una sola consulta.
        - `autor` (string) : [Opcional] buscar por autor
        - `tag` (string) : [Opcional] buscar por el tag (tipo de publicacion)
        - `fechaEvento` (string) : [Opcional] buscar por la fecha del evento
        - `publicado` (string) : [Opcional] buscar por si está publicado o no
    - Nota: si no coloca los query params, devuelve los primeros 10...
- `POST /publicaciones` - Crea una nueva publicaciónón
    - **Body Params**
        - `titulo` (string): Título de la publicación
        - `contenido` (string): Descripción de la publicación
        - `autor` (string): el UUID del autor
        - `fecha` (Date): Fecha de la creación de la publicación
        - `adjunto` (string []) : las imágenes de la publicación  o si no tambien puede ser vacío
        - `tag` (string) : Es la etiqueta de la publicación (tipo de publicación) definido por el frontend
        - `publicado` (string): Determina si está publicado o no
        - `fechaEvento` (Date): [Opcional] la fecha del evento
        - `precio` (Date): [Opcional] Fecha de la creación de la publicación

- `GET /publicaciones/:id` - Recupera la publicacion por su id
    - **Path Params**
        - `id` el identificador de la publicacion UUID.
- `PUT /publicaciones/:id` - Actualiza la publicación por su id
    - **Body Params**
        - `_id` (string): Id de la publicación
        - `titulo` (string): Título de la publicación
        - `contenido` (string): Descripción de la publicación
        - `autor` (string): el UUID del autor
        - `fecha` (Date): Fecha de la creación de la publicación
        - `adjunto` (string []) : las imágenes de la publicación  o si no tambien puede ser vacío
        - `tag` (string) : Es la etiqueta de la publicación (tipo de publicación) definido por el frontend
        - `publicado` (string): Determina si está publicado o no
        - `fechaEvento` (Date): [Opcional] la fecha del evento
        - `precio` (Date): [Opcional] Fecha de la creación de la publicación
- `DELETE /publicaciones/:id` - Elimina una publicion por su id (UUID)
    - **Path Params**
        - `id` El identificador de la publicación.

- `POST /publicaciones/:id/comentarios` - Agrega un comentario a una publicacion
    - **Path Params**
        - `id` El identificador de la publicacion.
    - **Body Params**
        - `autor` (string) : el UUID del autor
        - `contenido` (string) : el contenido del comentario
