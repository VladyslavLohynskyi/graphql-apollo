const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
require("dotenv").config();
const users = [{ id: 1, username: "Vlad", age: 24 }];

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors());
const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

const start = async () => {
  try {
    app.listen(PORT, () => console.log("SERVER IS STARTED! PORT = ", PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
