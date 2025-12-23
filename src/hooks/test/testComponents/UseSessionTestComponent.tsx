import useSession from "../../useSession";

const TestComponent = () => {
    useSession("/");

    return <div data-testid="guard"></div>;
}

export default TestComponent;