interface ItemProps{
    homepageClick?: ()=> void;
}

function Item({homepageClick}: ItemProps){

    return <div>
            <p>Item</p>
            <button onClick={homepageClick}>Homepage</button>
    </div>
}
export default Item;