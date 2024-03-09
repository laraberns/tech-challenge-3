function SearchBox(props) {
    return (
        <div className="col col-sm-4">
            <input
                className="form-control" placeholder="Digite um filme"
                onChange={(event) => props.setSearch(event.target.value)}
            />
        </div>
    )
}

export default SearchBox
