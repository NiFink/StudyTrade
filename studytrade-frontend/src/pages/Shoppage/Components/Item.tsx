import ItemInfo from "./ItemInfo";

interface ItemProps{
    homepageClick: ()=> void;
}

function Item({homepageClick}: ItemProps){
    const products = [
        {
            id: 1,
            name: 'Earthen Bottle',
            onclick: homepageClick,
            price: '$48',
            info: 'Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Nomad Tumbler',
            onclick: homepageClick || (() => {}),
            price: '$35',
            info: 'Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'Focus Paper Refill',
            onclick: homepageClick || (() => {}),
            price: '$89',
            info: 'Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Machined Mechanical Pencil',
            onclick: homepageClick || (() => {}),
            price: '$35',
            info: 'Eine elegante Wasserkanne aus strapazierfähigem Kunststoff mit schlankem Griff und Ausgießer, ideal für den Garten oder den Haushalt.',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        }]
        // ober div:text group-hover:from-black/70 group-hover:via-black/70 group-hover:to-black/70
    return <div>
            <div className="bg-gray-500">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <button key={product.id} onClick={product.onclick} className="group relative items-center justify-center overflow-hidden cursor-pointer">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg via-transparent xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                                />
                                <div className="absolute bottom-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:to-black/70 group-hover:via-black/50 rounded-lg">
                                    <div className="absolute inset-0 flex flex-col items-center  text-center translate-y-[85%] group-hover:translate-y-[50%] transition-all rounded-lg">
                                        <h1 className="mt-3  text-xl font-bold text-white">{product.name}</h1>
                                        <p className="mt-3 text-lg font-medium text-white">{product.price}</p>
                                        <p className="p-2 text-xs font-medium text-white">{product.info}</p>
                                    </div>
                                </div>
                            </div>
                        </button>
    ))}
                    </div>
                </div>
            </div>

    </div>
}
export default Item;