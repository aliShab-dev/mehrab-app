import { Stack } from "@mui/material";
import AudioList from "./AudioList";
import AudioPLayer from "./AudioPlayer";
import { Categories } from "@/app/page";
import { useEffect, useState } from "react";
import { Product } from "@/component/adminPage/components/tabs/MotionGraphy";
import { getProductsByCategoryId } from "@/component/adminPage/service/postProduct";

const AudioClient = () => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [audioList, setAudioList] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategoryId(3)
    .then(res => {
      setAudioList(res)
      setSelectedItem(res[0])
    })
    .catch(res => console.log(res))
  }, []);

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      gap={3}
      width={{ xs: "90%", md: "75%" }}
      height={"auto"}
      mx="auto"
      px={{ xs: 1.4, md: 2 }}
      sx={{
        borderRadius: 6,
        background: (theme) =>
          `linear-gradient(to bottom,rgba(248, 249, 255, .0), ${theme.palette.navbarColor.main})`,
      }}
    >
      <AudioList
        audioListData={audioList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <AudioPLayer selectedItem={selectedItem} />
    </Stack>
  );
};

export default AudioClient;
