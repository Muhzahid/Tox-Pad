import React, { Suspense, lazy } from "react";
import "./App.css";
import Loader from "./components/ui/Loader";

// Lazy load the InboxPage
const InboxPage = lazy(() => import("./pages/InboxPage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <InboxPage />
      </Suspense>
    </>
  );
}

export default App;