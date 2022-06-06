import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./Explore.css";
import { FetchFellows } from "../api/fetch-fellows";
import { Fellow } from "../models";

const Explore = () => {
    const [fellows, setFellows] = useState([]);
    const [load, setLoad] = useState(false);

    async function fetchFellows() {
        // @ts-ignore
        FetchFellows()
            .then(fetchedFellows => setFellows(fetchedFellows))
            .finally(() => {
            })
    }

    if (!load) {
        fetchFellows().then(() => console.log(fellows))
        setLoad(true)
    }

    // @ts-ignore
    return (
        <div>
            <div className="flex-row">
                <Grid container alignItems="center" style={{width: "90%"}}>
                    {Array(fellows.length).fill(0).map((e, i) => (
                        <Grid item md={4} sm={6} xs={12}>
                            <div className="card">
                                <Grid container alignItems="center">
                                    <Grid item lg={6} xs={12}>
                                        <div>
                                            <img src="./images/sample profile pic.jpg" className="profilepic"
                                                 alt="sample profile picture"/>
                                            <h5>{fellows[i].description}</h5>
                                        </div>
                                    </Grid>
                                    <Grid item lg={6} xs={12} justifyContent="center" alignItems="center">
                                        <div>
                                            <h2>{fellows[i].name}</h2>
                                            <h5>{fellows[i].username}</h5>
                                        </div>
                                        {/* <Link className="nav-link" to={"/profile/" + fellows[i].publicKey}>
                                            <Button variant="contained" color="error">Profile</Button>
                                        </Link> */}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Explore; 