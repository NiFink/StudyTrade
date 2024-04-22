interface HomepageProps{
    shoppageClick?: ()=> void;
}

function Homepage({shoppageClick}: HomepageProps){

    return <div>
            <p>Homepage</p>
            <button onClick={shoppageClick}>Shoppage</button>
    </div>
}
export default Homepage;