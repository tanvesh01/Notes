import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "./Queries";

const Info = (props) => {
    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: {
            id: props.selected,
        },
    });
    console.log(data);
    // const ar = data && data.books ? data.books : [];
    return (
        <div>
            <h4>{data ? data.book.genre : "Loading.."}</h4>
        </div>
    );
};

export default Info;
