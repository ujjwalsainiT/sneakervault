import React, { useState, useEffect } from "react";

//css file
import "./Login.css";

//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from "@material-ui/core";

//icons to show & hide th password
import { Visibility, VisibilityOff } from "@material-ui/icons";

// //for validation
// import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

// import axios from "axios";

const Login = (props) => {

    //---------------------local state ----------------------
    const [showPassword, setshowPassword] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")

    //errors
    const [emailError, setemailError] = useState(false);
    const [emailMatchError, setemailMatchError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);

    const LoginDetail = () => {
        props.history.push("/home")
        // if (!blankValidator(email)) {
        //     setemailError(true);
        //     return;
        // }
        // if (!emailValidator(email)) {
        //     setemailMatchError(true);
        //     return;
        // }
        // if (!blankValidator(password)) {
        //     setpasswordError(true);
        //     return;
        // }
        // let url = "https://shrouded-earth-24953.herokuapp.com/login";
        // let temp = {
        //     email,
        //     password
        // };
        // axios
        //     .post(url, temp)
        //     .then(
        //         (res) => {
        //             console.log("data response:::", res)
        //             // if (res.data.success === 0) {
        //             //     showNotificationMsz(res.data.message, "danger")
        //             //     return
        //             // } else {
        //             //     showNotificationMsz(res.data.message, "success")
        //             //     console.log("id:::", res.data.id)
        //             //     // localStorage.setItem("UserId", res.data.id);
        //             //     props.history.push("/home")
        //             // }
        //         },

        //         (error) => {

        //             showNotificationMsz(`${error}`, "danger")
        //             console.log("data response error:::", error)
        //         }
        //     )
        //     .catch((e) => {
        //         showNotificationMsz(`${e}`, "danger")
        //         console.log("data response error:::", e)
        //     });
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="Login_Main_div content_padding">
                <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                    <p className="page_heading mt-3">Login</p>
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

                        <div className="inputfiledformatting mt-5 mb-5">
                            <Button
                                variant="contained"
                                className="Login_page_button"
                                onClick={LoginDetail}
                            // onClick={() => props.history.push("/home")}
                            >
                                Log in
                            </Button>
                        </div>

                    </div>
                </Card>


            </div>

        </>
    );
};

export default Login;
