const express = require('express');
const path = require('path');
const app = express();

const buildPath = process.env.DEV ? './client/build' : './client' 
app.use(express.static(path.join(__dirname, buildPath)));
app.use(express.static('../resources'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `${buildPath}/index.html`))
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Wal's portfolio is listening on port ${port}${process.env.DEV ? ' in development mode.' : '.'}`);
