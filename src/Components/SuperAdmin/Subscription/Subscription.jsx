import React, { useState, useEffect } from 'react'
import {  Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

function Subscription() {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [bids, setbids] = useState("");
    const [price, setprice] = useState("");
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editbids, setEditbids] = useState("");
    const [Editprice, setEditprice] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const OpenEditDailog = (data) => {
        setEditbids(data.bids);
        setEditprice(data.price);
        setEditDailogOpen(!EditDailogOpen)
    }
    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Subscription</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    <div className="card_admissiondetails_height">
                        <div className="textfiled_margin">
                            {!addMangeopen ? (
                                <div className="d-flex">
                                    <span className="icon_color">
                                        <i className="fa fa-plus-circle"></i>
                                    </span>
                                    <span className="mt-1 ml-2 addmanageuserfont hover_cursor" onClick={() => setaddMangeopen(!addMangeopen)}>
                                        <strong> Add New Subscription</strong>
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
                                                        Number of Bids
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Bids"
                                                            autoComplete="off"
                                                            value={bids}
                                                            onChange={(e) => {
                                                                const re = /^[0-9\b]+$/;
                                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                                    setbids(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">
                                                        Price
                                                    </div>
                                                    <div className=" mt-1">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Price"
                                                            autoComplete="off"
                                                            value={price}
                                                            onChange={(e) => {
                                                                const re = /^[0-9\b]+$/;
                                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                                    setprice(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={() => {
                                                            if (bids === "") {
                                                                alert("Enter the Number of Bids");
                                                                return;
                                                            }
                                                            if (price === "") {
                                                                alert("Enter Price");
                                                                return;
                                                            }
                                                            SubscriptionDataArr.push({
                                                                bids: bids,
                                                                price: price,
                                                                show: true,
                                                            });
                                                            setSubscriptionDataArr([...SubscriptionDataArr]);
                                                            setbids("");
                                                            setprice("");
                                                            setaddMangeopen(!addMangeopen)
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
                            {/* <div className="d-flex justify-content-between">
                                <div className=" mt-1 mb-1">
                                    <strong> Numbers of Bids</strong>
                                </div>

                                <div className=" mt-1 mb-1">
                                    <strong> Price</strong>
                                </div>

                                {" "}
                                <div className="p-2">
                                    <strong> Action</strong>
                                </div>

                            </div> */}
                            <hr />
                            {SubscriptionDataArr.length > 0 ?
                                (SubscriptionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <div className="d-flex justify-content-between">

                                                    <div className=" p-2">
                                                        {item.bids}
                                                    </div>

                                                    <div className=" p-2">
                                                        {item.price}
                                                    </div>

                                                    {" "}
                                                    <div className="d-flex p-2">

                                                        <span className="icon_color mr-2 ml-1">
                                                            <i
                                                                className="fa fa-pencil hover_cursor"
                                                                onClick={() => OpenEditDailog(item)}
                                                            ></i>
                                                        </span>
                                                        <span className="icon_color ml-2">
                                                            <i
                                                                className="fa fa-trash hover_cursor"
                                                                onClick={() => {
                                                                    SubscriptionDataArr.splice(index, 1);
                                                                    setSubscriptionDataArr([...SubscriptionDataArr]);
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
            </div>

            <Dialog
                open={EditDailogOpen}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="fullWidth"
            >
                <DialogTitle>
                    Edit Subscription
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
                            placeholder="Enter Bids"
                            autoComplete="off"
                            value={Editbids}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setEditbids(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <div className="text_filed_heading">
                        Price
                    </div>
                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Price"
                            autoComplete="off"
                            value={Editprice}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setEditprice(e.target.value);
                                }
                            }}
                        />
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
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default HOC(Subscription)
