"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import foodLogo from "../../../public/bibimbub-cooking-food-svgrepo-com.svg";
import ReactPlayer from "react-player";
import Fade from "react-reveal/Fade";

function Pagination() {
  const [recipe, setData] = useState();
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);

  const { data, isLoading } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    fetcher
  );

  useEffect(() => {
    setData(data?.meals);
  }, [data]);

  console.log(recipe);

  return (
    <>
      <div className="flex justify-center  h-screen">
        <div className="lg:w-2/4 md:w-2/4 w-5/6  p-6">
          <div className="flex justify-center items-center">
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
              <div className="w-full flex justify-center flex-wrap items-center">
                <div className="rounded-lg  w-full md:w-full lg:w-full text-center p-2">
                  {recipe?.map((i, idx) => (
                    <div key={idx}>
                      <h1 className="font-bold text-4xl drop-shadow-2xl text-amber-700">
                        {i?.strMeal}
                      </h1>
                      <Fade bottom cascade>
                        <div className="flex flex-col justify-between items-center font-semibold pt-3 text-amber-600 text-lg">
                          <span>Streat Area: {i?.strArea}</span>
                          <span>Streat Category: {i?.strCategory}</span>
                        </div>
                      </Fade>
                      <section>
                        <Fade bottom cascade>
                          <div className="text-justify pt-3 break-words tracking-tight">
                            <div className="relative h-[400px] w-full">
                              <Image
                                fill
                                src={i?.strMealThumb}
                                alt="Recipe Image"
                                quality={100}
                                loading="lazy"
                                className="rounded-md shadow-md"
                              />
                            </div>
                            <p className="pt-3 font-medium">
                              {i?.strInstructions}
                            </p>
                          </div>
                        </Fade>
                      </section>
                      <section>
                        <Fade bottom cascade>
                          <h2 className="text-xl font-semibold text-left pt-3">
                            Ingredients:-
                          </h2>
                          <div className="pt-3">
                            <div className="flex justify-between text-base font-medium">
                              <span
                                className="uppercase"
                                title="Here is the list of the ingredients used to prepare this dish"
                              >
                                ingredient
                              </span>
                              <span
                                className="uppercase"
                                title="Actual measurement of the ingredients to prepare this dish"
                              >
                                measurement
                              </span>
                            </div>
                            {[...Array(20).keys()].map((index) => {
                              const ingredient = i[`strIngredient${index + 1}`];
                              const measure = i[`strMeasure${index + 1}`];

                              if (
                                ingredient !== "" &&
                                ingredient !== null &&
                                measure !== "" &&
                                measure !== null
                              ) {
                                return (
                                  <span
                                    key={index}
                                    className={`border rounded-md   flex justify-between items-start`}
                                  >
                                    {ingredient === undefined ||
                                    ingredient === "" ||
                                    ingredient === null ? (
                                      <span className="px-6 py-4 uppercase">
                                        {" "}
                                      </span>
                                    ) : (
                                      <span className="px-6 py-4 uppercase">
                                        {ingredient}
                                      </span>
                                    )}

                                    {measure === undefined ||
                                    measure === "" ||
                                    measure === null ? (
                                      <span className="px-6 py-4 uppercase"></span>
                                    ) : (
                                      <span className="px-6 py-4 uppercase">
                                        {measure}
                                      </span>
                                    )}
                                  </span>
                                );
                              }

                              return null;
                            })}
                          </div>
                        </Fade>
                      </section>
                      <Fade bottom cascade>
                        <section className="rounded-md pt-3">
                          <ReactPlayer
                            url={i?.strYoutube}
                            controls={true}
                            light={true}
                            width="full"
                          />
                        </section>
                      </Fade>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
