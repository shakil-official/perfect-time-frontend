import Typography from "@mui/material/Typography";
import * as React from "react";


const DetailsShow = ({initData}) => {

    return (
        <>
            <Typography variant="h4">{initData.data.user.name}</Typography>
            <Typography variant="h5" gutterBottom>{initData.data.event.name}</Typography>
            <Typography paragraph={true} gutterBottom>{initData.data.event.description}</Typography>
        </>
    )

}

export default DetailsShow;