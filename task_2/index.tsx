import React, { Fragment, memo, useCallback } from "react";

type ChildProps = {
  makeLog: () => void;
};

//без useCallback каждый раз создается новая функция = новая ссылка, что приводит к перерисовке ChildComponent
const MainComponent: React.FC = () => {
  const makeLog = useCallback(() => console.log("hi from MainComponent"), []); // function to make logs from MainComponent

  return (
    <Fragment>
      <ChildComponent makeLog={makeLog} />
    </Fragment>
  );
};

// memoized component
const ChildComponent = memo<ChildProps>(({ makeLog }) => (
  <button onClick={makeLog}>say Hi from ChildComponent</button>
));

export default MainComponent;
