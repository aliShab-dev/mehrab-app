import { Stack, Typography } from "@mui/material";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import PageHeader from "@/component/pageHeader/PageHeader";
import QuoteBox from "@/component/qouteBox/QuoteBox";
import UserImageCarousel from "@/component/about-us/StaffSlicer";
import { usersStaff } from "../lib/users";

const aboutUs = () => {
  return (
    <Stack width={"100%"} gap={3} mt={6} mb={10}>
      <Stack width='100%' pr={0}>
        <PageHeader Icon={SmsRoundedIcon} title="داستان ما" />
      </Stack>
      <QuoteBox />
      <Stack width={"87%"} mx={"auto"} gap={1.5} height={420} mt={8}>
        <Typography fontSize={28} fontWeight={700} color={"secondary"}>
          پرسنل تخصصی محراب
        </Typography>

        <UserImageCarousel users={usersStaff} initialSelectedId="1" />
      </Stack>
    </Stack>
  );
};

export default aboutUs;
