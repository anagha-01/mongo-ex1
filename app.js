const Express=require('express')
var app=new Express()
app.set('view engine','ejs')
app.get('/',(reg,res)=>{
    res.render('home')
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
})