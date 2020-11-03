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
const Message = require("../models/message");

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

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        id: { type: GraphQLID },
        note: { type: GraphQLString },
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
                console.log(args.id);
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
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return Message.find({});
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
                console.log(args.name);
                return new Book(args).save();
            },
        },
        addMessage: {
            type: MessageType,
            args: {
                note: { type: GraphQLString },
            },
            resolve(parent, args) {
                console.log(args.note);
                return new Message(args).save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
});
