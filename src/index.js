const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const path = require("path");
const sPath = path.join(__dirname, "../public");

app.use(express.static(sPath));

app.get("/", (req, res) => {
	// console.log(req.cookies)
	if(!req.cookies['isAdmin']){
		res.cookie('isAdmin', 0);
	}
	res.redirect("home.html");
    
});

app.get("/alert", (req, res) => {
	const isAdmin = req.cookies['isAdmin'];
	console.log(isAdmin);
    if (isAdmin === '0') {
        res.send({ 'flag': "Only admin can get the message" });
    } else {
        res.send({ 'flag': "zeroday{0nly_4dm1n_xss_1910}" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
