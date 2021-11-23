import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Reward.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import { blankValidator, showNotificationMsz } from "../../../utils/Validation"
import Loder from "../../../Loder/Loder"

function FreeAuction() {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [point, setpoint] = useState("");
    const [day, setday] = useState("")
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [AuctionDataArr, setAuctionDataArr] = useState([])
    const [EditPoint, setEditPoint] = useState("");
    const [Editday, setEditday] = useState("")
    const [EditId, setEditId] = useState("")

    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    //error
    const [pointError, setpointError] = useState(false);
    const [dayError, setdayError] = useState(false)
    const [EditpointError, setEditpointError] = useState(false);
    const [EditdayError, setEditdayError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of subscription
        const getFreeAuctionData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getFreeAuction";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            console.log("res", res)
                            setAuctionDataArr(res.data.data)
                            setisloading(false)
                        },
                        (error) => {
                            setisloading(false)
                            showNotificationMsz(error, "danger")
                        }
                    )
            } catch (error) {
                setisloading(false)
                showNotificationMsz(error, "danger")
            }
        }
        getFreeAuctionData();
    }, [isUpdated])


    //getting and set edit feilds
    const OpenEditDailog = (data) => {
        setEditday(data.day)
        setEditPoint(data.points)
        setEditId(data._id)
        setEditDailogOpen(!EditDailogOpen)
    }


    //to add free auction
    const CreateAuction = () => {
        try {

            if (!blankValidator(point)) {
                setpointError(true);
                return;
            }
            if (!blankValidator(day)) {
                setdayError(true);
                return;
            }

            setisloading(true)
            let url = getBaseUrl() + "addFreeAuction";
            let temp = {
                points: point,
                day: day
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setpoint("");
                        setday("")
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


    //to edit free auction
    const EditAuction = (ID) => {
        let id = ID;
        try {
            if (!blankValidator(EditPoint)) {
                setEditpointError(true);
                return;
            }
            if (!blankValidator(Editday)) {
                setEditdayError(true);
                return;
            }

            setisloading(true)
            let url = getBaseUrl() + `updateFreeAuction/${id}`;
            let temp = {
                points: EditPoint,
                day: Editday
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditPoint("");
                        setEditday("");
                        setEditId("");
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
            let url = getBaseUrl() + `deleteFreeAuction/${id}`;
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

                <div className="mb-3 page_heading">Manage Free Auction</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Free auction</strong>
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
                                                    >
                                                        <span className="icon_color" onClick={() => setaddMangeopen(!addMangeopen)}>
                                                            <i class="fa fa-times hover_cursor"></i>
                                                        </span>
                                                    </div>

                                                    <Grid className="Component_main_grid">
                                                        <Grid item md={6}>

                                                            <div className="text_filed_heading">
                                                                Number of Points
                                                            </div>
                                                            <div className="mr-2 mt-1">
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Points"
                                                                    autoComplete="off"
                                                                    value={point}
                                                                    onChange={(e) => {
                                                                        setpointError(false)
                                                                        setpoint(e.target.value)
                                                                    }}
                                                                />
                                                                {pointError && (
                                                                    <span className="text-danger">Enter the Point</span>
                                                                )}

                                                            </div>
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Day
                                                            </div>
                                                            <div className="mr-2 mt-1">
                                                                <select
                                                                    class="form-control"
                                                                    value={day}
                                                                    onChange={(e) => {
                                                                        setdayError(false)
                                                                        setday(e.target.value)
                                                                    }}
                                                                >
                                                                    <option Value="">Select the Day</option>
                                                                    <option value="Monday">Monday</option>
                                                                    <option value="Tuesday">Tuesday</option>
                                                                    <option value="Wednesday">Wednesday</option>
                                                                    <option value="Thrusday">Thrusday</option>
                                                                    <option value="Friday">Friday</option>
                                                                    <option value="Saturday">Saturday</option>
                                                                    <option value="Sunday">Sunday</option>
                                                                </select>
                                                                {dayError && (
                                                                    <span className="text-danger">Select the Day</span>
                                                                )}
                                                            </div>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="Component_main_grid">
                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Name
                                                            </div>
                                                            <div className=" mr-2  mt-1">
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Name of Bids"
                                                                    autoComplete="off"

                                                                />

                                                            </div>
                                                        </Grid>

                                                        <Grid item md={6}>
                                                            <div className="text_filed_heading">
                                                                Date
                                                            </div>
                                                            <div className=" mr-2  mt-1">
                                                                <input
                                                                    type="date"
                                                                    className="form-control "
                                                                    autoComplete="off"

                                                                />

                                                            </div>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="text_filed_heading">
                                                        Description
                                                    </div>
                                                    <div className="mr-2 mt-1">
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="Enter Description"

                                                        ></textarea>

                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Image
                                                    </div>
                                                    <div className="mr-2 mt-1">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            multiple
                                                            accept="image/*"

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
                                                                // value={TimetoSee}
                                                                // onChange={(e) => {
                                                                //     setTimetoSee(e.target.value)
                                                                //     let timeSplit = e.target.value.split(':'),
                                                                //         hours, minutes, meridian;

                                                                //     hours = timeSplit[0];
                                                                //     minutes = timeSplit[1];
                                                                //     if (hours > 12) {
                                                                //         meridian = 'PM';
                                                                //         hours -= 12;
                                                                //     } else if (hours < 12) {
                                                                //         meridian = 'AM';
                                                                //         if (hours === 0) {
                                                                //             hours = 12;
                                                                //         }
                                                                //     } else {
                                                                //         meridian = 'PM';
                                                                //     }
                                                                //     setTime(hours + ':' + minutes + ' ' + meridian)
                                                                // }}
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
                           
                            <hr />
                            {AuctionDataArr.length > 0 ?
                                (AuctionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={4}>
                                                        <div className=" p-2">
                                                            {item.points}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className=" p-2">

                                                            {item.day}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className="d-flex p-2">

                                                            <span className="icon_color mr-2 ml-1">
                                                                <i
                                                                    className="fa fa-edit hover_cursor"
                                                                    onClick={() => OpenEditDailog(item)}
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

            <Dialog
                open={EditDailogOpen}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="fullWidth"
            >
                <DialogTitle>
                    Edit Free Auction
                    <span
                        className="float-right icon_color"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <div className="text_filed_heading">
                        Number of Bids
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Points"
                            autoComplete="off"
                            value={EditPoint}
                            onChange={(e) => {
                                setEditpointError(false)
                                setEditPoint(e.target.value)
                            }}

                        />
                        {EditpointError && (
                            <span className="text-danger">Enter the Point</span>
                        )}

                    </div>

                    <div className="text_filed_heading">
                        Price
                    </div>
                    <div className=" mt-1">
                        <select
                            class="form-control"
                            value={Editday}
                            onChange={(e) => {
                                setEditdayError(false)
                                setEditday(e.target.value)
                            }}
                        >
                            <option Value="">Select the Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thrusday">Thrusday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        {EditdayError && (
                            <span className="text-danger">Select the Day</span>
                        )}

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="button_formatting"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="button_formatting"
                        onClick={() => EditAuction(EditId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />

        </>
    )
}

export default HOC(FreeAuction)
