const Express=require('express')
var bodyParser=require('body-parser')
const Mongoose=require('mongoose')
var request=require('request')
var app=new Express()
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const StudentModel=Mongoose.model("studentdetails",{name:String,rollno:String,admno:String,college:String})     //creating model
Mongoose.connect("mongodb://localhost:27017/collegebd")          //establishing connection,dbname-collegedb
app.get('/',(req,res)=>{
    res.render('home')

})
app.post('/read',(req,res)=>{
    
     console.log(req.body)
     var student=new StudentModel(req.body)
     var result=student.save((error,data)=>{          
         if(error){
             throw error
             res.send(error)
         }
         else{
             res.send(data)
         }
     })
     res.send(result)
}) 
app.get('/getdatas',(req,res)=>{
    result =StudentModel.find((error,data)=>{
        if(error){
            throw error
        }
        else{
            res.send(data)
        }
    })
}
)
const getdataApi="http://localhost:3001/getdatas";


app.get('/disp',(req,res)=>{
    request(getdataApi,(erro,response,body)=>{
        var data=JSON.parse(body)
        console.log(data)
 
        res.render('disp',{'data':data})
           })
   
})
app.listen(process.env.PORT || 3001,()=>{
    console.log("Server is running")
   
})