import { useState } from "react";

function RecommendMovie(props) {
    const [inputValue, setInputValue] = useState('');

    const handleRecommendClick = async() => {
        // Check if the recommended movie already exists in the list
        const movieExists = props.movies.some(movie => movie.Title.toLowerCase() === inputValue.toLowerCase());

        if (movieExists) {
            alert(`O filme "${inputValue}" já existe na base de dados.`);
        } else {
            alert(`${inputValue} : Recomendado`);
            try {
                const response = await fetch('http://localhost:1999/google/addRow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        filme_recomendado: inputValue,
                    }),
                });

                if (response.ok) {
                    alert(`${inputValue} : Recomendado`);
                } else {
                    const data = await response.json();
                    alert(`Erro ao recomendar o filme: ${data.error}`);
                }
            } catch (error) {
                console.error('Error posting recommendation:', error.message);
                alert('Erro ao recomendar o filme. Verifique o console para detalhes.');
            }
        }
        }
    ;

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
