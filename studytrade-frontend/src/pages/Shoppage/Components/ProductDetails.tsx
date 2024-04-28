import React, { useEffect, useRef } from 'react';

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

function ProductDetails({ product, toggleDetails, isDetailsOpen }: ProductDetailsProps) {
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                toggleDetails(); 
            }
        };

        if (isDetailsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
  }, [toggleDetails, isDetailsOpen]);


  const handleCloseDetails = () => {
    toggleDetails();
  };


  return (
    <div className='flex'>
      <div ref={detailsRef} className={`details fixed top-0 bottom-0 right-0 p-2 w-[500px] overflow-y-auto text-center bg-white ${isDetailsOpen ? '' : 'right-[-1000px]'}`}>
        <div className='flex p-2 justify-between items-center'>
            <button className="p-1.5" onClick={handleCloseDetails}>
                <i className='bi bi-arrow-left lg:hidden cursor-pointer'/>
            </button>
            <h1 className='mx-auto'>
                {product.name}
            </h1>
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
