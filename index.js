const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/route');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);


app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});