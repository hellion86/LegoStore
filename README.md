## Description

:moneybag:Simple react-LEGO store. You can add items to cart/favorites and etc.

The application interface is in Russian/English. Packing in docker to simple run.


### 1. Install dependencies:

```
$ make install
```
### 2. Start project:

```
$ make start
```

App will start on localhost:3000

### 3. Start via docker:

```
$ docker run -it -p 3000:3000 hellion86/lego-store
```

App will ready at localhost:3000

### Using
* Webpack
* React, axios
* mockapi as DB 
* React-Toastify
* react-i18next
* Deploy [vercel](https://lego-store-sigma.vercel.app/)
