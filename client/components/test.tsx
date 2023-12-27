import { Beaker, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profile from "../app/favicon.ico";
import styles from "./contact.module.css";

const Test = () => {
  return (
    <div className="flex items-center justify-center mt-[300px]">
      <div
        className={`${styles.card} text-sm sm:text-base grid grid-cols-1 w-4/5 px-2 xl:w-3/5 py-8 rounded-xl`}
      >
        <div className="relative mx-auto w-1/2">
          <Image
            src={profile.src}
            alt="Deveesh Profile"
            className="block aspect-square rounded-full transition-all duration-300"
            priority
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col items-center w-full gap-4">
          <div className="mt-4 text-center transition-all">
            <p className="text-xl md:text-2xl transition-all">Deveesh Shetty</p>
            <p>deveeshshetty@gmail.com</p>
            <p className="my-2">
              Frontend Developer | President SOSC | Open Source Enthusiast
            </p>
          </div>
          <div
            className={`${styles.socials} flex justify-center items-center h-full w-4/5 gap-2`}
          >
            <div className="flex w-4/5 h-12 items-center border border-white rounded-xl cursor-pointer justify-center hover:bg-slate-200 transition-all duration-300 hover:text-slate-800 text-xl">
              <Link
                href={"/"}
                target="_blank"
                className="flex gap-4 items-center"
              >
                <Github />
              </Link>
            </div>
            <div className="flex w-4/5 h-12 items-center border border-white rounded-xl cursor-pointer justify-center hover:bg-slate-200 transition-all duration-300 hover:text-slate-800 text-xl">
              <Link
                href={"/"}
                target="_blank"
                className="flex gap-4 items-center"
              >
                <Linkedin />
              </Link>
            </div>
            <div className="flex w-4/5 h-12 items-center border border-white rounded-xl cursor-pointer justify-center hover:bg-slate-200 transition-all duration-300 hover:text-slate-800 text-xl">
              <Link
                href={"/"}
                target="_blank"
                className="flex gap-4 items-center"
              >
                <Twitter />
              </Link>
            </div>
            <div className="flex w-4/5 h-12 items-center border border-white rounded-xl cursor-pointer justify-center hover:bg-slate-200 transition-all duration-300 hover:text-slate-800 text-xl">
              <Link
                href={"/"}
                target="_blank"
                className="flex gap-4 items-center"
              >
                <Beaker />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
