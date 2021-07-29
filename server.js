import express from "express";
import bodyParsers from "body-parser";
import cors from "cors";

import { authRoute } from "./app/routes/auth.routes.js";
import { userRoute } from "./app/routes/user.routes.js";


import db from "./app/models/index.js";

const {json, urlencoded} = bodyParsers;

const app  = express();

var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true}));

// Call db 
const Role = db.role; 

// This line is used in production
db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
// 	console.log('Drop and Resync DB');
// 	initial();
// });


// // This create these 3 rows in database {in development}

// function initial() {
// 	Role.create({
// 		id: 1,
// 		name: "user"
// 	});

// 	Role.create({
// 		id: 2,
// 		name: "moderator"
// 	})

// 	Role.create({
// 		id: 3,
// 		name: "admin"
// 	})
// }

// simple route 
app.get("/", (req, res) => {
	res.json({ message: "Welcome to nankim application." });
});
// routes
authRoute(app);
userRoute(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running onport ${PORT}.`);
});
