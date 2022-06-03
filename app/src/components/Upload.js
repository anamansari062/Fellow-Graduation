import React,{ useState } from "react";

export default function Upload() {

    const [github, setGithub] = useState("");
    const [image, setImage] = useState(null)

    const submitForm = () => {}
    return (
        <form>
            <input 
                type="text"
                value={github}
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