import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';

//common header
import HOC from "../../../Common/HOC";


//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import { blankValidator, showNotificationMsz } from "../../../utils/Validation"
import Loder from "../../../Loder/Loder"

function BidPrice() {

    //local state
    const [price, setprice] = useState("");
    const [BidPriceData, setBidPriceData] = useState([])
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editprice, setEditprice] = useState("")
    const [EditId, setEditId] = useState("")
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    //error
    const [priceError, setpriceError] = useState(false);
    const [EditPriceError, setEditPriceError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of subscription
        const getBidPrice = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "getBidDetail";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            setBidPriceData(res.data)
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
        getBidPrice();

    }, [isUpdated])


    //getting and set edit feilds
    const OpenEditDailog = (data) => {
        setEditprice(data.bid)
        setEditId(data._id)
        setEditDailogOpen(!EditDailogOpen)
    }


    const CreateBidPrice = () => {
        try {
            if (!blankValidator(price)) {
                setpriceError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + "addBid";
            let temp = {
                bid: price
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
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

    const UpdateBidPrice = (ID) => {
        let id = ID
        try {
            if (!blankValidator(Editprice)) {
                setEditPriceError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + `updateBid/${id}`;
            let temp = {
                bid: Editprice
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setisUpdated(!isUpdated)
                        setisloading(false)
                        setEditDailogOpen(!EditDailogOpen)
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

    //to delete the Bid Price

    const DeletebidPrice = (data) => {
        //bidPrice id
        let id = data._id
        try {
            setisloading(true)
            let url = getBaseUrl() + `deleteBid/${id}`;
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

                <div className="mb-3 page_heading">Manage Bid Price</div>
                <Card className="pt-3 pb-4 Card_shadow">
                    {BidPriceData.length === 0 && (
                        <div className="card_admissiondetails_height">
                            <div className="textfiled_margin">
                                <div className="card_content_instition">
                                    <div className="text_filed_heading">
                                        Enter Bid Price
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
                                            <span className="texr-danger">Enter the Price</span>
                                        )}
                                    </div>

                                </div>
                                <div className="mt-2 pb-2 ">
                                    <Button
                                        variant="contained"
                                        className="button_formatting"
                                        onClick={CreateBidPrice}
                                    >
                                        Submit
                                    </Button>
                                </div>


                            </div>
                        </div>
                    )}
                    <div className="card_admissiondetails_height mt-4">
                        <div className="textfiled_margin cardheight_overflow">

                            <hr />
                            {BidPriceData.length > 0 ?
                                (BidPriceData.map((item, index) => (
                                    <Card className="Card_shadow mb-2 mt-2">
                                        <div className="card_admissiondetails_height">
                                            <div className="textfiled_margin">
                                                <Grid className="Component_main_grid mt-2">
                                                    <Grid item md={8}>
                                                        <div className=" p-2">
                                                            {item.bid}
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
                                                                    onClick={() => DeletebidPrice(item)}
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
                    Edit Bidd Price
                    <span
                        className="float-right icon_color"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>


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
                        onClick={() => UpdateBidPrice(EditId)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(BidPrice)
