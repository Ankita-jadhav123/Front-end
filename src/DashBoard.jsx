import { data, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loader from './Loader'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function Dashboard(){
    
    const {register , handleSubmit ,formState:{errors},watch,setFocus,setValue} = useForm()
    const[isLoading,setLoading] = useState(false)
    const navigate = useNavigate()
    const[products,setProducts] = useState([])
    const[updateObj,setUpdateObj] = useState({})
    const[actions,setActions] = useState(true)

    const getProducts = async()=>{
        const res = await axios.get("https://nodemon-black.vercel.app/Product/get")
        const resData = res.data
        if(resData.status){
            setProducts(resData.message)
        }
    }
    
    useEffect(()=>{
        getProducts()
    },[])

    const getUpdateInfo = (currentObj)=>{
        setActions(false)
        setUpdateObj(currentObj)
        setValue('productName',currentObj.productName)
        setValue('productPrice',currentObj.productPrice)
        setValue('productUnit',currentObj.productUnit)
        setValue('productDescription',currentObj.productDescription)
    }
    const deleteProduct =async(id)=>{
        const res = await axios.delete(`https://nodemon-black.vercel.app/Product/delete/${id}`,data)
        const resData = res.data
        if(resData.status){
            toast.success(resData.message)
            getProducts()
        }
    }
    

    const onFormSubmit = (data) =>{
       if(actions){
        setLoading(true)
        setTimeout(async() => {
            const res = await axios.post('https://nodemon-black.vercel.app/Product/add',data)
            const resData = res.data
            setLoading(false)
            if(resData.status){
                toast.success(resData.message)
            }else {
                if(resData.message === 'User not found'){
                setValue('userName','')
                setValue('password','')
                setFocus('password')
            }else if(resData.message === 'Wrong password'){
                setFocus('password')
                setValue('password','')
            }
            toast.error(resData.message)
        }      
        }, 1000);
       }else{
        setLoading(true)
        setTimeout(async() => {
            const res = await axios.put(`https://nodemon-black.vercel.app/Product/update/${updateObj._id}`,data)
            const resData = res.data
            setLoading(false)
            if(resData.status){
                toast.success(resData.message)
            }else {
                if(resData.message === 'User not found'){
                setValue('userName','')
                setValue('password','')
                setFocus('password')
            }else if(resData.message === 'Wrong password'){
                setFocus('password')
                setValue('password','')
            }
            toast.error(resData.message)
        }      
        }, 1000);
        setActions(true)
       }
    }
    const onLogoutClick = ()=>{
        Cookies.remove('app-user')
        navigate('/')
    }
    useEffect(()=>{
        if(!Cookies.get('app-user')){
            navigate('/')
        }
    },[])

    return(
        <>
        {isLoading && <Loader/>}
        <div className="header">
            <h2>Welcome,fullName</h2>
            <button onClick={onLogoutClick}>Logout</button>
        </div>
        <div className="dashboard-container">
            <div className="card">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    
                    <h2 >{actions ? 'Add Product': 'Update Product'}</h2>
                    <div className="input-field">
                        <label>Product Name</label>
                        <input type='text' {...register ('productName',
                            {required:('Product Name is required')}
                        )}/>
                        {errors.productName && <p>{errors.productName.message}</p>}
                    </div>
                    <div className="input-field">
                        <label>Product Price</label>
                        <input type='text'{...register ('productPrice',
                            {required:('Product Price is required')}
                        )}/>
                        {errors.productPrice && <p>{errors.productPrice.message}</p>}
                    </div>
                    <div className="input-field">
                        <label>Product Unit</label>
                        <select {...register ('productUnit',
                            {required:('Product Unit is required')}
                        )} >
                            <option selected value=''>Select</option>
                            <option select value='Kilogram'>Kilogram</option>
                            <option select value='Liters'>Liters</option>
                            <option select value='Quintals' >Quintals</option>
                        </select>
                        {errors.productUnit && <p>{errors.productUnit.message}</p>}
                    </div>
                    <div className="input-field">
                        <label>Product Description</label>
                        <input type='text'{...register ('productDescription',
                            {required:('Product Description is required')}
                        )}/>
                         {errors.productDescription && <p>{errors.productDescription.message}</p>}
                    </div>
                    <button type='submit'>{ actions ? 'Add Product' : 'Update Product'}</button>
                </form>

            </div>
            <div className="card1">
                <h2>Product List</h2>
                <table >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Unit</th>
                            <th>Product Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            products.length === 0 ? ( <td colSpan='6'>No Users Available!</td>) :
                            (
                                products.map((ele,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{ele.index}</td>
                                            <td>{ele.productName}</td>
                                            <td>{Number(ele.productPrice).toFixed(2)}</td>
                                            <td>{ele.productUnit}</td>
                                            <td>{ele.productDescription}</td>
                                            <td className='actions'>
                                            <p><i onClick={()=>getUpdateInfo(ele)} className="fa-solid fa-pen-to-square icon"></i> Edit</p>
                                            <p><i onClick={()=>deleteProduct(ele._id)} className="fa-solid fa-trash icon"></i> Delete</p>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        }
                        
                        </tbody>
                </table>
            </div>
        </div>




        <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                    background: '#363636',
                    color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                    duration: 3000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                    },
                }}
                />
        </>

    )
}