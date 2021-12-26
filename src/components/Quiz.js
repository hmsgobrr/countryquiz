import { useEffect, useState } from "react";

function Quiz({ backToMenu }) {
    const [countryDatas, setCountryDatas] = useState([]);

    useEffect(() => {
        async function fetchCountryDatas() {
            try {
                let res = await fetch("https://restcountries.com/v3.1/all?fields=name,flag");
                setCountryDatas(await res.json());
            } catch (err) {
                alert("Sorry there is a problem loading data, try again later...\nERROR:\n" + err)
                backToMenu();
            }
        }
        fetchCountryDatas();
    }, [backToMenu]);

    return (
        <div className="space-even">
            {JSON.stringify(countryDatas)}
        </div>
    )
}

export default Quiz;
