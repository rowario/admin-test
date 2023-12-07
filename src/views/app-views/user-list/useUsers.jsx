import { useState, useEffect } from "react";

const useUsers = () => {
	const [data,setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		try {
			setIsLoading(true);

			// looks like a heavy loading...
			await new Promise(res => setTimeout(res,1_000));

			const response = await fetch("https://jsonplaceholder.typicode.com/users");
			const data = await response.json();

			console.log(data);

			setData(data);
			setIsLoading(false);
		} catch(e) {
			console.log(`Got an error while fetching data from jsonplaceholder`)
		}
	}

	useEffect(() => {
		fetchData()
	},[]);

	return { data, isLoading };
};

export default useUsers;
