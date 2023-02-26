import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';

export default function EventList({title, description, children}) {
    return (
        <Card>
            <CardActionArea sx={{ background: "#ede9e9", marginTop: "15px" }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" color={"#204266"}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {children}
        </Card>
    );
}
