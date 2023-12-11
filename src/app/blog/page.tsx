"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import useSWR from "swr";
import foodLogo from "../../../public/bibimbub-cooking-food-svgrepo-com.svg"

function Blog() {
  const { data, isLoading, error } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    (url) => axios.get(url).then((res) => res.data.categories)
  );

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);

  if (error) return <div>Error loading data</div>;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Image
            src={foodLogo}
            width={150}
            height={150}
            alt={""}
            className="rotation-animation"
          />
        </div>
      ) : (
        <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {data?.map((i: any) => {
            return (
              <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-full">
                <div class="relative h-56 mx-4  overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <Fade buttom cascade>
                    <Image src={i?.strCategoryThumb} alt="Image" fill />
                  </Fade>
                </div>
                <div class="p-6">
                  <Fade buttom cascade>
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      Category:{i?.strCategory}
                    </h5>
                  </Fade>
                  <Fade buttom cascade>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {i?.strCategoryDescription}
                    </p>
                  </Fade>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Blog;
