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
