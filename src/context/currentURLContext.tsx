import { createContext, useEffect, useState, ReactNode } from "react";
import { CurrentURLType } from "../utils/types";

type CurrentURLProviderProps = {
	children: ReactNode;
};

export const CurrentURLContext = createContext<CurrentURLType | null>(null);

export const CurrentURLProvider = ({
	children,
}: CurrentURLProviderProps): JSX.Element => {
	const [url, setUrl] = useState<CurrentURLType>("");

	useEffect(() => {
		const currentURL = window.location.href;
		setUrl(currentURL);
	}, []);

	return (
		<CurrentURLContext.Provider value={url}>
			{children}
		</CurrentURLContext.Provider>
	);
};
