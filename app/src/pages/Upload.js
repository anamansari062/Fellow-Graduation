import React,{ useState, useMemo } from "react";
import './Upload.css';
import { SendFellow } from '../api/send-fellow'
// import { useHistory } from "react-router-dom";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import get_provider from '../api/getProvider';
import Context from '../components/Context';

const axios = require('axios').default;


const Profile = () => {
    return (
    <Context>
        <Content/>
        </Context>
    );
};
export default Profile;



const Content = () => {


  // const history = useHistory();

  const initialValues = { name: "", github: "", pod: "", pname:"", proj:"", plink:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const wallet = useAnchorWallet()
  const provider = get_provider(wallet)

    // const [github, setGithub] = useState("");
    // const [image, setImage] = useState(null)

    const submitForm = (event) => {

      console.log(formValues.github)
        event.preventDefault();
        const username = formValues.github
        axios.get(`https://api.github.com/users/${username}/orgs`)
         .then(function (response) {
         // handle success
           console.log(response);
            function verifyOrg(org) {
             return org.login === "MLH-Fellowship"
           }
            if (response.data.some(verifyOrg)) {
              console.log("You're in!")
              const fellow = SendFellow(provider, formValues.name, username, formValues.pod, formValues.pname, formValues.proj, "https: //www.dropbox.com/h?preview=profile.jpeg")
              console.log(fellow)
              // window.location.href="https://opensea.io/collection/mlhfellowship-grads"
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
        console.log(initialValues.github)
    }
    return (
      <div className="login-box">
        
        <form>
          <h2>Upload your NFT here!</h2>
          {/* <div className="ui divider"></div> */}
          {/* <div className="ui form"> */}
            <div className="user-box">
              
            <input 
                type="text"
                placeholder="Name"
                name="name"
                value = {formValues.name}
                onChange={handleChange}
            />
            <label>Name</label>
            <p>{formErrors.name}</p>
            </div>
            <div className="user-box">
              
            <input 
                type="text"
                placeholder="Github"
                name="github"
                value = {formValues.github}
                onChange={handleChange}
            />
            <label>Github</label>
            <p>{formErrors.github}</p>
            </div>
            <div className="user-box">
              
            <input 
                type="text"
                placeholder="Pod Number"
                name="pod"
                value = {formValues.pod}
                onChange={handleChange}
            />
            <label>Pod Number</label>
            <p>{formErrors.pod}</p>
            </div>
            <div className="user-box">
              
            <input 
                type="text"
                placeholder="Pod Name"
                name="pname"
                value = {formValues.pname}
                onChange={handleChange}
            />
            <label>Pod Name</label>
            <p>{formErrors.pname}</p>
            </div>
            <div className="user-box">
              
            <input 
                type="text"
                placeholder="Project"
                name="proj"
                value = {formValues.proj}
                onChange={handleChange}
            />
            <label>Project</label>
            <p>{formErrors.proj}</p>
            </div>
            {/* <div className="user-box"> */}
            <label className="file">
            <input type="file"/>
            <span>+</span>
            </label>
            {/* </div> */}
            <br/>
            <button classname="fileButton" onClick={submitForm}>Submit</button>
            {/* </div> */}
        </form>
        </div>
    )
}