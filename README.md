# BETH Stack

![beth](beth-stack.png)

## Getting started

Create .env file

```sh
touch .env
```

```sh
DB_URL=
DB_TOKEN=
```

## Create Turso db

```sh
turso db create bunshortly
```

Get the db url

```sh
turso db show bunshortly
```

Get the db token

```sh
turso db tokens create bunshortly
```


Update the ```.env``` file with the token and url from the above commands


## Run the application
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.