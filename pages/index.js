import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Upload from "../components/Upload";
import Hero from "../components/Hero";

export default function Home() {
  return (
   
    <body className="bg-red-50">
      <section id="app">

      <div>
        <Navbar />
      </div> 

      <div>
        <Hero />
      </div>      
  
      <div>
        <Upload />
      </div> 
      <div>
        <Footer />
      </div> 
      </section>
    </body>
    
  );
}

