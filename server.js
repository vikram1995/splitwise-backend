const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/login', (req,res)=>{
    console.log(req.body.password);
    if(req.body.username === "vikram" && req.body.password === '123')
    {   
        
        res.send(JSON.stringify({login:true}))
    }
    else{
        
        res.send(JSON.stringify({login:false}))
    }
    
});

app.get('/recent-activity',(req,res)=>{
    res.send(JSON.stringify([
        {
            id : 1,
            task : "added",
            type: "expense",
            description : "Dinner",
            image:"",
            date:"12/01/2020",
            day: "Monday",
        },
  
        {
            id : 2,
            task : "Created",
            type: "group",
            description : "flat",
            image:"",
            date:"13/02/2020",
            day: "Tuesday",
        },
        {
            id : 3,
            task : "deleted",
            type: "group",
            description : "flat",
            image:"",
            date:"14/02/2020",
            day: "Wednesday",
        }
  
    ]))
})

app.get('/friends',(req,res)=>{
    res.send(JSON.stringify(["Rahul", "Swapnil", "Subham","sai"]))
})
app.get('/groups',(req,res)=>{
    res.send(JSON.stringify(["Room Mates", "classmates"]))
})
app.get('/transitions',(req,res)=>{
    res.send(JSON.stringify({
        transNo: 1,
        amount: 100,
        members: ["vikram","subham","pandey"]
      }))
})
app.get('/expenses',(req,res)=>{
    res.send(JSON.stringify([
        {   
            id:1,
            day:"05",
            month:"MAY",
            description:"Breakfast",
            paid:"20.00",
            lendTo:"Rahul",
            lendAmound:"10.00"
        },
  
        {
            id: 2,
            day:"07",
            month:"DEC",
            description:"lunch",
            paid:"60.00",
            lendTo:"Swapnil",
            lendAmound:"30.00"
        },
        {
            id : 3,
            day:"05",
            month:"MAY",
            description:"Dinner",
            paid:"20.00",
            lendTo:"Rahul",
            lendAmound:"10.00"
        }
  
    ]))
})

app.get('/',(req,res) => res.send("hello express"));

app.listen(port,()=> console.log("sdssd"));