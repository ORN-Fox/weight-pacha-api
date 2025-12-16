# weight-pacha-api 0.1.0-dev

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
cd weight-pacha-api/
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

| Option                | Description                       |
| ----------------------| --------------------------------- |
| SERVER_PORT           | Port the server will run on       |
| NODE_ENV              | development, test or production   |
| CLIENT_BASE_URL       | localhost or custom domain        |
| SERVER_JWT_ENABLED    | true or false                     |
| SERVER_JWT_SECRET     | JWT secret                        |
| SERVER_JWT_TIMEOUT    | JWT duration time in ms           |
| DB_DIALECT            | "mysql", among others             |
| DB_HOST               | Database host                     |
| DB_PORT               | Database port                     |
| DB_USER               | Database username                 |
| DB_PASS               | Database password                 |
| DB_NAME               | Database name                     |
| MIN_PASSWORD_LENGTH   | Min password length               |

## Commands for sequelize

```bash
# Creates the database
sequelize db:create --env <env>

# Drops the database
sequelize db:drop

# Load migrations
sequelize db:migrate

# Undo migrations
sequelize db:migrate:undo:all

# Load seeders
sequelize db:seed:all
```

Use `--debug` in command for display debug log

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
