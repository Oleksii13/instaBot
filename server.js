
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const app = express();
const { USERNAME_L, PASSWORD } = process.env;
const apiRoutes = require('./routes/apiRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
};

app.use('/api', apiRoutes);

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



// (async () => {

// 	await ig.initialize();

// 	await ig.login(USERNAME_L, PASSWORD);

// 	// await ig.likeTagsProcesses(['programmers', 'webdevelopers']);

// 	//await ig.followPeople();

// 	await ig.unfollowPeople();

// 	debugger;

// })()

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
})
