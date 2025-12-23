import { NavLink } from "react-router";
import useSession from "../../hooks/useSession";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import featuresData from './assets/data/features.config';
import mapImage from './assets/images/mapa.png';

const Landing = () => {
    useSession("/myroutes");

    return (<>
        <Header />
        <main className="flex flex-col items-center justify-center text-center min-h-[80vh]">
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <div className="flex-2 mb-20 mx-5 lg:mx-10 min-w-2xs w-50 lg:w-80 justify-center">
                    <h1 className="">Explore RC routes without the hassle</h1>
                    <p className="text-left my-10 text-xl">Plan, record, and share your RC adventures like never before. Crawlear lets you capture your routes directly from GPS data or import them from your favorite tracking app, automatically mapping every twist and climb. Explore public trails created by other enthusiasts, find new places to drive, and build your personal collection of routes — all from one intuitive, map-based interface designed for the RC community.</p>
                    <NavLink to="/login" className="button-primary max-w-50 m-auto">Get started</NavLink>
                </div>
                <img className="flex-1 max-w-60 w-50" src={ mapImage } />
            </section>
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <h1>Why use Crawlear.com?</h1>
                <div className="flex flex-wrap" >
                    {featuresData.map((f, i) => (
                    <div key={i} className="card flex-1">
                        <img src={f.img} />
                        <h1>{f.title}</h1>
                        <p className="text-xl">{f.text}</p>
                    </div>
                    ))}
                </div>
            </section>
            <section className="bg-primary w-full p-15 text-secondary">
                <h1>Ready to explore?</h1>
                <p>Join Crawlear and start to share your routes today.</p>
                <NavLink to="/login" className="button-secondary max-w-50 mx-auto mt-20">Get started</NavLink>
            </section>
        </main>
        <Footer />
    </>);
}

export default Landing;