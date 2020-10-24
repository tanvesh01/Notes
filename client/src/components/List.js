import React from "react";
import { useQuery, gql } from "@apollo/client";

const AllBooks = gql`
    {
        books {
            name
            id
            author {
                name
            }
        }
    }
`;

const List = (props) => {
    const { loading, error, data } = useQuery(AllBooks);
    const ar = data && data.books ? data.books : [];
    console.log(data);
    return (
        <div>
            <ol>
                <li>
                    <h5>Tanvesh!</h5>
                </li>
                {ar.map((e) => {
                    return (
                        <li key={e.id}>
                            <h6>{e.name}</h6>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};
export default List;
