const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const path = require("path");
const userRoutes = require('./routes/user.route.js');
const postRoutes = require('./routes/post.route.js');
const { notFound, errorHandler } = require("./middleware/error.middleware.js");
const upload = require("express-fileupload");
require("dotenv").config();

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URI }));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'client/dist')));


// Fallback to index.html for any other route to support client-side routing
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
);
console.log(__dirname);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`server is running on port : ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
