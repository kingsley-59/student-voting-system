import React, { createContext, useContext, useState } from 'react';
import { defaultTheme }  from '../config/constants'
const StateContext = createContext();

export const ContextProvider = ({ children }) => {

	const [theme, settheme] = useState(defaultTheme);
    return (
		<StateContext.Provider 
			value={{
				theme, settheme
			}}>
			{children}
		</StateContext.Provider>
  	)
};

export const useStateContext = () => {
    return useContext(StateContext);
}

export default ContextProvider;