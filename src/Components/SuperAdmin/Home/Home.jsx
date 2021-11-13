import React from 'react'
import { Grid, Card } from '@material-ui/core';

//common header
import HOC from "../../../Common/HOC";

import "./Home.css";

function Home(props) {
    return (
        <>
            <div className="content_padding">
                <div className="mt-2 mb-2">
                    <Grid className="Component_main_grid">
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/subscription")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Subsciption</strong></div>
                            </Card>
                        </Grid>
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/auction")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Auctions</strong></div>
                            </Card>
                        </Grid>

                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/bid-price")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Bid Price</strong></div>
                            </Card>
                        </Grid>
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/user-details")}>
                                <div><strong>User Details</strong></div>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid className="Component_main_grid mt-2">
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/reward")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Reward</strong></div>
                            </Card>
                        </Grid>

                        <Grid item md={9} className="p-3">

                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default HOC(Home)
