import React, { useState, useEffect } from 'react'
import { Grid, Card, Button } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Auction.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import { showNotificationMsz } from "../../../utils/Validation"
import Loder from "../../../Loder/Loder"

function Auction() {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [Name, setName] = useState("");
    const [Time, setTime] = useState("");
    const [TimetoSee, setTimetoSee] = useState("");
    const [AuctionDataArr, setAuctionDataArr] = useState([]);
    const [description, setdescription] = useState("")
    const [Size, setSize] = useState("")
    const [profile, setprofile] = useState(null);
    const [isUpdated, setisUpdated] = useState(false)
    const [isloading, setisloading] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of subscription
        const getAuctionData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getProduct";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            console.log("get data", res)
                            setAuctionDataArr(res.data)
                            setisloading(false)
                        },
                        (error) => {
                            setisloading(false)
                            console.log("Error", error)
                        }
                    )
            } catch (error) {
                setisloading(false)
                console.log("Error", error)
            }
        }
        getAuctionData();
    }, [isUpdated])

    const CreateAuction = () => {
        try {
            setisloading(true)
            let url = getBaseUrl() + "addProduct";
            const fd = new FormData();
            fd.append('productName', Name)
            fd.append('description', description)
            fd.append("size", Size)
            fd.append("time", Time)

            //********* HERE IS THE CHANGE ***********
            for (let i = 0; i < profile.length; i++) {
                fd.append('myField', profile[i]);
            }
            console.log(fd.get('myField'));
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                    },
                    (error) => {
                        showNotificationMsz(error, "danger")
                        setisloading(false)
                    }
                )
        } catch (error) {
            showNotificationMsz(error, "danger")
            setisloading(false)
        }
    }

    //to delete the auction

    const DeleteAuction = (data) => {
        //auction id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteProduct/${id}`;
            axios
                .get(url)
                .then(
                    (res) => {
                        setisloading(false)
                        setisUpdated(!isUpdated)
                        showNotificationMsz(res.data.msg, "success")
                    },
                    (error) => {
                        showNotificationMsz(error, "danger")
                        setisloading(false)
                    }
                )
        } catch (error) {
            showNotificationMsz(error, "danger")
            setisloading(false)
        }
    }

    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Auctions</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Auctions</strong>
                                    </span>
                                </div>
                            ) : (
                                <Expand open={addMangeopen}>
                                    <Card className=" mb-2 Card_shadow">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="card_content_instition">
                                                    <div
                                                        className="text-right"
                                                        onClick={() => setaddMangeopen(!addMangeopen)}
                                                    >
                                                        <span className="icon_color">
                                                            <i class="fa fa-times hover_cursor"></i>
                                                        </span>
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Name of Bids"
                                                            autoComplete="off"
                                                            value={Name}
                                                            onChange={(e) => {
                                                                setName(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Description
                                                    </div>
                                                    <div className=" mt-1">
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="Enter Description"
                                                            value={description}
                                                            onChange={(e) => {
                                                                setdescription(e.target.value)
                                                            }}
                                                        ></textarea>

                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            multiple
                                                            onChange={(e) => {
                                                                setprofile(e.target.files)
                                                            }}
                                                        />
                                                    </div>


                                                    <Grid className="Component_main_grid">
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Time
                                                            </div>
                                                            <div className=" mr-2 mt-1">
                                                                <input
                                                                    type="time"
                                                                    className="form-control "
                                                                    autoComplete="off"
                                                                    value={TimetoSee}
                                                                    onChange={(e) => {
                                                                        setTimetoSee(e.target.value)
                                                                        let timeSplit = e.target.value.split(':'),
                                                                            hours, minutes, meridian;

                                                                        hours = timeSplit[0];
                                                                        minutes = timeSplit[1];
                                                                        if (hours > 12) {
                                                                            meridian = 'PM';
                                                                            hours -= 12;
                                                                        } else if (hours < 12) {
                                                                            meridian = 'AM';
                                                                            if (hours === 0) {
                                                                                hours = 12;
                                                                            }
                                                                        } else {
                                                                            meridian = 'PM';
                                                                        }
                                                                        setTime(hours + ':' + minutes + ' ' + meridian)
                                                                    }}
                                                                />
                                                            </div>

                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Size
                                                            </div>
                                                            <div className=" mt-1 mr-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter available Sizes"
                                                                    className="form-control "
                                                                    autoComplete="off"
                                                                    value={Size}
                                                                    onChange={(e) => {
                                                                            setSize(e.target.value);      
                                                                    }}
                                                                />
                                                            </div>
                                                        </Grid>

                                                    </Grid>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={CreateAuction}
                                                    >
                                                        Create Auction
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Expand>
                            )}
                        </div>
                    </div>

                    <div className="card_admissiondetails_height mt-4">
                        <div className="textfiled_margin cardheight_overflow">
                            {/* <div className="d-flex justify-content-between">
                                <div className=" mt-1 mb-1">
                                    <strong>Name</strong>
                                </div>

                                <div className=" mt-1 mb-1">
                                    <strong>Time</strong>
                                </div>

                                <div className=" mt-1 mb-1">
                                    <strong>Available Sizes</strong>
                                </div>

                                {" "}
                                <div className="p-2">
                                    <strong>Action</strong>
                                </div>

                            </div> */}
                            <hr />
                            {AuctionDataArr.length > 0 ?
                                (AuctionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    {item.image.map((data, index) => (
                                                        <Grid item md={1} className="p-2">
                                                            <img src={`https://shrouded-earth-24953.herokuapp.com/${data.path}`} alt="" style={{ width: "60px", height: "40px" }} />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={3}>
                                                        <div className=" p-2">
                                                            {item.productName}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <div className=" p-2">
                                                            {item.time}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className="p-2">
                                                            {item.description}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={2}>
                                                        <div className="d-flex p-2">

                                                            <span className="icon_color mr-2 ml-1">
                                                                <i
                                                                    className="fa fa-pencil hover_cursor"

                                                                ></i>
                                                            </span>
                                                            <span className="icon_color ml-2">
                                                                <i
                                                                    className="fa fa-trash hover_cursor"
                                                                    onClick={() => DeleteAuction(item)}
                                                                ></i>
                                                            </span>

                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Card>
                                )))
                                : (
                                    <span>No Data</span>
                                )}

                        </div>
                    </div>
                </Card>
            </div >
            <Loder loading={isloading} />
        </>
    )
}

export default HOC(Auction)
