import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AllBooks, ADD_MESSAGE, AllMessages } from "./Queries";
// import Aes from "crypto-js/aes";
// import enc from "crypto-js/enc-utf8";
const { SodiumPlus, CryptographyKey } = require("sodium-plus");
const Uint8Array_to_String = (typedArray) => {
    const arr = Array.from // if available
        ? Array.from(typedArray) // use Array#from
        : [].map.call(typedArray, (v) => v); // otherwise map()
    // now stringify
    const str = JSON.stringify(arr);
    return str;
};
const String_to_Uint8Array = (string) => {
    const retrievedArr = JSON.parse(string);
    const retrievedTypedArray = new Uint8Array(retrievedArr);
    return retrievedTypedArray;
};
const List = (props) => {
    // const
    // const { loading, error, data } = useQuery(AllBooks);
    const { loading, error, data } = useQuery(AllMessages);
    const [addMessage, { dataM }] = useMutation(ADD_MESSAGE);
    // const ar = data && data.books ? data.books : [];
    //===============
    async function encrypt() {
        // Select a backend automatically
        let sodium = await SodiumPlus.auto();
        let key1 = await sodium.crypto_secretbox_keygen();
        console.log(key1);
        // let nonce = await sodium.randombytes_buf(24);
        // const keyBuffer = key.getBuffer();
        let message = "Whatsup boiz?";
        // Message can be a string, buffer, array, etc.

        // let ciphertext = await sodium.crypto_secretbox(message, nonce, key);
        const dataLocal = JSON.parse(window.localStorage.getItem("data"));
        console.log(dataLocal);
        console.log(data.messages[0].note);
        const key = new CryptographyKey(Buffer(String_to_Uint8Array(dataLocal.key)));
        console.log(key);
        let decrypted = await sodium.crypto_secretbox_open(
            String_to_Uint8Array(data.messages[0].note),
            String_to_Uint8Array(dataLocal.nonce),
            key
        );
        console.log(decrypted.toString("utf-8"));
        // window.localStorage.setItem("data", JSON.stringify(data));
        // const note = Uint8Array_to_String(ciphertext);
        // addMessage({
        //     variables: {
        //         note: note,
        //     },
        // });
        // console.log(dataM);

        // let ans = await sodium.crypto_secretbox_open(arr, nonce, key);
        // console.log(key);
        // const retrKey = new CryptographyKey(keyBuffer);
        // // console.log(nonce);
        // // console.log(nonce);

        // // console.log(ciphertext);
        // let strToDB = Uint8Array_to_String(nonce);
        // console.log(strToDB);
    }

    // const encryptedAES = Aes.encrypt("Whats'up bro?", "tanvesh01");
    // console.log(encryptedAES);
    // const decrypted = Aes.decrypt(encryptedAES, "tanvesh01");
    // console.log(decrypted);
    // const plaintext = decrypted.toString(enc);
    // console.log(plaintext);
    console.log(data);
    return (
        <div>
            <ol>
                <li>
                    <h5 onClick={() => encrypt()}>Tanvesh!</h5>
                </li>
                {/* {ar.map((e) => {
                    return (
                        <li onClick={() => props.handle(e.id)} key={e.id}>
                            <h6>{e.name}</h6>
                        </li>
                    );
                })} */}
            </ol>
        </div>
    );
};
export default List;
