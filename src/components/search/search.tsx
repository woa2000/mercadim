import React from "react";
import { Input, Space } from 'antd';
import "./styles.css";

const { Search } = Input;

function SearchItems() {
    const onSearch = (value: string) => console.log(value);

    return (

        <Search
            className="search-input"
            placeholder="O que você procura?"
            allowClear
            enterButton="Buscar"
            size="large"
            onSearch={onSearch}
        />
    )
}

export default SearchItems;