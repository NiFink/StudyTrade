interface FilterMenuProps{
    homepageClick?: ()=> void;
}

function FilterMenu({homepageClick}: FilterMenuProps){

    return <div>
            <p>FilterMenu</p>
            <button onClick={homepageClick}>Homepage</button>
    </div>
}
export default FilterMenu;