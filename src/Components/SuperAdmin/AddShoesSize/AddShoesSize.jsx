import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Expand from "react-expand-animated";

//common header
import HOC from "../../../Common/HOC";

//for backend call
import axios from "axios";
import { getBaseUrl } from "../../../utils";
import { blankValidator, showNotificationMsz } from "../../../utils/Validation";
import Loder from "../../../Loder/Loder";

function AddShoesSize() {
  //local state
  const [addMangeopen, setaddMangeopen] = useState(false);
  const [showsize, setshowsize] = useState("");
  const [ShoesSizeArr, setShoesSizeArr] = useState([]);
  const [EditDailogOpen, setEditDailogOpen] = useState(false);
  const [EditSize, setEditSize] = useState("");
  const [EditId, setEditId] = useState("");

  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getSubscriptionData = () => {
      try {
        let url = getBaseUrl() + "getShoeSize";
        setisloading(true);
        axios.get(url).then(
          (res) => {
            setShoesSizeArr(res.data.data);
            setisloading(false);
            // console.log("datagetapi", res);
          },
          (error) => {
            setisloading(false);
            showNotificationMsz(error, "danger");
          }
        );
      } catch (error) {
        setisloading(false);
        showNotificationMsz(error, "danger");
      }
    };
    getSubscriptionData();
  }, [isUpdated]);

  //getting and set edit feilds
  const OpenEditDailog = (item) => {
    setEditSize(item.shoe_size);
    setEditId(item._id);
    setEditDailogOpen(!EditDailogOpen);
  };

  const UpdateShoes = (EditId) => {
    let Id = EditId;
    let url = getBaseUrl() + `updateShoeSize/${Id}`;
    setisloading(true);

    let temp = {
      shoe_size: EditSize,
    };
    axios
      .post(url, temp)
      .then(
        (res) => {
          console.log("data response:::", res);
          setEditDailogOpen(!EditDailogOpen);
          setisUpdated(!isUpdated);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };

  //add delete features

  const deleteShoes = (item) => {
    let deleteid = item._id;

    let url = getBaseUrl() + `deleteShoeSize/${deleteid}`;
    setisloading(true);
    axios
      .get(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisloading(false);
          setisUpdated(!isUpdated);
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };

  ///addd show
  const AddShoessize = () => {
    let url = getBaseUrl() + "addShoeSize";
    setisloading(true);
    let temp = {
      shoe_size: showsize,
    };
    axios
      .post(url, temp)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisloading(false);
          setisUpdated(!isUpdated);
          setshowsize("");
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        setisloading(false);
        showNotificationMsz(e, "danger");
      });
  };

  return (
    <>
      <div className="content_padding">
        <div className="mb-3 page_heading">Manage Shoes Size</div>
        <Card className="pt-3 pb-4 Card_shadow">
          <div className="card_admissiondetails_height">
            <div className="textfiled_margin">
              {!addMangeopen ? (
                <div>
                  <span
                    className="mt-1 ml-2 addmanageuserfont hover_cursor"
                    onClick={() => setaddMangeopen(!addMangeopen)}
                  >
                    <strong>
                      {" "}
                      <i className="fa fa-plus-circle mr-1"></i> Add New Shoes
                      Size
                    </strong>
                  </span>
                </div>
              ) : (
                <Expand open={addMangeopen}>
                  <Card className=" mb-2 Card_shadow">
                    <div className="card_admissiondetails_height">
                      <div className="textfiled_margin">
                        <div className="card_content_instition">
                          <div className="text-right">
                            <span
                              className="icon_color"
                              onClick={() => setaddMangeopen(!addMangeopen)}
                            >
                              <i class="fa fa-times hover_cursor"></i>
                            </span>
                          </div>
                          <div className="text_filed_heading">Shoes Size</div>
                          <div className=" mt-1">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Shoes Size"
                              autoComplete="off"
                              value={showsize}
                              onChange={(e) => {
                                setshowsize(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-2 pb-2 ">
                          <Button
                            variant="contained"
                            className="button_formatting"
                            onClick={AddShoessize}
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
              {ShoesSizeArr.length > 0 ? (
                ShoesSizeArr.map((item, index) => (
                  <Card className="Card_shadow mb-2 mt-2">
                    <div className="card_admissiondetails_height">
                      <div className="textfiled_margin">
                        <Grid className="Component_main_grid mt-2">
                          <Grid item md={8}>
                            <div className=" p-2">{item.shoe_size}</div>
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
                                  onClick={() => deleteShoes(item)}
                                ></i>
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
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
          <div className="text_filed_heading">Shoes size</div>
          <div className=" mt-1">
            <input
              type="text"
              className="form-control "
              placeholder="Shoes size"
              autoComplete="off"
              value={EditSize}
              onChange={(e) => {
                setEditSize(e.target.value);
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
            onClick={() => UpdateShoes(EditId)}
          >
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
      <Loder loading={isloading} />
    </>
  );
}

export default HOC(AddShoesSize);
