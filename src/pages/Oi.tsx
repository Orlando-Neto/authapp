import { Box } from "@mui/material"
import ReactPlayer from "react-player"

export const Oi: React.FC = () => {

    return (
        <Box height="100%" >
            <ReactPlayer
                className='react-player'
                playing
                height="100%"
                loop
                url='http://localhost/assets/videos/oiii.mp4' />
        </Box>
    )
}