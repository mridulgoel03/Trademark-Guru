"use client";

import Navbar from "@/components/Navbar/Navbar";
import { RadialBackground } from "@/components/ui/radial-background"; // Replace with the updated component
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="container mx-auto hero-main h-full">
          <RadialBackground
            colors={["#FF7F50", "#FFD700", "#87CEEB", "#6A5ACD", "#FF1493"]}
            speed="fast"
            blur={15}
          >
            <div className="flex h-full items-center">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1
                  style={{
                    fontFamily: "Poppins",
                  }}
                  className="text-7xl mb-3"
                >
                  Trademark Guru
                </h1>
                <p className="mb-3">
                  Trademark Guru: "Turn your brand into ERC20 gold! 🚀 Seamless,
                  reliable, and trademark-worthy. Tokens made easy—GO BRRRR!"
                </p>
                <Link href="/createtoken" className="button button-primary">
                  GET STARTED
                </Link>
              </div>
            </div>
          </RadialBackground>
        </div>
      </div>
    </>
  );
};

export default Home;
