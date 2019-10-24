# Issues

Issues are always very welcome - after all, they are a big part of making sequelize better. However, there are a couple of things you can do to make the lives of the developers _much, much_ easier:

### Tell us:

- What you are doing?
  - Post a _minimal_ code sample that reproduces the issue, including models and associations
  - What do you expect to happen?
  - What is actually happening?
- Which dialect you are using (postgres, mysql etc)?
- Which fastexpress version you are using?

When you post code, please use [Github flavored markdown](https://help.github.com/articles/github-flavored-markdown), in order to get proper syntax highlighting!

# Pull requests

We're glad to get pull request if any functionality is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainers:

- Explain the issue that your PR is solving - or link to an existing issue
- Make sure that all existing tests pass
- Make sure you followed [coding guidelines](https://github.com/davidcostadev/fastexpress/blob/master/CONTRIBUTING.md#coding-guidelines)
- Add some tests for your new functionality or a test exhibiting the bug you are solving. Ideally all new tests should not pass _without_ your changes.
- If you are adding to / changing the public API, remember to add API docs, in the form of [JSDoc style](http://usejsdoc.org/about-getting-started.html) comments.

Interested? Coolio! Here is how to get started:

### 1. Prepare your environment

Here comes a little surprise: You need [Node.JS](http://nodejs.org). We support the versions 8 LTS, 10 LTS and 12 LTS.

### 2. Install the dependencies

Just "cd" into sequelize directory and run `npm install` or `yarn`, see an example below:

```sh
$ cd path/to/fastexpress
$ npm install
```

### 3. Database

Database instances for testing can be started using Docker or you can use local instances of MySQL.

**For docker**

```sh
$ docker run --name fastexpress-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5
```

**With you Database running**

Run the create the database and migrate commands.

```sh
$ npm run pre-test
```

### 4. Running tests

To run all tests like CI

```sh
$ npm test
```

For custom purposes

```sh
$ npm run jest
```

Example:

```sh
$ npm run jest -- --watch [somefile]
```

### 5. Commit

Sequelize follows the [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.em2hiij8p46d).
Example:

    feat(pencil): add 'graphiteWidth' option

Commit messages are used to automatically generate a changelog. So make your life better you can run:

```sh
$ npm run commit
```

Then push and send your pull request. Happy hacking and thank you for contributing.

# Coding guidelines

Have a look at our [.eslintrc.js](https://github.com/davidcostadev/fastexpress/blob/master/.eslintrc.js) file for the specifics, [.prettierrc](https://github.com/davidcostadev/fastexpress/blob/master/.prettierrc) and [.editorconfig](https://github.com/davidcostadev/fastexpress/blob/master/.editorconfig). As part of the test process, all files will be linted, and your PR will **not** be accepted if it does not pass linting.

I recommend to you use plugins to show all the errors messages on you editor/IDE.

Thanks!
