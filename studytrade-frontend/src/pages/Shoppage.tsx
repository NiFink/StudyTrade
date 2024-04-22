interface ShoppageProps{
    homepageClick?: ()=> void;
}

function Shoppage({homepageClick}: ShoppageProps){

    return <div>
            <p>Shoppage</p>
            <button onClick={homepageClick}>Homepage</button>
    </div>
}
export default Shoppage;