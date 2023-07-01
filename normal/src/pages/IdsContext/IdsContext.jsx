import React, { useContext, useRef, useState } from "react";

const IdsContext = React.createContext({ ids: null, setIds: (id) => {} });

export const useIds = () => {
  return useContext(IdsContext);
};


const IdsProvider = ({ children }) => {
  const [ids, setIds] = useState({
    userId:null,
    companyId: null,
    accountingYearId:null,
    accountMasterId: null,
    groupMasterId: null,
    itemMasterId:null,
    gstRateMasterId:null,
    stateMasterId:null
  });

  return (
    <IdsContext.Provider value={{ ids, setIds }}>
      {children}
    </IdsContext.Provider>
  );
};

export default IdsProvider;
