import React, { useState, useEffect } from 'react'
import { Grid, Card, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import Expand from "react-expand-animated";

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
    const [BidPriceData, setBidPriceData] = useState([]);
    const [EditDailogOpen, setEditDailogOpen] = useState(false);
    const [Editprice, setEditprice] = useState("")

    //error
    const [priceError, setpriceError] = useState(false);
    const [EditPriceError, setEditPriceError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])


    //getting and set edit feilds
    const OpenEditDailog = () => {

        setEditDailogOpen(!EditDailogOpen)
    }

    return (
        <>
            <div className="content_padding">

                <div className="mb-3 page_heading">Manage Bid Price</div>
                <Card className="pt-3 pb-4 Card_shadow">
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

                                >
                                    Create
                                </Button>
                            </div>


                        </div>
                    </div>

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

                                                        </div>
                                                    </Grid>

                                                    <Grid item md={4}>
                                                        <div className="d-flex p-2">

                                                            <span className="icon_color mr-2 ml-1">
                                                                <i
                                                                    className="fa fa-edit hover_cursor"
                                                                    onClick={() => OpenEditDailog}
                                                                ></i>
                                                            </span>
                                                            <span className="icon_color ml-2">
                                                                <i
                                                                    className="fa fa-trash hover_cursor"

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

                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default HOC(BidPrice)
