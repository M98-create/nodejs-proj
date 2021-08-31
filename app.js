const express = require ('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const Blog = require('./models/blog');


const app = express();
//connect to mongodb
const DB='mongodb+srv://netninja:test1234@nodetuts.da5jh.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true})
   .then((result) => app.listen(3000))
   .catch((err)=> console.log(err));

app.set('view engine', 'ejs')
app.listen(3000)

app.use(express.static('public'));


app.use(morgan('dev'));

app.get('/add-blog',(req,res)=>{

  const blog = new Blog({
title: 'new blog',
snippet: 'about my new blog',
body: 'more about my new blog'

  });
  blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
    })
})
app.get('/',(req, res)=>{
    const blogs=[
        {title:'maria likes to sleep', snippet:'sleeping is as important as studying'},
        {title:'maria finds stars', snippet:'the stars are found in a pure sky'},
        {title:'How to defeat enemies', snippet:'Act as they are not there'},
    ];
    res.render('index',{title:'Home',blogs});

});
app.get('/about',(req, res)=>{
    res.render('about',{title:'about'});

});

app.get('/calories',(req, res)=>{
    res.render('calories',{title:'calories'});

});

app.get('/blogs/create',(req, res)=>{
    res.render('create',{title:'create'});

});
app.use((req, res)=>{
    res.status(404).render('404');
});