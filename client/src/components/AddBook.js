import React from "react";
import { useQuery, gql } from "@apollo/client";

const AllAuthors = gql`
    {
        authors {
            name
        }
    }
`;

const List = (props) => {
    const { loading, error, data } = useQuery(AllAuthors);
    const ar = data && data.authors ? data.authors : [];
    console.log(data);
    return (
        <div>
            <label>Authors: </label>
            <select>
                <option>Select Option</option>
                {ar.map((e) => {
                    return <option>{e.name}</option>;
                })}
            </select>
        </div>
    );
};
export default List;
