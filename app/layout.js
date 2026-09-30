import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import MotionObserver from "./components/helper/motion-observer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Navin Parmar | Graphics Designer",
  description:
    "I'm Parmar Navin, a passionate and creative Graphics Designer trained at Red & White Skill Education. I specialize in creating visually appealing designs using Adobe Photoshop, Illustrator, and InDesign. From branding and logo design to posters, social media creatives, and print designs, I love transforming ideas into meaningful visual experiences. I’m a quick learner who enjoys exploring new design trends and AI tools to enhance creativity. My goal is to create professional, attractive, and impactful designs that bring brands and ideas to life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer />
        <MotionObserver />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
