import React from 'react'

export default function Search({ search, setSearch }) {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Pesquise ou inicie um novo bate-papo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}
