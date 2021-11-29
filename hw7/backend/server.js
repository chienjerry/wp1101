import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import User from './model/user';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();
mongoose
    .connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then((res)=>console.log("create!!"))
const app = express();
const port = process.env.PORT || 5000;
const saveUser = async(name,subject,score)=>{
    const existing =await User.findOne({ name: name, subject: subject });
    if (existing) {
        try{
        let nowdata={name:name,subject:subject}
        let newscore={$set:{score:score}};
        User.updateOne(nowdata,newscore, function (err, res) { })
        return `Updating(${name},${subject},${score})`;
        }
        catch(e){
        throw new Error("User Criterion Error: " + e)}}
    else {
        try {
        const newUser = new User ({name,subject,score});
        console.log("create user",newUser);
        let nowreturn=newUser.save();
        return `Adding(${name},${subject},${score})`;
        }
        catch(e) {
        throw new Error("User creation error"+e);}}
}
const deleteDB=async()=>{
    try{
        await User.deleteMany({});
        console.log("database deleted");
    }
     catch(e){throw new Error("database deletion failed"+e);}
}
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
    console.log(req);
});
app.delete('/api/clear-db', async (req, res) => {
    console.log(req);
    await deleteDB();
    res.json({ message: 'Database has been cleared' })
});

app.post('/users', (req, res) => {
    res.send('POST HTTP method on users resource')
});

app.put('/users/:userID', (req, res) => {
    res.send(`PUT HTTP method on users/${req.params.userID} resource`,)
})

app.post('/api/create-card', async (req, res) => {
    console.log(req.body.name);
    let name = req.body.name;
    let subject = req.body.subject;
    let score = req.body.score;
    const response = await saveUser(name, subject, score);
    console.log(response);
    res.json({ message: `${response}`, card: 'ok' })
})

app.post('/api/query-cards', async (req, res) => {
    let qType = req.body.queryType;
    let qString = req.body.queryString;
    console.log(qType);
    console.log(qString);
    let existing;
    if (qType === 'name') { existing = await User.find({ name: `${qString}` }); }
    else { existing = await User.find({ subject: `${qString}` }); }
    let out = existing.map(e => `(${e.name}, ${e.subject}, ${e.score})`);
    let output;
    if (out.length === 0) { output = [`${qType} (${qString}) not found!`] }
    else { output = out; }
    console.log(output)
    res.json({ messages: output})
})
app.listen(port,()=> console.log(`example app on port ${port}!`),);
console.log(53)
const db=mongoose.connection;
db.on("error",(err)=>console.log(err));




