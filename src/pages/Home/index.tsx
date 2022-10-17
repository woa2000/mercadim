import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BackTop } from 'antd';

import ProductList from "../../components/productList";
import { RootState } from "../../store";

import './styles.css';

function Home() {
    const departName = useSelector((state: RootState) => state.products.departName)
    const dispatch = useDispatch();
    const categoryList = useSelector((state: RootState) => state.products.categoryList);

    const [pageYPosition, setPageYPosition] = useState(0);

    function getPageYAfterScroll() {
        setPageYPosition(window.scrollY);
    }

    return (
        <>
            <div id="topo"></div>
            {/* <button className="btn-voltar-topo">
                <a href="#top">
                    <p className="text-btn-voltar-topo">Voltar <br /> ao topo</p>
                </a>
            </button> */}

            <BackTop>
                <div className="btn-voltar-topo">
                    <p className="text-btn-voltar-topo">Voltar <br /> ao topo</p>
                </div>
            </BackTop>

            <ProductList
                departName={departName}
            />

        </>
    )
}

export default Home;