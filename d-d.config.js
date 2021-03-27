import { execSync } from 'child_process';

export default {
    dist: '/test/dist',
    src: ['./test/src'],
    port: 1234,
    socketPort: 1235,
    onChangeClient: (pathname) => {
        console.log('onChangeClient', { pathname });
        window.location.reload();
    },
    onChangeServer: (pathname) => {
        execSync('cp test/src/index.js test/dist/index.js', {
            stdio: 'inherit'
        });
    }
};
