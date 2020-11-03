import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AllBooks, AllAuthors, ADD_BOOK } from "./Queries";

const List = (props) => {
    const [author, setAuthor] = useState("");
    const { loading, error, data } = useQuery(AllAuthors);
    const ar = data && data.authors ? data.authors : [];
    const [addBook, { dataMutation }] = useMutation(ADD_BOOK);
    console.log(data);
    const handle = (e) => {
        setAuthor(e.target.value);
        console.log(e.target.value);
    };
    const submit = () => {
        addBook({
            variables: {
                name: "my name is what?",
                genre: "success",
                authorId: author,
            },
            refetchQueries: [{ query: AllBooks }],
        });
        // .then((el) => console.log(el))
        // .catch((e) => console.log(e));
    };
    return (
        <div>
            <label>Authors: </label>
            <select value={author} onChange={(e) => handle(e)}>
                <option>Select Option</option>
                {ar.map((e) => {
                    return <option value={e.id}>{e.name}</option>;
                })}
            </select>
            <button onClick={() => submit()}>Submit</button>
        </div>
    );
};
export default List;
