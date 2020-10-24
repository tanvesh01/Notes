const express = require("express");
var { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://tanvesh01:dedsec01@graphql-notes.6btlz.mongodb.net/GraphQL-notes?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error: ", err.message));

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log(
        "================ SERVER STARTED ============"
    );
});
