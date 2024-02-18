require("dotenv").config({ path: `${__dirname}/.env` });
const connect_db = require("./db/index");
const app=require("./app")
connect_db.connectDB().then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("MongoDB connection failed",err)
});
