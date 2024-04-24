interface ItemInfoProps{
    homepageClick?: ()=> void;
}

function ItemInfo({homepageClick}: ItemInfoProps){

    return <div>
            <p>ItemInfo</p>
            <button onClick={homepageClick}>Homepage</button>
    </div>
}
export default ItemInfo;