import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    details: string;
    imageSrc: string;
    imageAlt: string;
}

interface ProductDetailsProps {
    product: Product;
    toggleDetails: () => void;
    isDetailsOpen: boolean;
}


function ProductDetails({product, toggleDetails, isDetailsOpen}: ProductDetailsProps){
    const [zIndex, setZIndex] = useState<number>(1);

    const handleDetailsOpen = () => {
        setZIndex(2); 
        toggleDetails(); 
    }

    const handleDetailsClose = () => {
        setZIndex(1); 
        toggleDetails(); 
    }

    return <div className='flex' style={{ zIndex: isDetailsOpen ? 2 : 1 }}>
        <div className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white ${isDetailsOpen ? '' : 'left-[-500px]'}`}>
            <div className="absolute inset-0 flex flex-col Products-center  text-center translate-y-[85%] group-hover:translate-y-[50%] transition-all rounded-lg">
                <h1 className="mt-3  text-xl font-bold text-white">
                    {product.name}
                </h1>
                <p className="mt-3 text-lg font-medium text-white">
                    {product.price}
                </p>
                <p className="p-2 text-xs font-medium text-white">
                    {product.details}
                </p>
            </div>
        </div>
    </div>
}
export default ProductDetails;