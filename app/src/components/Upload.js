import React,{ useState } from "react";
const axios = require('axios').default;

export default function Upload() {

    const [github, setGithub] = useState("");
    const [image, setImage] = useState(null)

    const submitForm = (event) => {
        event.preventDefault();
        const username = github
        axios.get(`https://api.github.com/users/${username}/orgs`)
         .then(function (response) {
         // handle success
           console.log(response);
           function verifyOrg(org) {
             return org.login === "MLH-Fellowship"
           }
            if (response.data.some(verifyOrg)) {
              console.log("You're in!")
              // Redirect to the nft page
            }
            else {
              console.log("You're not in!")
              // Alert message that they are not a mlh fellow
            }
         })
         .catch(function (error) {
         // handle error
           console.log(error);
           // Error that an account does not exist
         })
         .then(function () {
        // always executed, which could be a redirect to the homepage
        });
        console.log(github)
    }
    return (
        <form>
            <input 
                type="text"
                placeholder="Github Username"
                value = {github}
                onChange={(e)=> setGithub(e.target.value)}
            />
            <br/>
            <label>
            <input type="file"/>
            <span>+</span>
            </label>
            <br/>
            <button onClick={submitForm}>Submit</button>
        </form>
    )
}