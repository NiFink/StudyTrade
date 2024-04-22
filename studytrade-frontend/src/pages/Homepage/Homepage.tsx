interface HomepageProps{
    shoppageClick?: ()=> void;
    profilepageClick: ()=> void;
}

function Homepage({shoppageClick, profilepageClick}: HomepageProps){

    return <div>
            <p>Homepage</p>
            <button onClick={shoppageClick}>Shoppage</button>
            <button onClick={profilepageClick}>Profilepage</button>
    </div>
}
export default Homepage;