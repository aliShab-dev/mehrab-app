import { Stack, Typography } from "@mui/material";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import PageHeader from "@/component/pageHeader/PageHeader";
import QuoteBox from "@/component/qouteBox/QuoteBox";
import TextTitle from "@/component/textTitle/TextTitle";
import UserImageCarousel from "@/component/about-us/StaffSlicer";
import { usersStaff } from "../lib/users";

const aboutUs = () => {
  return (
    <Stack width={"100%"} gap={6} mt={6} mb={10}>
      <PageHeader Icon={SmsRoundedIcon} title="داستان ما" />

      <QuoteBox />

      <TextTitle
        title="زبان هنر بیان هنرمندانه"
        passage="رسانه و تولید هنری، کسب و کار ما نیت؛ رسالت ماست. از همین رو برای ما مهم تر از تولید آثار هنری باکیفیت، تشکیل گروهی از هندمندان دغدغه مند است که بتوانند با «زبان» هنر به «بیان» هنرمندانه اندیشه های محکم و ارزشمند بپردازند."
      />
      <TextTitle
        title="آرمان محراب"
        passage="ما اعتقاد داریم که اندیشه ناب اسلام محمدی، غنی ترین و جهانی ترین اندیشه هاست. و تلاش ما در محراب آن است که بتوانیم به بیان هنرمندانه اینارزش ها بپردازیم. به این امید که بتوانیم در هیاهوی آثار پوچ و ضدانسانی، هنر خود را گوش و قلب مخاطبان جهانی برسانیم."
      />
      <TextTitle
        title="خانواده محراب"
        passage="برای رسیدن به آرمان بزرگ محراب، خانواده از جوان های متخصص را دور هم چمع کردیم هرکس با این ویژگی می تواند عضوی از خانواده ما باشد:
متعهد به اندیشه های ناب اسلامی و انقلابی باشد تا بتواند برای آرمان محراب تلاش کند.
پر از شور یادگیری باشد تا بتواند به جدیدترین و به روزترین دانش های فنی و هنری مسلط شود.
منظم و دقیق باشد تا بی وقفه و باجدیت در مسیر تولید آثار هنری قدم بردارد."
      />

      <Stack width={"87%"} mx={"auto"} gap={1.5} height={420}>
        <Typography fontSize={28} fontWeight={700} color={"secondary"}>
          پرسنل تخصصی محراب
        </Typography>

        <UserImageCarousel users={usersStaff} initialSelectedId="1" />
      </Stack>
    </Stack>
  );
};

export default aboutUs;
