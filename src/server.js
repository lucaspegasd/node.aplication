require("express-async-errors")

const migrationRun = require("./database/sqlite/migrations")

const appError = require("./Utils/appError");
const express = require("express");

const routes = require("./routes")

migrationRun();

const app = express();
app.use(express.json())

app.use(routes)


app.use(( error, request, response, next ) => {
    if(error instanceof appError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    });
});


const port = 3334;
app.listen(port, () => console.log(`Server is running on Port ${port}`))