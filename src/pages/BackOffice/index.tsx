import React, { useState, useRef, useEffect } from "react";

import api from "../../services/api";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setActiveCategory, fetchProducts } from "../../store/productsSlice";

import { Tabs, Table, Space, Switch, Input, Form, Button, Upload } from 'antd';
import { CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import "./styles.css";

import { Depart, Category, Product } from "../../interfaces";

function BackOffice() {
    const onChange = (key: string) => {
        console.log(key);
    };

    function RenderTabDepart() {
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);

        const [departs, setDeparts] = useState({} as any);

        const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
            console.log('params', pagination, filters, sorter, extra);
        };

        async function changeMarkup(departname: string, value: any) {
            console.log("departname ->", departname);
            console.log("value ->", value);
            try {
                const uri = value != null || value != "" ? `/Depart/ChangeMarkup/${departname}/${value}` : `/Depart/ChangeMarkup/${departname}`;

                const { data } = await api.post(uri);
                getDeparts();

            } catch (error: any) {
                return error?.response;
            }
        }

        async function changeStatus(departname: string) {
            try {
                const { data } = await api.post(`/Depart/ChangeStatus/${departname}`);
                getDeparts();

            } catch (error: any) {
                return error?.response;
            }
        }

        async function getDeparts() {
            try {
                const { data } = await api.get(`/Depart/ListDepart`);
                setDeparts(data as Depart[]);

            } catch (error: any) {
                return error?.response;
            }
        }
        useEffect(() => {
            console.log("useEffect ->");
            getDeparts();
            console.log("departs ->", departs);
        }, []);

        const columns = [
            {
                title: 'Departamento',
                dataIndex: 'departName',
                sorter: (a: any, b: any) => a.departName.localeCompare(b.departName),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'Markup',
                key: 'markup',
                dataIndex: 'markup',
                render: (_: any, record: any) => (
                    <Space>
                        <Input name="input-markup" defaultValue={record.markup} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMarkup(record.departName, e.target.value)} />
                    </Space>
                )
            },
            {
                title: 'Ativo',
                key: 'active',
                filters: [
                    {
                        text: 'Ativo',
                        value: 'true',
                    },
                    {
                        text: 'Inativo',
                        value: 'false',
                    },
                ],
                onFilter: (value: any, record: any) => record.active.toString().search(value) !== -1,
                render: (_: any, record: any) => (
                    <Space size="middle">
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={record.active}
                            onClick={() => changeStatus(record.departName)}
                        />
                    </Space>
                )
            },
            // {
            //   title: 'Cliente',
            //   dataIndex: 'Cliente',
            //   // key: 'clienteID',
            //   render: (item) => item != null ? (Object.values(item)[1]) : (null),   
            //   onFilter: (value, record) => record.Cliente.NomeCliente.toString().search(value) !== -1,
            // },  
            // {
            //   title: 'Ação',
            //   key: 'action',
            //   render: (_, record) =>
            //     projetos.length >= 1 ? (

            //       <Space size="middle">
            //         <Popconfirm title="Realmente deseja excluír o registro?" onConfirm={() => deletarProjeto(record)}>
            //             <a>Excluír</a>
            //         </Popconfirm>
            //         <a onClick={() => handleEditar(record)}>Editar</a> 
            //         <a onClick={() => handleDetalhes(record)}>Detalhes</a> 
            //       </Space>

            //     ) : null,
            // },
        ];

        if (departs.length > 0) {
            return (
                <>
                    <Table columns={columns as any} dataSource={departs} onChange={onChange} key='tableDepart' />
                </>
            )
        }
        else {
            return (
                <div>
                    <h1>Carregando...</h1>
                </div>
            )
        }
    }

    function RenderTabCategory() {
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);

        const [categories, setCategories] = useState({} as any);

        const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
            console.log('params', pagination, filters, sorter, extra);
        };

        async function changeMarkup(categoryId: string, value: any) {
            console.log("value ->", value);
            try {
                const uri = value != null || value != "" ? `/Categories/ChangeMarkup/${categoryId}/${value}` : `/Categories/ChangeMarkup/${categoryId}`;

                const { data } = await api.post(uri);
                getCategories();

            } catch (error: any) {
                return error?.response;
            }
        }

        async function changeStatus(categoryId: string) {
            try {
                const { data } = await api.post(`/Categories/ChangeStatus/${categoryId}`);
                getCategories();

            } catch (error: any) {
                return error?.response;
            }
        }

        async function getCategories() {
            try {
                const { data } = await api.get(`/Categories/ListAllCategory`);
                setCategories(data as Category[]);

            } catch (error: any) {
                return error?.response;
            }
        }
        useEffect(() => {
            console.log("useEffect ->");
            getCategories();
            console.log("categories ->", categories);
        }, []);

        const columns = [
            {
                title: 'Departamento',
                dataIndex: 'departName',
                sorter: (a: any, b: any) => a.departName.localeCompare(b.departName),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'Categoria',
                dataIndex: 'categoryName',
                sorter: (a: any, b: any) => a.categoryName.localeCompare(b.categoryName),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'Markup',
                key: 'markup',
                dataIndex: 'markup',
                render: (_: any, record: any) => (
                    <Space>
                        <Input name="input-markup" defaultValue={record.markup} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMarkup(record.id, e.target.value)} />
                    </Space>
                )
            },
            {
                title: 'Ativo',
                key: 'active',
                filters: [
                    {
                        text: 'Ativo',
                        value: 'true',
                    },
                    {
                        text: 'Inativo',
                        value: 'false',
                    },
                ],
                onFilter: (value: any, record: any) => record.active.toString().search(value) !== -1,
                render: (_: any, record: any) => (
                    <Space size="middle">
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={record.active}
                            onClick={() => changeStatus(record.id)}
                        />
                    </Space>
                )
            },
        ];

        if (categories.length > 0) {
            return (
                <>
                    <Table columns={columns as any} dataSource={categories} onChange={onChange} key='tableDepart' />
                </>
            )
        }
        else {
            return (
                <>
                    <div>
                        <h1>Carregando...</h1>
                    </div>
                </>
            )
        }
    }

    function RenderForaDaCasinha() {
        const dispatch = useDispatch<AppDispatch>();
        const [form] = Form.useForm();
        const [loading, setLoading] = useState(false);
        const [fileList, setFileList] = useState<UploadFile[]>([]);

        const products = useSelector((state: RootState) => state.products.products) as Product[];

        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);

        async function createItem() {
            try {
                const item = { description: form.getFieldValue("description"), category: 'Fora da Casinha', subCategory: "Fora da Casinha", price: parseFloat(form.getFieldValue("price")), active: true }
                console.log("item ->", item);
                const formData = new FormData();
                formData.append("file", fileList[0] as any);
                formData.append("item", JSON.stringify(item));

                const prod = {
                    item,
                    File: fileList[0]
                }

                // const { data } = await api.post('/Itens/CreateItem', item, {
                //     headers: {
                //         'content-type': 'text/json'
                //     }
                // });

                const { data } = await api.post('/Itens/AddProduct', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                console.log("Create Item ->", data);

            } catch (error: any) {
                return error?.response;
            }
        }

        function handleCreteItem() {
            setLoading(true);
            createItem().then(
                () => alert("Produto cadastrado com sucesso!"),
            ).finally(
                () => {
                    setLoading(false);
                    form.resetFields();
                    setFileList([]);
                }
            );
        }

        const props: UploadProps = {
            onRemove: (file: any) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
            },
            beforeUpload: (file: any) => {
                setFileList([...fileList, file]);

                return false;
            },
            fileList,
        };

        const columns = [
            {
                title: 'Produto',
                dataIndex: 'description',
                sorter: (a: any, b: any) => a.description.localeCompare(b.description),
                defaultSortOrder: 'ascend'
            },
            {
                title: 'Preço',
                dataIndex: 'price',
            },
            {
                title: 'Ativo',
                key: 'active',
                filters: [
                    {
                        text: 'Ativo',
                        value: 'true',
                    },
                    {
                        text: 'Inativo',
                        value: 'false',
                    },
                ],
                onFilter: (value: any, record: any) => record.active.toString().search(value) !== -1,
                render: (_: any, record: any) => (
                    <Space size="middle">
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={record.active}
                        // onClick={() => changeStatus(record.id)}
                        />
                    </Space>
                )
            },
        ];

        useEffect(() => {
            dispatch(fetchProducts('Fora da Casinha'));
            console.log("products ->", products);
        }, []);

        return (
            <>
                <Form
                    layout='vertical'
                    form={form}
                    autoComplete="off"
                    onFinish={handleCreteItem}
                >
                    <Form.Item
                        name='url'
                        label="Imagem do Produto"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Selecione a Imagem</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label="Nome do Produto"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Nome do Produto" />
                    </Form.Item>
                    <Form.Item
                        name='price'
                        label="Preço"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="0,00" />
                    </Form.Item>
                    <Form.Item>
                        <Button key="submit" type="primary" className="btn-register" >
                            {loading ? "Salvando..." : "Criar Novo Produto"}
                        </Button>
                    </Form.Item>
                </Form>

                <Table columns={columns as any} dataSource={products} key='tableProducts' />
            </>
        )
    }

    const tabs = [
        {
            key: "1",
            label: "Departamentos",
            children: RenderTabDepart()
        },
        {
            key: "2",
            label: "Categorias",
            children: RenderTabCategory()
        },
        {
            key: "3",
            label: "Fora da Casinha",
            children: RenderForaDaCasinha()
        }
    ];


    return (
        <div className="container-backoffice">
            <h1>BackOffice</h1>
            <Tabs
                onChange={onChange}
                type="card"
                items={tabs}
            />
        </div>
    );
}


export default BackOffice;