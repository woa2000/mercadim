import { useState } from "react";
import { Input, AutoComplete, SelectProps } from 'antd';
import "./styles.css";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchSearchProducts, fetchProducts } from "../../store/productsSlice";
import { Product } from "../../interfaces";
import api from "../../services/api";

const { Search } = Input;

interface SearchResult {
    products: Array<Product> | undefined
}

function SearchItems() {
    const dispatch = useDispatch<AppDispatch>();
    const [options, setOptions] = useState<SelectProps<object>['options']>([] as SelectProps<object>["options"]);

    const onType = (value: string) => {
        if (value)
            searchAutoComplete(value);
        else
            setOptions([] as SelectProps<object>["options"]);
    }

    const onSearch = (value: string) => {
        console.log("pesquisar ->", value)
        if(value !== "") {
            dispatch(fetchSearchProducts(value));
        }else{
            dispatch(fetchProducts("Alimentos"));
        }
    }
    
    const searchAutoComplete = (query: string) =>
    {
        api.get(`/Itens/ListItensSearch/${query}`)
            .then((value) => {
                console.log('result -> ', value.data)
                var result = (value.data as SearchResult).products?.map((value) => {
                    return value.description
                })
                .filter((value) => {
                    return value.toLowerCase().includes(query.toLowerCase())
                })
                .map((value, idx) => {
                    const id = `${value}${idx}`;
                    return {
                    value: id,
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{value}</span>
                            {/* <span>{getRandomInt(200, 100)} results</span> */}
                        </div>
                    ),
                    };
                });

                setOptions(result);
            })
            .catch((error) => {
                console.log("error ->", error);
            });
    }

    return (
        <AutoComplete
            key={0}
            dropdownMatchSelectWidth={252}
            style={{ width: "100%", position: "static" }}
            options={options}
            onChange={onType}
            onSelect={onSearch}
        >
            <Search
                className="search-input"
                placeholder="O que você procura?"
                enterButton="Buscar"
                size="large"
                onSearch={onSearch}
            />
        </AutoComplete>
    )
}

export default SearchItems;