"use client";
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useTheme,
  alpha,
  Avatar,
  ButtonProps,
} from "@mui/material";
import { animate, motion, useMotionValue } from "framer-motion";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useState } from "react";
import { Counter, IconSwinger, ModelCanvas, MouseType } from "./component/subs";

const svgPaths = [
  "M123.2 -214C158.7 -192.8 185.9 -157.9 199.9 -120C214 -82 215 -41 218.5 2C221.9 45 227.9 90 212.1 124.9C196.2 159.9 158.6 184.7 119.6 196.2C80.7 207.7 40.3 205.9 3.8 199.2C-32.7 192.6 -65.3 181.2 -94.5 164C-123.6 146.8 -149.3 123.9 -176.8 95.6C-204.3 67.3 -233.6 33.7 -232.5 0.7C-231.3 -32.3 -199.7 -64.7 -169.9 -89C-140.1 -113.4 -112.3 -129.8 -84.3 -155.3C-56.3 -180.8 -28.1 -215.4 7.9 -229C43.8 -242.6 87.7 -235.2 123.2 -214",
  "M107.7 -188.4C138.7 -168.6 162.5 -138.1 171.4 -104.9C180.4 -71.7 174.6 -35.8 176 0.8C177.5 37.5 186.2 75 180.5 114C174.9 152.9 155 193.4 122.5 210.8C90 228.2 45 222.6 1.5 220C-42 217.4 -84 217.8 -113.3 198.6C-142.6 179.3 -159.2 140.4 -169.7 104C-180.2 67.7 -184.6 33.8 -191.5 -4C-198.5 -41.8 -207.9 -83.7 -196.9 -119.2C-185.9 -154.7 -154.5 -183.9 -118.2 -200.6C-82 -217.4 -41 -221.7 -1.3 -219.4C38.3 -217.1 76.7 -208.1 107.7 -188.4",
  "M111.3 -195.1C143.9 -173.9 169.8 -143.5 194.5 -109.4C219.1 -75.3 242.6 -37.7 248.9 3.7C255.3 45 244.6 90 215.4 116.3C186.2 142.5 138.6 150.1 99.6 159.4C60.7 168.7 30.3 179.9 0.6 178.9C-29.2 177.9 -58.3 164.7 -82.7 146.9C-107.1 129.2 -126.6 106.8 -150 81.5C-173.4 56.3 -200.7 28.1 -203.3 -1.5C-206 -31.2 -184 -62.3 -163.1 -92.1C-142.3 -121.8 -122.6 -150.1 -95.7 -174.5C-68.7 -198.9 -34.3 -219.5 2.5 -223.8C39.3 -228.1 78.7 -216.3 111.3 -195.1",
  "M107.4 -185.1C139.2 -167.7 164.9 -138.9 190.9 -106.1C217 -73.3 243.5 -36.7 246.5 1.7C249.6 40.2 229.1 80.3 204 114.7C178.8 149 148.9 177.6 114.1 186.5C79.3 195.4 39.7 184.7 -2.4 188.9C-44.5 193.1 -89 212.2 -113.2 197.2C-137.5 182.2 -141.5 133.1 -162.7 94.5C-184 56 -222.5 28 -236.4 -8C-250.2 -44 -239.4 -88 -210 -112.4C-180.5 -136.7 -132.5 -141.4 -94.4 -155.1C-56.3 -168.8 -28.1 -191.4 4.9 -199.8C37.8 -208.2 75.7 -202.4 107.4 -185.1",
  "M116.8 -204.7C145 -186.1 156.9 -141.8 172.6 -103.4C188.2 -65 207.6 -32.5 218.5 6.2C229.3 45 231.6 90 208.6 115.7C185.6 141.4 137.3 147.8 98.3 153.4C59.3 159 29.7 163.9 -0.7 165C-31 166.2 -62 163.6 -94 154C-126.1 144.4 -159.2 127.7 -173 100.8C-186.8 74 -181.4 37 -182.4 -0.6C-183.4 -38.2 -190.9 -76.3 -181 -110C-171 -143.6 -143.8 -172.7 -110.7 -188.4C-77.7 -204.2 -38.8 -206.6 2.7 -211.4C44.3 -216.1 88.7 -223.2 116.8 -204.7",
  "M124.9 -209.4C159.9 -196.2 184.7 -158.6 194.4 -119.6C204.1 -80.7 198.5 -40.3 199.2 0.4C200 41.2 206.9 82.3 196.7 120.3C186.4 158.3 159 193 123.3 200.6C87.7 208.1 43.8 188.4 0.6 187.4C-42.7 186.4 -85.3 204.1 -116.8 194.1C-148.3 184.1 -168.5 146.6 -179 109.6C-189.5 72.7 -190.3 36.3 -192.3 -1.2C-194.3 -38.7 -197.6 -77.3 -186.3 -112.8C-174.9 -148.3 -149 -180.7 -115.5 -194.7C-82 -208.7 -41 -204.3 2 -207.8C45 -211.3 90 -222.6 124.9 -209.4",
];

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 18,
  gap: 15,
  fontSize: 18,
  color: "white",
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
}));

const MainBanner = () => {
  const theme = useTheme();
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const startCounting = () => {
    count.set(0);
    animate(count, 1000, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Number(latest.toFixed(0)));
      },
    });
  };

  const [mouse, setMouse] = useState<MouseType>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    const y = -((e.clientY / window.innerHeight) * 2 - 1); // invert Y
    setMouse({ x, y });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ width: "100%", height: "100%" }}
    >
      <Stack
        sx={{
          position: "relative",
          width: "80%",
          height: 500,
          mx: "auto",
          borderRadius: 2,
          overflow: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* <ModelCanvas mouse={mouse} /> */}
        {/* <IconSwinger /> */}
        {/* <Counter startCounting={startCounting} display={display} /> */}

        <svg
          viewBox="0 0 450 450"
          width="100%"
          height="100%"
          style={{ overflow: "visible", transform: "translateY(30px)" }}
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={alpha(theme.palette.primary.main, 0.3)}
              />
              <stop
                offset="100%"
                stopColor={alpha(theme.palette.secondary.main, 0.9)}
              />
            </linearGradient>
          </defs>
          <motion.path
            // onMouseMove={handleMouseMove}
            fill="url(#pathGradient)"
            stroke="url(#pathGradient)"
            strokeWidth={3}
            animate={{ d: svgPaths }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            transform="translate(200 200) scale(2, 1)"
          />
        </svg>

        <Stack
          sx={{
            position: "absolute",
            top: 50,
            width: "100%",
            mx: "auto",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            zIndex: 300,
          }}
        >
          <Typography fontSize={32} fontWeight={700} color="primary.dark">
            از ایده تا تصویر روایتگر داستان شما
          </Typography>
          <Typography fontSize={24} color="secondary.dark">
            "محراب پل ارتباطی بین ایده و مخاطبان"
          </Typography>
          <Typography width={600} textAlign={"center"}>
            ما با تولید محتوای خلاقانه و متنوع، به شما کمک می کنیم با پیام خود
            را به مخاطبانتان برسانید از پوستر و موشن گرافیک تا مستند ها و کلیپ
            های جذاب هرا آنچه که نیاز دارید را در محراب پیدا کنید..
          </Typography>

          <Stack direction={"row"} gap={3}>
            <StyledButton
              component={"a"}
              href="/products"
              variant="contained"
              endIcon={<StarBorderIcon />}
            >
              نمونه کار ها
            </StyledButton>
            <StyledButton
              component={"a"}
              href="/set-order"
              variant="contained"
              endIcon={<TelegramIcon />}
            >
              {" "}
              سفارش
            </StyledButton>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default MainBanner;
