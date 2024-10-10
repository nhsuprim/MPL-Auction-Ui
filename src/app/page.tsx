import About from "@/components/Home/About/About";
import Help from "@/components/Home/helpingHand/help";
import Introduct from "@/components/Home/Introduce/Introduct";
// import Song from "@/components/mpl-theme/theme-song";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <div className="container min-h-screen mx-auto px-4 space-y-10">
            <Introduct />
            <About />
            {/* <Song /> */}
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            /> */}
            <Help />
        </div>
    );
}
