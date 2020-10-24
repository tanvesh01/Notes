const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;

const Book = require("../models/Book");
const Author = require("../models/Author");

// dummy data

const books = [
    {
        name: "Name of the Wind",
        genre: "Fantasy",
        id: "1",
        authorId: "1",
    },
    {
        name: "The Final Empire",
        genre: "Fantasy",
        id: "2",
        authorId: "2",
    },
    {
        name: "The Long Earth",
        genre: "Sci-Fi",
        id: "3",
        authorId: "3",
    },
    {
        name: "The Hero of Ages",
        genre: "Fantasy",
        id: "4",
        authorId: "2",
    },
    {
        name: "The Colour of Magic",
        genre: "Fantasy",
        id: "5",
        authorId: "3",
    },
    {
        name: "The Light Fantastic",
        genre: "Fantasy",
        id: "6",
        authorId: "3",
    },
];
const authors = [
    { name: "Patrick Rothfuss", age: 44, id: "1" },
    { name: "Brandon Sanderson", age: 42, id: "2" },
    { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
    //* define  schema
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return Author.findById(parent.authorId);
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    //* define  schema
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                //* code to get data from DB
                return Book.findById(args.id);
            },
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                // console.log(parent + " and " + args.id);
                return Author.findById(args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            },
        },
    },

    //* Frontend or client
    // book(id: "123") {
    //     name,
    //     genre
    // },
});

const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args) {
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age,
                });
                return newAuthor.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                return new Book(args).save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
});
