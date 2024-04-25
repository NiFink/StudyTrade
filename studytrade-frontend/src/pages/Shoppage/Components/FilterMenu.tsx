interface FilterMenuProps{
    homepageClick?: ()=> void;
}

function FilterMenu({homepageClick}: FilterMenuProps){

    return <div>
                <p className="text-sm font-medium text-red-900 flec">FilterMenu</p>
                <button onClick={homepageClick}>Homepage</button>
            </div>
}
export default FilterMenu;