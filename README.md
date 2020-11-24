# README

Workshop number 1 for Plataforma 5 advanced bootcamp: Git, testing, REST APIs

### What is this repository for?

- To be used to implement the excercises proposed during the classes.

### How do I start it locally?

- This repo is used by docker and docker-compose. Even if these topics will be studied in detail in another module, the easiest way to get everything running to test and implement is:

To start the mysql and test schema

```bash
docker-compose up -d mysql
```

To start the API project

```bash
docker-compose up local
```

### How do I run and implement tests?

To run unit tests

```bash
docker-compose up test
```

Integration tests are being implemented in the "tests" folder.
This is defined in the jest config.

To run integration tests

```bash
docker-compose up integration-test
```
