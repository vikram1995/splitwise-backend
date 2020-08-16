const express = require('express');
const fs= require("fs");
const staticfile = require("./jsonFiles/balanceSheet.json");
const app = express();
const port = 4000;
const cors = require('cors');
const { send } = require('process');
app.use(cors());
app.use(express.json());

app.post('/signUp',(req,res)=>{
    fs.readFile('./jsonFiles/signUp.json', 'utf-8',(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            data = JSON.parse(data);
            if(data[req.body.userName]){
                
                res.send({signUp:"user already present"});
                return
            }
            data[req.body.userName] = req.body.password;
            
            fs.writeFile('./jsonFiles/signUp.json', JSON.stringify(data),(err)=>{
                if(err){
                    console.log('error while writing file:', err)
                    res.send({signUp: false})
                    return
                }
                res.send({signUp:true});
            })
            }
    })

    
})

app.post('/login', (req,res)=>{

    fs.readFile('./jsonFiles/signUp.json', 'utf-8',(error,data)=>{
        console.log(req.body);
        if(error){
            console.log(error);
            return;
        }
        data = JSON.parse(data);
        
        if( req.body.username !== "" && data[req.body.username] === req.body.password)
            {  console.log(data[req.body.username]);
                console.log(req.body.password)
                res.send(JSON.stringify({login:true}))
            }
         else{
                
                res.send(JSON.stringify({login:false}))
            }
    })
    
    
});

app.get('/recent-activity',(req,res)=>{
    fs.readFile('./jsonFiles/recent-activity.json','utf-8',(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(data);
        }
    })
})

app.get('/friends',(req,res)=>{
    //res.send(JSON.stringify(["Rahul", "Swapnil", "Subham","sai"]))
    fs.readFile('./jsonFiles/friends.json','utf-8',(err, jsonData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(jsonData);
            
        }
    } )
})

app.post('/add-friends',(req,res)=>{
    fs.readFile('./jsonFiles/friends.json','utf-8',(err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            data = JSON.parse(data);
            if(data.find(element=> element === req.body.name)){
                return
            }
            data.push(req.body.name);
            
            fs.writeFile('./jsonFiles/friends.json',JSON.stringify(data),(err=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send("added")
                }
             }))
            
        }
    } )
})


app.get('/groups',(req,res)=>{
    //res.send(JSON.stringify(["Room Mates", "classmates"]))

    fs.readFile('./jsonFiles/groups.json','utf-8',(error,data)=>{
        if(error){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})

app.get('/expenses',(req,res)=>{
    
    fs.readFile('./jsonFiles/expense.json','utf-8',(error,data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data);
        }
    })
})

app.post('/add-transitions',(req,res)=>{
    fs.readFile('./jsonFiles/addExpenses.json',(error,data)=>{
        if(error){
            console.log(error)
        }
        else{
            data = JSON.parse(data);
            data.push(req.body);
            //console.log(data);
            

            fs.writeFile('./jsonFiles/addExpenses.json',JSON.stringify(data),(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    })

    fs.readFile("./jsonFiles/balanceSheet.json",(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            data=JSON.parse(data);
            let amount =0;
            if(req.body.paidBy === 'you'){
                if(req.body.friend in data){
                    amount=data[req.body.friend] ;
                    
                }
                amount = amount - (req.body.amount/2);
                data[req.body.friend] = amount;
            }
            else{
                    
                if(req.body.friend in data){
                    amount=data[req.body.friend] ;
                        
                    }
                amount = amount + (req.body.amount/2)
                data[req.body.friend] = amount;
            }

            fs.writeFile("./jsonFiles/balanceSheet.json",JSON.stringify(data),(err)=>{
               if(err){
                console.log(err);
                return;
               }
               console.log("run");
               res.send("updated");
                


            })
            
        }
    })
    
})

app.get('/transition-details',(req,res)=>{
    let balance={
        owe:{},
        owed:{},
        total:{}
    }
    fs.readFile("./jsonFiles/balanceSheet.json",(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            data = JSON.parse(data);
            balance.total = data;
            for(const friend in data){
                if(data[friend]>0){
                    balance.owe[friend]=data[friend] *1;
                }
                else if(data[friend]<0){
                    balance.owed[friend] = data[friend] * -1;
                }
            }

           
            res.send(balance);
        }
    });
    
})

app.post('/settelUp',(req,res)=>{
    console.log("api hit");
    fs.readFile("./jsonFiles/balanceSheet.json",(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            data = JSON.parse(data);
            let amount = data[req.body.friend];
            amount = amount - req.body.amount;
            data[req.body.friend] = amount;
            console.log(data);

            fs.writeFile("./jsonFiles/balanceSheet.json", JSON.stringify(data),(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send("setteled");
                }
            })


        }
    })
})

app.listen(port,()=> console.log("server running"));