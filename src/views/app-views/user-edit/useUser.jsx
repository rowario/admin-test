import { useState, useEffect } from "react";

const useUser = (userId) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);

			// looks like a heavy loading...
			await new Promise(res => setTimeout(res,500));

			const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
			const data = await response.json();

			console.log(data);

			setData(data);
			setIsLoading(false);
			setIsLoaded(true);
		} catch(e) {
			console.log(`Got an error while fetching data from jsonplaceholder`)
		}
	}

	useEffect(() => {
		fetchData()
	},[]);

	return { data, isLoading, isLoaded };
};

export default useUser;
