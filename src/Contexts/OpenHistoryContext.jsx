import React, { createContext, useState } from 'react';

// Create the context
export const HistoryContext = createContext();


const OpenHistoryContext = (WrappedComponent) => {
  const HistoryProvider = (props) => {
    const [isHistoryOpen, toggleHistory] = useState(false);

    return (
      <HistoryContext.Provider value={{ isHistoryOpen, toggleHistory }}>
        <WrappedComponent {...props} />
      </HistoryContext.Provider>
    );
  };

  return HistoryProvider;
};

export default OpenHistoryContext;
