# weight-pacha-api

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

This is a simple boilerplate for building REST APIs in Node.js using Express. Intended for use with MySQL using Sequelize ORM.

## Getting Started

Clone the repository

```bash
git clone https://github.com/ORN_Fox/weight-pacha-api.git
```

Enter into the directory

```bash
cd express-sequelize-boilerplate/
```

Install the sequelize-cli and dependencies

```bash
npm install -g sequelize-cli
npm install
```

Set the environment variables

```bash
cp .env.example .env
```

Running the boilerplate:

```bash
npm run dev
```

## Configuration

Variables for the environment

| Option             | Description                 |
| ------------------ | --------------------------- |
| SERVER_PORT        | Port the server will run on |
| NODE_ENV           | development or production   |
| SERVER_JWT         | true or false               |
| SERVER_JWT_SECRET  | JWT secret                  |
| SERVER_JWT_TIMEOUT | JWT duration time           |
| DB_DIALECT         | "mysql", among others       |
| DB_HOST            | Database host               |
| DB_USER            | Database username           |
| DB_PASS            | Database password           |
| DB_NAME            | Database name               |
| AWS_KEYID          | Access key ID               |
| AWS_SECRETKEY      | User secret key             |
| AWS_BUCKET         | Bucket name                 |

## Commands for sequelize

```bash
# Creates the database
yarn sequelize db:create

# Drops the database
yarn sequelize db:drop

# Load migrations
yarn sequelize db:migrate

# Undo migrations
yarn sequelize db:migrate:undo:all

# Load seeders
yarn sequelize db:seed:all
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
