const Filter = ({handleChangeFilter, filter}) => {
    return (
    <input type="text" onChange={handleChangeFilter} value={filter} />
)
}

export default Filter;