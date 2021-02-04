require('dotenv').config()
const db = require('./models')
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded());
app.use(express.json());

app.post("/users", async (req, res) => {
	const {login, nickname, email, password} = req.body
	const user = await db.user.create({login, nickname, email, password})

	return res.json(user)
})
app.get("/users" , async (req, res) => {
	const posts = await db.post.findAll({include: 'user'})

	return res.json(posts)
})

app.listen(PORT, async () => {
	console.log(`Server up on http://localhost:${PORT}`);
	await db.sequelize.authenticate();
	console.log('Database Connected');
})