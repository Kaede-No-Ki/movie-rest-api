# Movie-Corner

<p align="center">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub" src="https://img.shields.io/github/license/Kaede-No-Ki/drakor-rest-api"> 
<img alt="GitHub stars" src="https://img.shields.io/github/stars/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub watchers" src="https://img.shields.io/github/watchers/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Kaede-No-Ki/drakor-rest-api">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Kaede-No-Ki/drakor-rest-api">
</p>

## PRODUCTION SERVER

[Click Here](https://calm-plateau-31453.herokuapp.com/)

## TODO

- [x] Home
- [x] List Korean Series
- [x] List Western Series
- [x] List Asian Series
- [x] List Movies
- [x] Detail Series
- [x] Detail Episode Series
- [x] Detail Movies
- [x] Search
- [x] Genre
  - [x] Genre List
  - [x] Movies or Series by Genre

## Usage

1. Clone this repository

```bash
git clone https://github.com/Kaede-No-Ki/drakor-rest-api.git
```

2. Install packages (use `yarn` or `npm`)

```bash
npm install
```

3. Start server

- a. Production

```bash
npm run start
```

- b. Development

```bash
npm run dev
```

## API Documentation

**API Version** : v1

| Endpoint             | Params                     | Description                    |
| -------------------- | -------------------------- | ------------------------------ |
| /                    | -                          | Homepage                       |
| /list/korean/:page   | page : Int                 | List Korean Series             |
| /list/west/:page     | page : Int                 | List Western Series            |
| /list/asia/:page     | page : Int                 | List Asian Series              |
| /list/movies/:page   | page : Int                 | List Movies                    |
| /series/:id          | id : String                | Detail Series                  |
| /series/episode/:id  | id : String                | Detail Episode Series          |
| /movies/:id          | id : String                | Detail Movies                  |
| /genres              | -                          | Genre List                     |
| /genre/:id/:page     | id : String, page : Int    | Show movies or series by Genre |
| /search/:query/:page | query : String, page : Int | Search movies or series        |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/Kaede-No-Ki/drakor-rest-api/blob/master/LICENSE)
