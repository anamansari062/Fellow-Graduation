import React, { useState, useEffect, ref } from "react";
import axios from "axios";
import "./FellowCard.css";
import { FetchFellows } from "../api/fetch-fellows";

// const posts = ref([])
// const loading = ref(true)
// FetchFellows()
//     .then(fetchedPosts => posts.value = fetchedPosts)
//     .finally(() => loading.value = false)

// const addPost = post => posts.value.push(post)

const FellowCard = () => {
  const [profileName, setProfileName] = useState("");
  const [profileCell, setProfileCell] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileEmail, setProfileEmail] = useState("");



const profileData = async () => {
  try{
      const res = await axios.get("https://randomuser.me/api/");
      setProfileCell(res.data.results[0].cell);
      setProfileEmail(res.data.results[0].email);
      setProfileImage(res.data.results[0].picture.large);
      setProfileName(
        `${res.data.results[0].name.first} ${res.data.results[0].name.last}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <div>
        <img src={profileImage} style={{ width: "100%" }} />
        <h1>{profileName}</h1>
        <p className="title">{profileEmail}</p>
        <p>{profileCell}</p>
        <p>
          <button>Contact</button>
        </p>
    </div>
  );
};

export default FellowCard;