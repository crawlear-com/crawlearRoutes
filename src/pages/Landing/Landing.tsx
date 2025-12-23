import { NavLink } from "react-router";
import useSession from "../../hooks/useSession";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from 'react-i18next';

import locationImage from './assets/images/location.png';
import personasImage from './assets/images/personas.png';
import mountainImage from './assets/images/mountain.png';
import mapImage from './assets/images/mapa.png';

const Landing = () => {
    const { t } = useTranslation(["landing"]);
    useSession("/myroutes");

    return (<>
        <Header />
        <main className="flex flex-col items-center justify-center text-center min-h-[80vh]">
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <div className="flex-2 mb-20 mx-5 lg:mx-10 min-w-2xs w-50 lg:w-80 justify-center">
                    <h1 className="">{ t('main.explore routes hassle')}</h1>
                    <p className="text-left my-10 text-xl">{ t('main.plan record share') }</p>
                    <NavLink to="/login" className="button-primary max-w-50 m-auto">{ t('main.getstarted') }</NavLink>
                </div>
                <img className="flex-1 max-w-60 w-50" src={ mapImage } />
            </section>
            <section className="my-10 mx-auto py-4 px-20 flex w-full justify-center flex-wrap items-center">
                <h1>{ t('main.why crawlear') }</h1>
                <div className="flex flex-wrap" >
                    <div className="card flex-1">
                        <img src={locationImage} />
                        <h1>{ t('main.capture your route') }</h1>
                        <p className="text-xl">{ t('main.log your routes') }</p>
                    </div>
                    <div className="card flex-1">
                        <img src={personasImage} />
                        <h1>{ t('main.find new trails') }</h1>
                        <p className="text-xl">{ t('main.browse public routes') }</p>
                    </div>
                    <div className="card flex-1">
                        <img src={mountainImage} />
                        <h1>{ t('main.share with others') }</h1>
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