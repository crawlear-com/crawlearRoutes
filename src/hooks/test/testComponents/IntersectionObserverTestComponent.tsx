import useIntersectionObserver from "../../useIntersectionObserver";

const TestComponent = ({ callback, needsToCallback}: {
  callback: () => void;
  needsToCallback: boolean;
}) => {
  const ref = useIntersectionObserver(callback, needsToCallback);
  
  return <div ref={ref} data-testid="observer" />;
};

export default TestComponent;