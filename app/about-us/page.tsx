import { Stack, Typography } from "@mui/material";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import PageHeader from "@/component/pageHeader/PageHeader";
import QuoteBox from "@/component/qouteBox/QuoteBox";
import UserImageCarousel from "@/component/about-us/StaffSlicer";

export async function generateMetadata() {
  return {
    title: "درباره ما | استودیو محراب",
    description:
      "استودیو محراب با تیمی جوان و متخصص، به دنبال خلق آثار هنری و رسانه‌ای با کیفیت و رسالت خاص است.",
    keywords: ["استودیو محراب", "درباره ما", "رسانه", "هنر", "تیم هنری"],
    authors: [{ name: "استودیو محراب", url: "https://mehrabfamily.ir" }],
    creator: "استودیو محراب",
    publisher: "استودیو محراب",
  };
}

const AboutUs = () => {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "استودیو محراب",
    url: "https://mehrabfamily.ir",
    logo: "https://mehrabfamily.ir/logo.png",
    founder: {
      "@type": "Person",
      name: "گروه فرهنگی هنری محراب",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+989103533906",
      contactType: "پشتیبانی",
      areaServed: "IR",
    },
  };
  return (
    <Stack width={"100%"} gap={3} mt={{ xs: 1, md: 4 }} mb={10}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Stack width="100%" pr={0}>
        <PageHeader Icon={SmsRoundedIcon} title="داستان ما" />
      </Stack>
      <QuoteBox />
      <Stack width={"87%"} mx={"auto"} gap={1.5} height={420} mt={8}>
        <Typography
          fontSize={{ xs: 22, sm: 26, md: 28 }}
          fontWeight={700}
          color={"secondary"}
        >
          پرسنل تخصصی محراب
        </Typography>

        <UserImageCarousel />
      </Stack>
    </Stack>
  );
};

export default AboutUs;
