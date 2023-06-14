
# REST API using Node.js

Used in this project:

- Node.js
- express
- mssql
- sequelize
- tedious
- cors



## Run


Go to the project directory

```bash
  cd api-node-mssql
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## config.json

To run this project, you will need to set values for variables in config.json

`dbName` - Database name, that will be created

`server` - Server connection address

`userName` - Username

`password` - Password

## API Reference

#### [Get] ping

```
  GET /ping
```

Response: Dogshouseservice.Version1.0.1

#### [Get] all items

```
  GET /dogs
```

| filter       | Description                                               |
|:-------------|:----------------------------------------------------------|
| `attribute`  | Filter by any attribute: name, color, tail_length, weight |
| `order`      | Order items by **asc** or **desc**                        |
| `pageNumber` | By default **pageNumber** is **1**                        |
| `pageSize`   | By default **pageSize** is **10**                         |

*Example*

```
  GET /dogs?attribute=name&order=desc&pageNumber=1&pageSize=2
```

#### Create [post] item

```
  POST /dog
```

**Payload**

```
{
    name: string;
    color: string;
    tail_length: number;
    weight: number;
}
```


## Author

- [Artem Balanovskyi](www.linkedin.com/in/artem-balanovskyi-6547781a3) 

