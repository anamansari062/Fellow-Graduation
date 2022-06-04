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
            }
            else {
              console.log("You're not in!")
            }
         })
         .catch(function (error) {
         // handle error
           console.log(error);
         })
         .then(function () {
        // always executed
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