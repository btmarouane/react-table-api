import React,{useState, useCallback, useEffect} from 'react'
import { render } from 'react-dom';
import {format} from 'date-fns';
import CustomTable from "./components/table/Table";
import Scroll from "./components/scroll/Scroll";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import useDropdown from "./components/dropdown/useDropdown";

const App = () => {
    const [products, setProducts] = useState([]);
    const [category, CategoryDropdown] = useDropdown('category', 'All');
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        const results = await fetch(
            'https://app.getrecall.com/api/products',
        );
        if (results.ok) {
            const data = await results.json();
            setProducts(data.products);
            const distinctCategories = data.products.reduce((acc, curr) => {
                if(acc.indexOf(curr.category) === -1){
                    acc.push(curr.category);
                }
                return acc;
            }, []);
            setCategories(distinctCategories);
        }
        else{
            console.log("Server Error Occurs, try later");
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: '_id',
                sticky: 'left'
            },
            {
                Header: 'Name',
                accessor: 'name',
                sticky: 'left'
            },
            {
                Header: 'Features',
                sticky: 'left',
                accessor : data => <Scroll>
                    {
                        data.features.map(item => <li key={item} style={{paddingBottom:'10px'}} > {item} </li>)
                    }
                </Scroll>
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Sub Category',
                accessor: 'subcategory',
            },
            {
                Header: 'CreatedAt',
                accessor: 'createdAt',
                Cell: ({ value }) => {
                    return format(new Date(value), "dd/MM/yyyy 'At' HH:mm:ss")
                }
            },
            {
                Header: 'UpdatedAt',
                accessor: 'updatedAt',
                Cell: ({ value }) => {
                    return format(new Date(value), "dd/MM/yyyy 'At' HH:mm:ss")
                }
            },
            {
                Header: '__v',
                accessor: '__v',
                width: 50
            },
            {
                Header: 'ModelId',
                accessor: 'modelId'
            },
            {
                Header: 'pid',
                accessor: 'pid'
            },
            {
                Header: 'Datasheet',
                id: 'datasheet',
                accessor: data => (<a target="_blank" href={data.datasheet}>Datasheet</a>)
            },
            {
                Header: 'Link',
                id: 'link',
                accessor: data => (<a target="_blank" href={data.link}>Link</a>)
            },
            {
                Header: 'Thumbnail',
                id: 'thumbnail',
                accessor: data => (<a target="_blank" href={data.thumbnail}>Thumbnail</a>)
            },
           {
               Header: 'Specifications',
               id: 'specifications',
               width: 300,
               accessor: data =>{
                   return(
                       <Scroll>
                           <table className="table sticky">
                               <thead className="header">
                                   <tr>
                                       <th> name </th>
                                       <th> category </th>
                                       <th> value </th>
                                   </tr>
                               </thead>
                               <tbody>
                               {
                                   data.specifications.map( item => <tr key={item.name} >
                                       <td>{item.name}</td>
                                       <td>{item.category}</td>
                                       <td>{item.value}</td>
                                   </tr>)
                               }
                               </tbody>
                           </table>
                       </Scroll>
                       )
               }
            },
        ],
        []
    )

    return (
        <>
            <CategoryDropdown options={categories}/>
            <CustomTable isLoading={isLoading} columns={columns} data={products.filter(product => category === 'All'?true:product.category === category)} />
        </>
    );
}

render(<App />, document.getElementById('root'));

