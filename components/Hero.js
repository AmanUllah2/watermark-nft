import React from "react";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/Connectors"

const Hero = () => {

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function connect() {
      try {
        await activate(injected)
      } catch (ex) {
        console.log(ex)
      }
    }
  
    async function disconnect() {
      try {
        deactivate()
      } catch (ex) {
        console.log(ex)
      }
    }
  
    
    return (
      <div className="f-f-p">
        <div className="mx-auto container relative px-6 xl:px-0 md:mt-20 lg:mt-40 xl:mt-64">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-center">
            <div className="">
              <div className="text-3xl lg:text-6xl xl:text-8xl text-color-gray tracking-1px font-extrabold">
                <h1 className="lg:mt-0">A Watermark is</h1>
                
                <h1 className="lg:mt-0 text-purple-700">Forever </h1> 
                
              </div>
              
              <h2 className="text-lg lg:text-2xl tracking-wide leading-9 lg:w-10/12 mt-2 lg:mt-6 text-color-gray-light pb-5">
                Watermark your files using our steganography tools. 
                To get started, connect your wallet.
              </h2>
                
                {active ? <p>👌 Connected with <b>{account}</b></p> : <button onClick={connect} className="flex hover:opacity-75 bg-purple-700 items-center relative focus:outline-none justify-center mt-5 lg:mt-10 text-lg lg:text-2xl font-medium text-white p-4 lg:p-8 bg-color-purple rounded-3xl">
                Connect wallet 🦊
                </button>
                
                 }

                {active ? <button onClick={disconnect} className="flex text-lg font-bold text-purple-700  hover:purple-500 pt-5">
                  Disconnect 💔
                </button> : <p></p>
                }



                
                
            </div>
            <div className="w-full custom-height bg-purple-light mt-32 hidden md:block lg:mt-20 rounded-3xl relative">
              <div className="-ml-8 w-1/3">
                <img
                  loading="lazy"
                  class
                  src="https://cdn.tuk.dev/assets/templates/intertia/cloud_1.png"
                  alt="cloud"
                />
              </div>
              <div className="w-full flex justify-center">
                <img
                  loading="lazy"
                  className="absolute inset-0 m-auto w-2/3"
                  src="/herohorse.png"
                  alt="saly"
                />
              </div>
              <div className>
                <img
                  loading="lazy"
                  className="absolute w-1/4 right-0"
                  src="https://cdn.tuk.dev/assets/templates/intertia/cloud_2.png"
                  alt="cloud"
                />
              </div>
              <div className>
                <img
                  loading="lazy"
                  className="absolute ml-16 xl:ml-20 pb-14 xl:pb-20 w-1/5 left-0 bottom-0"
                  src="https://cdn.tuk.dev/assets/templates/intertia/cloud_2.png"
                  alt="cloud"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;
  