import React, { useState, useEffect } from "react";


//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from "@material-ui/core";

//icons to show & hide th password
import { Visibility, VisibilityOff } from "@material-ui/icons";

// //for validation
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";

const ForgotPassword = (props) => {

    //---------------------local state ----------------------
    const [showPassword, setshowPassword] = useState(false);
    const [otp, setotp] = useState("")
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isloading, setisloading] = useState("");

    //errors
    const [otpError, setotpError] = useState(false)
    const [emailError, setemailError] = useState(false);
    const [emailMatchError, setemailMatchError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);

    const LoginDetail = () => {

        if (!blankValidator(otp)) {
            setotpError(true);
            return;
        }
        if (!blankValidator(email)) {
            setemailError(true);
            return;
        }
        if (!emailValidator(email)) {
            setemailMatchError(true);
            return;
        }
        if (!blankValidator(password)) {
            setpasswordError(true);
            return;
        }

    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="Login_Main_div content_padding">
                <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                    <p className="page_heading mt-3">Forgot Passsword</p>
                    <div className="main_padding_top_bottom">
                        <div>
                            <TextField
                                placeholder="Email OTP"
                                id="outlined-basic"
                                variant="outlined"
                                autoComplete="off"
                                value={otp}
                                onChange={(e) => {
                                    setotpError(false)
                                    setotp(e.target.value)
                                }}
                            />
                            {otpError && (
                                <span className="text-danger float-left">Enter the OTP</span>
                            )}
                        </div>
                        <div className="mt-2">
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

                        <div className="mt-2">
                            <FormControl className="MuiFormControl-fullWidth" variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => {
                                        setpasswordError(false)
                                        setpassword(e.target.value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setshowPassword(!showPassword)}
                                                onMouseDown={(event) => event.preventDefault()}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {passwordError && (
                                <span className="text-danger float-left">Enter the Password</span>
                            )}
                        </div>

                        <div className="inputfiledformatting mt-3">
                            <Button
                                variant="contained"
                                className="Login_page_button"
                                onClick={LoginDetail}

                            >
                                Log in
                            </Button>
                        </div>

                    </div>
                </Card>
            </div>

            <Loder loading={isloading} />
        </>
    );
};

export default ForgotPassword;
