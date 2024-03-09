import { useState } from "react";

function RecommendMovie(props) {
    const [inputValue, setInputValue] = useState('');

    const handleRecommendClick = () => {
        // Check if the recommended movie already exists in the list
        const movieExists = props.movies.some(movie => movie.Title.toLowerCase() === inputValue.toLowerCase());

        if (movieExists) {
            alert(`O filme "${inputValue}" já existe na base de dados.`);
        } else {
            alert(`${inputValue} : Recomendado`);
        }
    };

    return (
        <div className="col col-sm-4 d-flex mt-2">
            <input
                className="form-control"
                placeholder="Digite o título do filme"
                style={{ borderRadius: '0.25rem 0 0 0.25rem' }}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
            className="btn btn-success btn-block" 
            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
            onClick={handleRecommendClick}>
                Recomendar
            </button>
        </div>
    );
}

export default RecommendMovie;
