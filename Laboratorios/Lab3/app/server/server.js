const express= require('express');
const apiRouter =require('./routes');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(apiRouter);
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message });
});
const port = 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));