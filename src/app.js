const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyparser = require("body-parser"); // for partials
const port = process.env.PORT || 9000; //process.env.PORT this means if we want to run our program then it  will run in thie port otherwise in localhost run in  7000
// mongoose.set('useFindAndModify', false);
// require("./db/conn");
require("./db/conn");
const Newdata = require("../src/modles/register");
const Review = require("../src/modles/reviewSchema");
app.use(
  session({
    secret: "bharat",
    resave: true,
    saveUninitialized: true,
  })
);
const { assert, log } = require("console");
// console.log(path.join(__dirname,"../public"));
const views_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.json()); //telling that we want our data in json form it will give in post app but for localhost
app.use(express.urlencoded({ extended: false })); //you have to write this and after this your data base ia also connected

app.set("view engine", "hbs");
app.set("views", views_path);
app.use(bodyparser.urlencoded({ extended: true }));
hbs.registerPartials(partial_path);
app.get("/", (req, res) => {
  // console.log("stating / function");
  res.render("index.hbs");
});
app.get("/first", (req, res) => {
  // console.log("stating / function");
  console.log("Response is ", res);
  res.render("first.hbs");
});

app.get("/login", (req, res) => {
  // console.log("stating / function");
  res.render("login.hbs");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/first", async (req, res) => {
  console.log("called api");
  try {
    const adding = new Newdata({
      usrnm: req.body.usrnm,
      email: req.body.email,
      address: req.body.address,
      dob: req.body.dob,
      pin: req.body.pin,
    });
    console.log(adding);
    const register = await adding.save();
    res.status(202).render("success");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/saveRating", async (req, res) => {
  try {
    const review = new Review({
      breweryId: req.body.breweryId,
      rating: req.body.rating,
      username: req.body.username,
    });

    const savedReview = await review.save();
    res.status(201).send(savedReview);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({ error: "Bad Request", message: error.message });
  }
});

app.get("/getRatings", async (req, res) => {
  try {
    const breweryId = req.query.breweryId;

    // Find the review in the Review model based on the brewery ID
    const review = await Review.find({ breweryId });

    // If a review is found, send the rating in the response
    if (review) {
      res.json({ data: review });
    } else {
      // If no review is found, you can send a default value or handle it as per your requirements
      res.json({ rating: null });
    }
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const usrnm = req.body.usrnm;
  const pin = req.body.pin;
  Newdata.findOne({ usrnm: usrnm }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc.pin);
      if (doc.pin === pin) {
        res.render("dashboard.hbs", { username: usrnm });
      } else {
        res.send("please enter correct pin");
      }
    }
  });
});

// for showing all data
// app.get("/show",async(req,res )=>{
//     try{
//       console.log(getmen);
//         res.send(getmen);
//         res.render("show");
//           }catch(e){
//     res.send(e);
//     }
// })
app.get("/show", async (req, res) => {
  Newdata.find((err, docs) => {
    if (!err) {
      res.render("show", {
        list: docs,
      });
    } else {
      console.log("error occue" + err);
    }
  });
});

app.get("/show/:_id", (req, res) => {
  Newdata.findById(req.params._id, (err, doc) => {
    if (!err) {
      res.render("first", {
        title: "updated employee",
        first: doc,
      });
    }
  });
});
app.use(express.json());

app.get("/cus/:_id", (req, res) => {
  Newdata.findById(req.params._id, (err, doc) => {
    if (!err) {
      res.render("cusdetail", {
        list: doc,
      });
    }
  });
});
app.patch("/show/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    // const name=req.params.name;
    const tske = req.params;
    const update = await Newdata.findByIdAndUpdate(
      _id,
      { usrnm: "komal" },
      {
        new: true,
      }
    );
    // const update=await Rank.findByIdAndUpdate(name);
    res.send(update);
  } catch (e) {
    res.status(500).send(e);
  }
});

// app.post("/show/:id",async(req,res )=>{
//     try{
//         const _id=req.params.id;
//         // const name=req.params.name;
//         const tske=req.params;

//         const update=await Newdata.findOneAndUpdate({_id:req.body._id},(req.body),{
//             new:true
//         },{useFindAndModify: false});
//         // const update=await Rank.findByIdAndUpdate(name);
//         const register=await update.save();
//         res.send(register);

//     }catch(e){
//     res.status(500).send(e);
//     }
// });

app.get("/show/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const update = await Newdata.findByIdAndDelete(_id);
    res.send(update);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
