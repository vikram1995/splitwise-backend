const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://obend:vikram47@cluster0.lugyt.mongodb.net/test?authSource=admin&replicaSet=atlas-qov3c5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

//connect to mongoDB
async function main(){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    await listDatabases(client);

    try {
        await client.connect();

        await listDatabases(client);
    
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


