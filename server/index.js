const express = require('express');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
// const profileRouter = require('./routes/profile');
const fileRouter = require('./routes/file');

dotenv.config();

const app = express();
const Port = process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, PUT, PATCH POST, DELETE',
  credentials: true,
  OptionSuccessStaus: 204,
};

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

app.get('/', (req, res) => {
  try {
    res.status(200).render('homePage');
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ msg: 'Internal Server error' });
  }
});

app.use('/api/signup', signupRouter);

app.use('/api/login', loginRouter);

// app.use('/api/profile', profileRouter);

app.use('/api/file', fileRouter);

// app.post('/upload', upload.single('profileImage'), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);

//   return res.redirect('/');
// });

app.listen(Port, () => {
  console.log(`App listening at port ${Port}`);
});
