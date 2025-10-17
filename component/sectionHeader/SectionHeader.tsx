"use client";

import { Stack, styled, Typography } from "@mui/material";
import Image, { ImageProps, StaticImageData } from "next/image";

type SectionHeaderType = {
  title: string;
  backIcon: {
    alt: string;
    src: string | StaticImageData;
    width?: { xs?: number; sm?: number; md?: number; lg?: number };
    height?: { xs?: number; sm?: number; md?: number; lg?: number };
    position?: {
      xs: { top?: number; left?: number };
      sm: { top?: number; left?: number };
      md: { top?: number; left?: number };
      lg: { top?: number; left?: number };
    };
    style?: React.CSSProperties;
  };
  frontIcon: {
    alt: string;
    src: string | StaticImageData;
    width?: number;
    height?: number;
  };
};

interface ResponsiveImageProps extends ImageProps {
  customWidth?: { xs?: number; sm?: number; md?: number; lg?: number };
  customHeight?: { xs?: number; sm?: number; md?: number; lg?: number };
  customPostion?: {
    xs: { top?: number; left?: number };
    sm: { top?: number; left?: number };
    md: { top?: number; left?: number };
    lg: { top?: number; left?: number };
  };
  style?: React.CSSProperties;
}

interface ResponsiveImageBackProps extends ImageProps {
  customWidth?: number;
  customHeight?: number;
  customPostion?: { top?: number; left?: number };
  style?: React.CSSProperties;
}

const ResponsiveImage = styled(Image, {
  shouldForwardProp: (prop) =>
    prop !== "customWidth" &&
    prop !== "customHeight" &&
    prop !== "customPostion" &&
    prop !== "customStyle",
})<ResponsiveImageProps>(
  ({ theme, customWidth, customHeight, customPostion, style }) => ({
    position: "absolute",
    top: customPostion?.xs?.top ?? -35,
    left: customPostion?.xs?.left ?? -10,
    zIndex: 90,
    width: customWidth?.xs ?? 30,
    height: customHeight?.xs ?? "auto",
    ...style,

    [theme.breakpoints.up("sm")]: {
      width: customWidth?.sm ?? 40,
      height: customHeight?.sm ?? "auto",
      top: customPostion?.sm?.top ?? -40,
      left: customPostion?.sm?.left ?? -15,
    },
    [theme.breakpoints.up("md")]: {
      width: customWidth?.md ?? 50,
      height: customHeight?.md ?? "auto",
      top: customPostion?.md?.top ?? -45,
      left: customPostion?.md?.left ?? -15,
    },
    [theme.breakpoints.up("lg")]: {
      width: customWidth?.lg ?? 60,
      height: customHeight?.lg ?? 60,
      top: customPostion?.lg?.top ?? -50,
      left: customPostion?.lg?.left ?? -15,
    },
  })
);

export const ResponsiveFrontImage = styled(Image, {
  shouldForwardProp: (prop) =>
    prop !== "customWidth" && prop !== "customHeight",
})<ResponsiveImageBackProps>(({ theme, customWidth, customHeight }) => ({
  zIndex: 100,
  width: customWidth ?? 24,
  height: customHeight ?? "auto",

  ...(customWidth == null && {
    [theme.breakpoints.up("sm")]: { width: 28 },
    [theme.breakpoints.up("md")]: { width: 32 },
    [theme.breakpoints.up("lg")]: { width: 35 },
  }),
}));

const SectionHeader = ({ title, backIcon, frontIcon }: SectionHeaderType) => {
  return (
    <Stack mr={{ xs: 3.6, sm: 5, md: 1.5 }} mt={-2.5}>
      <Stack direction={"row"} gap={{ xs: 1, sm: 1.5, md: 2, lg: 2.2 }}>
        <Stack position={"relative"} mt={0.5}>
          <ResponsiveImage
            sizes="(max-width: 600px) 30px, 30px"
            alt={backIcon.alt}
            src={backIcon.src}
            style={backIcon.style}
            customWidth={backIcon.width}
            customHeight={backIcon.height}
            customPostion={backIcon.position}
            width={50}
            height={50}
          />
          <ResponsiveFrontImage
            alt={frontIcon.alt}
            src={frontIcon.src}
            customWidth={frontIcon.width}
            customHeight={frontIcon.height}
            width={50}
            height={50}
          />
        </Stack>
        <Stack>
          <Typography
            component={"h2"}
            fontSize={{ xs: 16, sm: 18, md: 20, lg: 26 }}
            fontWeight={800}
          >
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SectionHeader;

// "use client";
// import { Stack, styled, Typography } from "@mui/material";
// import Image, { ImageProps, StaticImageData } from "next/image";

// type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T };

// type SectionHeaderType = {
//   title: string;
//   backIcon: {
//     alt: string;
//     src: string | StaticImageData;
//     width?: ResponsiveValue<number>;
//     height?: ResponsiveValue<number>;
//     position?: ResponsiveValue<{ top?: number; left?: number }>;
//     style?: React.CSSProperties;
//   };
//   frontIcon: {
//     alt: string;
//     src: string | StaticImageData;
//     width?: ResponsiveValue<number>;
//     height?: ResponsiveValue<number>;
//   };
// };

// interface ResponsiveImageProps extends ImageProps {
//   customWidth?: ResponsiveValue<number>;
//   customHeight?: ResponsiveValue<number>;
//   customPosition?: ResponsiveValue<{ top?: number; left?: number }>;
//   style?: React.CSSProperties;
// }

// interface ResponsiveBackImageProps extends ImageProps {
//   customWidth?: number;
//   customHeight?: number;
//   customPostion?: { top?: number; left?: number };
//   style?: React.CSSProperties;
// }

// function isResponsiveObject<T>(
//   value: ResponsiveValue<T>
// ): value is { xs?: T; sm?: T; md?: T; lg?: T } {
//   return typeof value === "object" && value !== null;
// }

// const applyResponsive = <T,>(
//   theme: any,
//   prop: ResponsiveValue<T> | undefined,
//   callback: (value: T) => Record<string, any>
// ) => {
//   if (!prop) return {};

//   if (!isResponsiveObject(prop)) {
//     return callback(prop);
//   }

//   const styles: Record<string, any> = {};

//   if (prop.xs !== undefined) Object.assign(styles, callback(prop.xs));
//   if (prop.sm !== undefined)
//     Object.assign(styles, {
//       [theme.breakpoints.up("sm")]: callback(prop.sm),
//     });
//   if (prop.md !== undefined)
//     Object.assign(styles, {
//       [theme.breakpoints.up("md")]: callback(prop.md),
//     });
//   if (prop.lg !== undefined)
//     Object.assign(styles, {
//       [theme.breakpoints.up("lg")]: callback(prop.lg),
//     });

//   return styles;
// };

// const ResponsiveImage = styled(Image, {
//   shouldForwardProp: (prop) =>
//     prop !== "customWidth" &&
//     prop !== "customHeight" &&
//     prop !== "customPosition",
// })<ResponsiveImageProps>(
//   ({ theme, customWidth, customHeight, customPosition, style }) => ({
//     position: "absolute",
//     zIndex: 90,
//     ...style,
//     ...applyResponsive(theme, customWidth, (w) => ({ width: w })),
//     ...applyResponsive(theme, customHeight, (h) => ({ height: h })),
//     ...applyResponsive(theme, customPosition, (pos) => ({
//       top: pos.top ?? "auto",
//       left: pos.left ?? "auto",
//     })),
//   })
// );

// export const ResponsiveFrontImage = styled(Image, {
//   shouldForwardProp: (prop) =>
//     prop !== "customWidth" && prop !== "customHeight",
// })<ResponsiveBackImageProps>(({ theme, customWidth, customHeight }) => ({
//   zIndex: 100,
//   width: customWidth ?? 30,
//   height: customHeight ?? "auto",

//   ...(customWidth == null && {
//     [theme.breakpoints.up("sm")]: { width: 30 },
//     [theme.breakpoints.up("md")]: { width: 35 },
//     [theme.breakpoints.up("lg")]: { width: 40 },
//   }),
// }));

// const SectionHeader = ({ title, backIcon, frontIcon }: SectionHeaderType) => {
//   return (
//     <Stack mr={{ xs: 3.6, sm: 5, md: 1.5 }} mt={-2.5}>
//       <Stack direction={"row"} gap={{ xs: 1, sm: 1.5, md: 2, lg: 2.2 }}>
//         <Stack position={"relative"} mt={0.5}>
//           <ResponsiveImage
//             alt={backIcon.alt}
//             src={backIcon.src}
//             style={backIcon.style}
//             customWidth={backIcon.width}
//             customHeight={backIcon.height}
//             customPosition={backIcon.position}
//             width={80}
//             height={80}
//           />
//           <ResponsiveFrontImage
//             alt={frontIcon.alt}
//             src={frontIcon.src}
//             // customWidth={frontIcon.width}
//             // customHeight={frontIcon.height}
//             width={1000}
//             height={1000}
//           />
//         </Stack>
//         <Stack>
//           <Typography
//             component={"h2"}
//             fontSize={{ xs: 16, sm: 18, md: 20, lg: 26 }}
//             fontWeight={800}
//           >
//             {title}
//           </Typography>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default SectionHeader;
