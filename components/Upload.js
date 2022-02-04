import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [value, setValue] = useState(null);
  const [img, setImg] = useState(null);
  const [loader, setLoader] = useState(false);

  const onImageChange = (event) => {
    setValue(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadFile = () => {
    setLoader(true);
    var FormData = require("form-data");
    console.log("file", value)
    var data = new FormData();
    data.append("file", value);

    var config = {
      method: "post",
      url: "https://nftwatermark-back.herokuapp.com/api/uploadfile",
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoader(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  const onChangeHandler = async() => {
    setLoader(true);
    var FormData = require("form-data");
    const formData = new FormData();
    formData.append(value?.name, value);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    const response = await axios.post('/api/uploads', formData, config);
    console.log('response', response.data);
    await setLoader(false);
  };

  return (
    <body className="bg-red-50">
      <section id="app">

        <div className="pt-10 md:py-16 lg:py-24 overflow-hidden">
          <div className="max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto lg:max-w-none">
              <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <div className="mt-2 sm:mt-0 sm:col-span-2">
                  <div className="text-center p-6">
                    <p className="text-base">
                      Fill in the fields and upload your file.
                    </p>
                  </div>
                  <div className="flex justify-between items-center flex-wrap lg:flex-nowrap text-left">
                    <div className="xl:w-1/2 md:mr-4 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                      <label
                        htmlFor="FirstName"
                        className="pb-2 text-sm font-bold text-purple-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        // onChange={(e) => setTitle(e.target.value)}
                        id="FirstName"
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-pink-700 text-gray-800 dark:text-gray-100"
                        placeholder
                      />
                    </div>
                    <div className="xl:w-1/2 md:ml-4 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                      <label
                        htmlFor="FirstName"
                        className="pb-2 text-sm font-bold text-purple-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        // onChange={(e) => setTitle(e.target.value)}
                        id="FirstName"
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-pink-700 text-gray-800 dark:text-gray-100"
                        placeholder
                      />
                    </div>
                  </div>
                  {value && (
                    <div className="flex justify-center w-full">
                      <img src={img} className="w-52 h-52 rounded-md" alt="" />
                    </div>
                  )}
                  <div className="w-full flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 ok relative mt-7 flex-col py-10 text-blue tracking-wide uppercase cursor-pointer border-dashed rounded-md min-h-128">
                    <div className="absolute rounded-full bg-gray-100 h-20 w-20 z-10 transition-opacity duration-500 ease-in-out"></div>
                    <div className="z-20 text-center">
                      <div className="md:w-full flex flex-wrap justify-between mb-6">
                        <div className="">
                          <div className="flex items-center justify-center">
                            <svg
                              className="mx-auto h-24 my-6 w-24 text-gray-200"
                              viewBox="0 0 400 460"
                              fill="currentColor"
                            >
                              <path d="M398.286284,360.544249 C393.676808,343.190601 377.828429,331.089442 359.696758,331.078584 L359.696758,331.078584 C341.370574,330.889056 325.342643,343.255751 321.059352,360.889742 L309.821446,360.889742 C298.820948,360.889742 289.871322,351.634464 289.871322,340.752403 L289.871322,280.204163 C293.719701,274.22515 296.899751,267.849313 299.354613,261.190172 L313.986035,261.190172 C356.709227,261.238541 391.382544,227.00309 391.431421,184.724549 C391.462344,158.050472 377.460349,133.284506 354.473815,119.354206 C354.727182,116.428369 354.906733,113.476867 354.906733,110.272661 C354.926683,49.3907725 305.070324,0.0197424893 243.54813,-5.71751646e-06 C221.863342,-0.00690987124 200.648379,6.24948498 182.504738,18.0012017 C167.058354,28.0609871 154.347132,41.7237768 145.491272,57.7872532 C141.97606,57.4160944 138.441895,57.230515 134.906733,57.2315021 C115.356608,57.2028755 96.3471322,63.5856223 80.8518703,75.3827468 C66.8418953,86.0219742 56.1935162,100.398455 50.1586035,116.822232 C43.278803,120.404506 36.9785536,124.983777 31.4653367,130.407039 C1.21995012,160.29618 1.18603491,208.789657 31.3895262,238.720258 C45.919202,253.119442 65.6428928,261.203991 86.2054863,261.190172 L100.836908,261.190172 C103.291771,267.849313 106.47182,274.22515 110.3202,280.204163 L110.3202,340.752403 C110.3202,351.638412 101.370574,360.889742 90.3700748,360.889742 L79.1321696,360.889742 C74.8488778,343.255751 58.8209476,330.889056 40.4947631,331.078584 C18.4438903,331.091416 0.578553616,348.790558 0.591514142,370.611931 C0.603491272,392.433305 18.4897756,410.112704 40.5406484,410.099871 C58.6743142,410.09 74.5236908,397.987854 79.1331671,380.632232 L90.3710723,380.632232 C112.37207,380.632232 130.271322,362.520472 130.271322,340.752403 L130.271322,303.397639 C146.988529,317.973519 167.939152,326.937597 190.121696,329.005622 L190.121696,381.48412 C168.785037,386.936009 155.954115,408.472103 161.463342,429.586695 C166.972569,450.701288 188.735162,463.39867 210.07182,457.946781 C231.408479,452.494893 244.239401,430.958798 238.730175,409.844206 C235.101247,395.936609 224.126683,385.075279 210.07182,381.48412 L210.07182,329.005622 C232.254364,326.938584 253.204988,317.974506 269.922195,303.398627 L269.922195,340.752403 C269.922195,362.524421 287.821446,380.632232 309.822444,380.632232 L321.060349,380.632232 C326.666334,401.735966 348.497756,414.347468 369.823441,408.799828 C391.14813,403.253176 403.892269,381.647983 398.286284,360.544249 Z M40.4947631,390.108627 C29.4763092,390.108627 20.5446384,381.269914 20.5446384,370.366137 C20.5446384,359.462361 29.4763092,350.623648 40.4947631,350.623648 C51.513217,350.623648 60.4448878,359.462361 60.4448878,370.366137 C60.4319202,381.263991 51.5072319,390.095794 40.4947631,390.108627 Z M94.1855362,224.652747 C94.2054863,230.277382 94.6643392,235.892146 95.5571072,241.447702 L86.2054863,241.447702 C54.476808,241.473348 28.7351621,216.041073 28.7092062,184.642618 C28.6962594,169.53073 34.7640898,155.035794 45.5720698,144.360043 C50.4947631,139.547811 56.2314214,135.626953 62.5226933,132.774163 L66.5356608,130.92133 L67.838404,126.733948 C76.9476309,97.4351073 104.527681,76.9739914 134.906733,76.9739914 C139.697756,76.9552361 144.4798,77.3954936 149.185037,78.2888412 L156.885786,79.8129614 L160.189526,72.7619313 C167.461347,57.1890558 178.986534,43.9369099 193.463342,34.4990129 C235.732668,7.14579399 292.405985,18.8797425 320.046883,60.7091416 C329.784539,75.4449356 334.966584,92.6712446 334.958603,110.277597 C334.892768,114.393906 334.613466,118.504292 334.121696,122.591974 L333.309726,130.622232 L339.457357,133.665536 C367.888279,147.588927 379.529177,181.684206 365.459352,209.819227 C355.772569,229.188584 335.824439,241.447702 313.986035,241.447702 L304.634414,241.447702 C305.526185,235.892146 305.983042,230.277382 306.001995,224.652747 C306.001995,166.769742 258.585536,119.846781 200.093766,119.846781 C141.601995,119.846781 94.1855362,166.769742 94.1855362,224.652747 Z M220.045885,419.722361 C220.045885,430.626137 211.114214,439.46485 200.095761,439.46485 C189.077307,439.46485 180.145636,430.626137 180.145636,419.722361 C180.145636,408.818584 189.077307,399.979871 200.095761,399.979871 C211.108229,399.992704 220.032918,408.824506 220.045885,419.722361 Z M200.095761,309.730043 C152.622444,309.730043 114.137656,271.645794 114.137656,224.666567 C114.137656,177.687339 152.622444,139.60309 200.095761,139.60309 C247.569077,139.60309 286.053865,177.687339 286.053865,224.666567 C286,271.624077 247.547132,309.676738 200.095761,309.730043 Z M359.696758,390.108627 C348.678304,390.108627 339.746633,381.269914 339.746633,370.366137 C339.746633,359.462361 348.678304,350.623648 359.696758,350.623648 C370.715212,350.623648 379.646883,359.462361 379.646883,370.366137 C379.633915,381.263991 370.709227,390.095794 359.696758,390.108627 Z M238.288279,208.791631 L206.891771,179.875794 C203.062344,176.348798 197.129177,176.348798 193.299751,179.875794 L161.903242,208.791631 C157.870324,212.50618 157.64389,218.752704 161.396509,222.743648 C165.150125,226.734592 171.462344,226.95867 175.495262,223.245107 L190.120698,209.774807 L190.120698,262.231588 C190.120698,267.683476 194.586534,272.102833 200.095761,272.102833 C205.604988,272.102833 210.070823,267.683476 210.070823,262.231588 L210.070823,209.77382 L224.696259,223.24412 C228.729177,226.95867 235.041397,226.734592 238.795012,222.742661 C242.547631,218.751717 242.321197,212.50618 238.288279,208.791631 Z" />
                            </svg>
                          </div>
                          {/* <span className="mt-2 text-base leading-normal">
                              
                            </span> */}
                          <input
                            // onChange="files"
                            onChange={(e) => onImageChange(e)}
                            type="file"
                            className="absolute top-0 bottom-0 right-0 left-0  cursor-pointer opacity-0 w-full"
                          />
                          <p className="mt-5 pt-6 text-sm text-gray-600">
                            <button
                              type="button"
                              className="font-medium text-purple-700 pr-3 py-5 hover:text-purple-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                            >
                              Choose a file
                            </button>
                            or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            .csv, .json, .txt, .shp, .shx, .dbf, .nc and .tiff
                            up to 1GB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center pt-10">
                    <button
                      // onClick={() => uploadFile()}
                      onClick={() => onChangeHandler()}
                      className="bg-purple-700 hover:opacity-75 flex justify-center w-48 py-4 text-white rounded-md"
                    >
                      {loader ? (
                        <img className="w-7" src="/images/loader.svg" alt="" />
                      ) : (
                        "Upload"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}
