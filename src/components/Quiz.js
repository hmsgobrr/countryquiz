import { useEffect, useState } from "react";
import "./Quiz.css"

function Quiz({ backToMenu }) {
    const [countryDatas, setCountryDatas] = useState([]);
    const [isLoadingDatas, setIsLoadingDatas] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    function getAnswers(rightAnswer, answerIsFlag) {
        let answers = new Array(4);
        const answerIdx = Math.floor(Math.random() * 4);
        for (let i = 0; i < 4; i++) {
            if (i === answerIdx) {
                answers[i] = rightAnswer;
            } else if (i === 0) {
                answerIdx[i] = answerIsFlag ?
                    countryDatas[Math.floor(Math.random() * countryDatas.length)].flag
                    :
                    countryDatas[Math.floor(Math.random() * countryDatas.length)].name.common;
            } else {
                do {
                    answers[i] = answerIsFlag ?
                        countryDatas[Math.floor(Math.random() * countryDatas.length)].flag
                        :
                        countryDatas[Math.floor(Math.random() * countryDatas.length)].name.common;
                } while (answers[i] === rightAnswer || answers[i] === answers[i - 1]);
            }
        }
        return answers;
    }

    useEffect(() => {
        async function fetchCountryDatas() {
            try {
                let res = await fetch("https://restcountries.com/v3.1/all?fields=name,flag");
                setCountryDatas(await res.json());
                setQuestions(new Array(7).fill({
                    answerIsFlag: Math.random() < 0.5,
                    country: countryDatas[Math.floor(Math.random() * countryDatas.length)]
                }));
                setIsLoadingDatas(false);
                console.log(questions[currentQuestionIdx]);
            } catch (err) {
                alert("Sorry there is a problem loading data, try again later...\nERROR:\n" + err)
                backToMenu();
            }
        }
        fetchCountryDatas();
    }, [backToMenu, countryDatas]);

    return (isLoadingDatas ?
        <div className="flex-center">
            <div className="spinner"></div>
            <h3>Loading Data</h3>
        </div>
        :
        <div className="flex-center space-even">
            <h2 className="question">
                {questions[currentQuestionIdx].answerIsFlag ?
                    ("Which flag belongs to " + questions[currentQuestionIdx].country.name.common)
                    :
                    ("Which country's flag is " + questions[currentQuestionIdx].country.flag)
                }
            </h2>
            <div className="answers">
                {getAnswers().map(answer => <button key={answer}>{answer}</button>)}
            </div>
        </div>
    )

}

export default Quiz;
