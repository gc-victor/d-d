# d-d

A tiny development static server with hot reload.

## Invoke

```console
npx github:gc-victor/d-d
```

## Install

You can use npm or yarn to install it.

```console
npm install git+https://github.com/gc-victor/d-d.git#master
```

## Config

You have to create a d-d.config.js file.

- **dist**: the place where your build files are, by **default '/dist'** 
- **src**: the place where your source code files are and where the watcher will listen for changes, by **default '/src'**
- **port**: the port of the static server, by **default 1234**
- **socketPort**: the web socket port, by **default 1235**
- **onChangeClient**: the method where you do your magic in the **Client**, by **default reloads the client**, you will receive the pathname to the file changed
- **onChangeServer**: the method where you do your magic in the **Server**, without a default value, you will receive the pathname to the file changed

### Example

```javascript
// d-d.config.js
import { execSync } from 'child_process';

export default {
    dist: '/dist',
    src: ['./src'],
    port: 1234,
    socketPort: 1235,
    onChangeClient: (pathname) => window.location.reload(),
    onChangeServer: (pathname) => {
        execSync('cp src/index.js dist/index.js', { stdio: 'inherit' });
    }
}
```

## Compatible Versioning

### Summary

Given a version number MAJOR.MINOR, increment the:

- MAJOR version when you make backwards-incompatible updates of any kind
- MINOR version when you make 100% backwards-compatible updates

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR format.

[![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all, see if your issue or idea has [already been reported](../../issues).
If it hasn't, just open a [new clear and descriptive issue](../../issues/new).

### Commit message conventions

A specification for adding human and machine readable meaning to commit messages.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope and do avoid unrelated commits.

-   Fork it!
-   Clone your fork: `git clone http://github.com/<your-username>/d-d`
-   Navigate to the newly cloned directory: `cd d-d`
-   Create a new branch for the new feature: `git checkout -b my-new-feature`
-   Install the tools necessary for development: `npm install`
-   Make your changes.
-   `npm run build` to verify your change doesn't increase output size.
-   `npm test` to make sure your change doesn't break anything.
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin my-new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://github.com/gc-victor/d-d/blob/master/LICENSE)
