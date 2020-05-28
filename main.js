const http= require('http');



http.createServer((req,res)=>{
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  });

  if(req.method === 'POST' && req.url === '/login'){

    let username = 'vikram';
    let password = '123';
    let user;
    
    res.writeHead(200, { 
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    });
      let body='';
      req.on('data',chunk=>{
        body+=chunk;
      }) 
      req.on('end',()=>{
        user = JSON.parse(body)
        console.log("messsage: " + user.username);

        if(user.username === username && user.password === password)
        {
          console.log("login successfull");
          res.end(JSON.stringify({login:true}))
          
        }

        else{
          console.log("login failed");
          res.end(JSON.stringify({login:false}))
        }

        })

        
      
      
      
  }
  else if(req.url === '/recent-activity'){
    res.end(JSON.stringify([
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

  ]));
   }

   else if(req.url === '/friends'){
    res.end(JSON.stringify(["Rahul", "Swapnil", "Subham","sai"]))
   }

   else if(req.url === '/groups'){
    res.end(JSON.stringify(["Room Mates", "classmates"]))
   }

   else if(req.url === '/transitions'){
    res.end(JSON.stringify({
      transNo: 1,
      amount: 100,
      members: ["vikram","subham","pandey"]
    }))
   }

   else if(req.url === '/expenses'){
    res.end(JSON.stringify([
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
   }
    else{
      res.end("wow");
    }
        
  
}).listen(4000);