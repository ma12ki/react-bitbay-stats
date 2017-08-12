const { server } = require('./server');
const { port } = require('./config');

server.listen(port, (err) => {
    if (err) {
        console.error('OH NOEZ!', err);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});

// ticker().then(res => {
//     console.log(res);
// });

// transactions().then(res => console.log(res));
