const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const URI = process.env.URI
const bodyParser = require('body-parser')
const { default: mongoose, deleteModel } = require('mongoose')
const PORT = 3000;


app.use(cors())
app.use(cors({ origin: 'https://my-project-two-wine.vercel.app' }));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(URI)
.then((res)=>{
    console.log("Connected to mongoDB")
})
.catch((err)=>{
    console.log("NOT Connected to mongoDB" + err)
})

let userSchema = mongoose.Schema({
    item: String,
    description: String,
});

let userModel = mongoose.model('users', userSchema)


app.post('/save', (req, res)=>{
    // console.log(req.body)
    const todo = new userModel(req.body)
    todo.save()
})

app.post('/del/:id', (req, res)=>{
    const id = req.params.id

    userModel.findByIdAndDelete(id)
    .then((result)=>{
        console.log("Delete function is working", result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/retrieve', (req, res)=>{
    userModel.find()
    .then((storedTodo)=>{
        console.log(storedTodo)
        res.send(storedTodo)
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/show', (req, res)=>{
    res.send("something")
})

app.get("/", (req, res)=>{
    console.log(URI);
    res.send("Hello world")

})

app.listen(PORT, ()=>{
    console.log('Server is running at port ' + PORT)
})