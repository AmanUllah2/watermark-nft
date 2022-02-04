import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
    return (
      <footer className="relative bg-purple-700 pt-8 pb-6  ">

        <div className="container mx-auto text-center">

          <div className="flex space-x-10 justify-center">
                <button
                  className="text-white  text-4xl h-10 w-10 items-center"
                  type="button"
                >
                  <FontAwesomeIcon icon="fa-brands fa-20x fa-github-alt" />
                </button>

                <button
                  className="text-white text-4xl h-10 w-10 items-center"
                  type="button"
                >
                  <FontAwesomeIcon icon="fa-brands fa-20x fa-telegram" />
                </button>
           </div>

          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                Copyright ©2021 Watermark NFT
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }