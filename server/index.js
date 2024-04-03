const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { default: axios } = require("axios");

// const books = [
//   {
//     id: 1,
//     title: "Atomic Habit",
//     author: "james clear",
//     price: 400,
//     status: true,
//   },
//   {
//     id: 2,
//     title: "abcbook",
//     author: "abc",
//     price: 200,
//     status: false,
//   },
//   {
//     id: 1,
//     title: "xyz",
//     author: "xz1",
//     price: 100,
//     status: true,
//   },
// ];

// const typeDefs = gql`
//   type Book {
//     id: ID!
//     title: String!
//     author: String!
//     price: Int!
//     status: Boolean
//   }

//   type Query {
//     book: [Book]
//   }
// `;

// const resolvers = {
//   Query: {
//     book: () => books,
//   },
// };

const typeDefs = gql`
  type Item {
    id: ID!
    title: String!
    price: Float!
    category: String!
    image: String!
  }
  type Product {
    id: ID!
    title: String!
    price: Float!
    category: String!
    image: String!
    item : Item
  }

  type Query {
    product: [Product]
    getProduct(id : ID!) : Product
  }
`;

const resolvers = {
    Product : {
        item : async (item) => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${item.id}`);
                return res.data;
              } catch (error) {
                console.error(error);
                return null;
              }
        }
    },


    Query: {
      product: async () => {
        try {
          const res = await axios.get(`https://fakestoreapi.com/products`);
          return res.data;
        } catch (error) {
          console.error(error);
          return [];
        }
      },
      getProduct: async (_, { id }) => { 
        try {
          const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
          return res.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    },
  };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 8000;
(async () => {
  const app = express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `server is the running port at http://localhost:${port}${server.graphqlPath}`
    );
  });
})();
