import React, { useState, useEffect } from 'react'
import { Grid, Card, Button } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Auction.css";

function Auction() {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [Name, setName] = useState("");
    const [Time, setTime] = useState("");
    const [TimetoSee, setTimetoSee] = useState("");
    const [AuctionDataArr, setAuctionDataArr] = useState([])
    const [sizeArr, setsizeArr] = useState([])
    const [Size, setSize] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const EnterSizeintoArr = () => {
        sizeArr.push({
            size: Size
        });
        setsizeArr([...sizeArr]);
        setSize("")
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
                                                            <i class="fa fa-times cursor"></i>
                                                        </span>
                                                    </div>
                                                    <div className="text_filed_heading">
                                                        Name
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Bids"
                                                            autoComplete="off"
                                                            value={Name}
                                                            onChange={(e) => {
                                                                setName(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Image
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
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
                                                        <Grid item md={5}>
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
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (e.target.value === '' || re.test(e.target.value)) {
                                                                            setSize(e.target.value);
                                                                        }
                                                                    }}
                                                                />
                                                                <div className="d-flex p-2">
                                                                    <span>Enter Sizes:</span>
                                                                    {sizeArr.length > 0 ? (sizeArr.map((data, index) => (
                                                                        <span>
                                                                            {data.size},{" "}
                                                                        </span>
                                                                    ))) : (
                                                                        <span>No Data</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item md={1}>
                                                            <div className="mt-4 pt-1 ">
                                                                <Button
                                                                    variant="contained"
                                                                    className="button_formatting"
                                                                    onClick={EnterSizeintoArr}
                                                                >
                                                                    <i class="fa fa-plus mr-2" /> Add
                                                                </Button>
                                                            </div>

                                                        </Grid>
                                                    </Grid>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={() => {

                                                            AuctionDataArr.push({
                                                                name: Name,
                                                                time: Time,
                                                                size: sizeArr

                                                            });
                                                            setAuctionDataArr([...AuctionDataArr]);
                                                            console.log("arr:::", AuctionDataArr);
                                                            setName("");
                                                            setsizeArr([]);
                                                            setTimetoSee("");
                                                            setTime("");
                                                        }}
                                                    >
                                                        Create
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
                            <div className="d-flex justify-content-between">
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

                            </div>
                            <hr />
                            {AuctionDataArr.length > 0 ?
                                (AuctionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="d-flex justify-content-between">
                                                    <div className=" p-2">
                                                        {item.name}
                                                    </div>

                                                    <div className=" p-2">
                                                        {item.time}
                                                    </div>

                                                    <div className=" p-2">
                                                        {item.size.map((data, index) => (
                                                            <span>
                                                                {data.size},{" "}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {" "}
                                                    <div className="d-flex p-2">

                                                        <span className="icon_color mr-2 ml-1">
                                                            <i
                                                                className="fa fa-pencil hover_cursor"

                                                            ></i>
                                                        </span>
                                                        <span className="icon_color ml-2">
                                                            <i
                                                                className="fa fa-trash hover_cursor"
                                                                onClick={() => {
                                                                    AuctionDataArr.splice(index, 1);
                                                                    setAuctionDataArr([...AuctionDataArr]);
                                                                }}
                                                            ></i>
                                                        </span>

                                                    </div>

                                                </div>
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

        </>
    )
}

export default HOC(Auction)
