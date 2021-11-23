import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

import "./Subscription.css";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import { blankValidator, showNotificationMsz } from "../../../utils/Validation"
import Loder from "../../../Loder/Loder"

function Subscription() {

    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [bids, setbids] = useState("");
    const [price, setprice] = useState("");
    const [SubscriptionDataArr, setSubscriptionDataArr] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editbids, setEditbids] = useState("");
    const [Editprice, setEditprice] = useState("")
    const [EditId, setEditId] = useState("")
    const [isUpdated, setisUpdated] = useState(false)
    const [isloading, setisloading] = useState(false)


    //error
    const [bidError, setbidError] = useState(false);
    const [priceError, setpriceError] = useState(false);
    const [EditBidError, setEditBidError] = useState(false);
    const [EditPriceError, setEditPriceError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of subscription
        const getSubscriptionData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "subscriptionDetail";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setSubscriptionDataArr(res.data)
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
        getSubscriptionData();
    }, [isUpdated])


    //getting and set edit feilds
    const OpenEditDailog = (data) => {
        setEditbids(data.bidno);
        setEditprice(data.price);
        setEditId(data._id);
        setEditDailogOpen(!EditDailogOpen)
    }


    //ceate subscription
    const CreateSubscription = () => {
        try {

            if (!blankValidator(bids)) {
                setbidError(true);
                return;
            }
            if (!blankValidator(price)) {
                setpriceError(true);
                return;
            }
            setisloading(true)
            let url = getBaseUrl() + "addSubscription";
            let temp = {
                bidno: bids,
                price: price
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setaddMangeopen(!addMangeopen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setbids("");
                        setprice("");
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

    //To Update the data of Subscription

    const updateSubscriptiondata = (ID) => {
        //Subscription id
        let id = ID
        try {
            if (!blankValidator(Editbids)) {
                setEditBidError(true);
                return
            }
            if (!blankValidator(Editprice)) {
                setEditPriceError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + `updateSubscription/${id}`;
            let temp = {
                bidno: Editbids,
                price: Editprice
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setEditDailogOpen(!EditDailogOpen)
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditbids("");
                        setEditprice("");
                        setEditId("");
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


    //to delete the Subscription

    const DeleteSubscription = (data) => {
        //Subscription id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteSubscription/${id}`;
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
                                                      
                                                    >
                                                        <span className="icon_color"  onClick={() => setaddMangeopen(!addMangeopen)}>
                                                            <i class="fa fa-times hover_cursor"></i>
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
                                                                setbidError(false)
                                                                const re = /^[0-9\b]+$/;
                                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                                    setbids(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                        {bidError && (
                                                            <span className="text-danger">Enter the Bids</span>
                                                        )}
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
                                                                setpriceError(false)
                                                                const re = /^[0-9\b]+$/;
                                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                                    setprice(e.target.value);
                                                                }
                                                            }}
                                                        />
                                                        {priceError && (
                                                            <span className="text-danger">Enter the Price</span>
                                                        )}
                                                    </div>

                                                </div>
                                                <div className="mt-2 pb-2 ">
                                                    <Button
                                                        variant="contained"
                                                        className="button_formatting"
                                                        onClick={CreateSubscription}
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
                            {SubscriptionDataArr.length > 0 ?
                                (SubscriptionDataArr.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={4}>
                                                        <div className=" p-2">
                                                            {item.bidno}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <div className=" p-2">
                                                            {item.price}
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
                                                                    onClick={() => DeleteSubscription(item)}
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
                                setEditBidError(false)
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setEditbids(e.target.value);
                                }
                            }}
                        />
                        {EditBidError && (
                            <span className="text-danger">Enter the bids</span>
                        )}
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
                                setEditPriceError(false)
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setEditprice(e.target.value);
                                }
                            }}
                        />
                        {EditPriceError && (
                            <span className="text-danger">Enter the Price</span>
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
                        onClick={() => updateSubscriptiondata(EditId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(Subscription)
