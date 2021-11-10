import React, { useState, useEffect } from "react";


//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField } from "@material-ui/core";


// //for validation
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";

const EmailVerify = (props) => {

    //---------------------local state ----------------------
    const [email, setemail] = useState("");
    const [isloading, setisloading] = useState("");

    //errors
    const [emailError, setemailError] = useState(false);
    const [emailMatchError, setemailMatchError] = useState(false);


    const VefiyEmail = () => {
        props.history.push("/forgot-password")
        // if (!blankValidator(email)) {
        //     setemailError(true);
        //     return;
        // }
        // if (!emailValidator(email)) {
        //     setemailMatchError(true);
        //     return;
        // }


    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="Login_Main_div content_padding">
                <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                    <p className="page_heading mt-3">Verify Email</p>
                    <div className="main_padding_top_bottom">
                        <div>
                            <TextField
                                placeholder="Email Address"
                                id="outlined-basic"
                                variant="outlined"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => {
                                    setemailError(false)
                                    setemailMatchError(false)
                                    setemail(e.target.value)
                                }}
                            />
                            {emailError && (
                                <span className="text-danger float-left">Enter the Email Address</span>
                            )}
                            {emailMatchError && (
                                <span className="text-danger float-left">Enter the Correct Email Address</span>
                            )}
                        </div>


                        <div className="inputfiledformatting mt-5">
                            <Button
                                variant="contained"
                                className="Login_page_button"
                                onClick={VefiyEmail}
                            >
                                Verify
                            </Button>
                        </div>

                    </div>
                </Card>
            </div>

            <Loder loading={isloading} />
        </>
    );
};

export default EmailVerify;
