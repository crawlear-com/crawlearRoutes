import { NavLink } from "react-router";
import useSession from "@/application/hooks/useSession";
import Header from "@/application/components/ui/Header/Header";
import Footer from "@/application/components/ui/Footer/Footer";
import { useTranslation } from 'react-i18next';

import locationImage from './assets/images/location.webp';
import personasImage from './assets/images/personas.webp';
import mountainImage from './assets/images/mountain.webp';
import mapImage from './assets/images/mapa.webp';
import logo from '@/application/assets/images/logo.webp';

import "./styles/landing.css";

const Landing = () => {
    const { t } = useTranslation(["landing"]);
    useSession("/myroutes");

    return (<>
        <Header />
        <main className="flex flex-col items-center justify-center text-center min-h-[80vh]">
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <div className="flex-2 mb-20 mx-5 lg:mx-10 min-w-2xs w-50 lg:w-80 justify-center">
                    <img className="m-auto mb-10" width="200" height="144" src={ logo } alt="crawlear.com logo" title="crawlear.com logo" />
                    <h1 className="">{ t('main.explore routes hassle')}</h1>
                    <p className="text-left my-10 text-xl">{ t('main.plan record share') }</p>
                    <NavLink to="/login" className="button-primary max-w-50 m-auto">{ t('main.getstarted') }</NavLink>
                </div>
                <img loading="lazy" width="240" height="462" className="flex-1 max-w-60 w-50" src={ mapImage } alt="image showing a route in a map" />
            </section>
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <h1>{ t('main.why crawlear') }</h1>
                <div className="flex flex-wrap gap-5 mt-10" >
                    <div className="card landingCard">
                        <img loading="lazy" src={locationImage} width="103" height="96" alt="icon referring to capture a route functionality" />
                        <h1 className="mb-5">{ t('main.capture your route') }</h1>
                        <p className="text-xl">{ t('main.log your routes') }</p>
                    </div>
                    <div className="card landingCard">
                        <img loading="lazy" src={personasImage} width="103" height="96" alt="icon referring to find new routes functionality" />
                        <h1 className="mb-5">{ t('main.find new trails') }</h1>
                        <p className="text-xl">{ t('main.browse public routes') }</p>
                    </div>
                    <div className="card landingCard">
                        <img loading="lazy" src={mountainImage} width="103" height="96" alt="icon referring to sahre your routes feature" />
                        <h1 className="mb-5">{ t('main.share with others') }</h1>
                        <p className="text-xl">{ t('main.share favourites') }</p>
                    </div>
                </div>
            </section>
            <section className="bg-primary w-full p-15 text-secondary">
                <h1>{ t('main.ready to explore') }</h1>
                <p>{ t('main.join crawlear') }</p>
                <NavLink to="/login" className="button-secondary max-w-50 mx-auto mt-20">{ t('main.getstarted') }</NavLink>
            </section>
        </main>
        <Footer />
    </>);
}

export default Landing;