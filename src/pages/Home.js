import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Images from "../components/Images";
import Loading from "../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Home() {
  const { t } = useTranslation("common");
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchMore();
  }, []);

  const fetchMore = (count = 6) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((response) => {
        setImages([...images, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="md:mt-28 md:pt-4 pb-10">
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1633647517075-3bdafbc7b68c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80')",
        }}
        className="flex items-start  px-10 flex-col justify-center w-full xs:h-[400px]  lg:h-[600px] bg-cover bg-white"
      >
        <p className="text-9xl text-white ">KrPics</p>
        <p className="text-xl text-white ">{t("home.title")}</p>
      </div>
      <div className="w-full   bg-white  ">
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMore}
          hasMore={true}
          loader={<Loading />}
        >
          <Images posts={images} />
        </InfiniteScroll>
      </div>
    </div>
  );
}
