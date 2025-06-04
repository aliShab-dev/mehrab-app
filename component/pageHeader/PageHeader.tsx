import { SvgIconComponent } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material"

type PageHeaderType = {
    title: string;
    Icon: SvgIconComponent;
}


const PageHeader = ({ title, Icon }: PageHeaderType) => {

    return (
        <Stack direction={'row'} width={'100%'} mx={'auto'} gap={1} justifyContent={'center'} alignItems={'center'}>
            <Icon color={'secondary'} sx={{ mt: .5}}/>
            <Typography fontSize={30}>
                {title}
            </Typography>
        </Stack>
    )
}


export default PageHeader