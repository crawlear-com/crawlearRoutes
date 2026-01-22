import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import EventDetail from "../../features/events/EventDetail/EventDetail";

const Event = () => {
  return (<>
    <Header />
    <main>
      <EventDetail />
    </main>
    <Footer />
  </>);

}

export default Event;