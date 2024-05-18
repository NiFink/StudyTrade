import React, { ChangeEvent, useState, useRef, useEffect} from 'react';

interface MenubarProps {
  shoppageClick?: () => void;
  profilepageClick: () => void;
  homepageClick: () => void;
}

function Menubar({ shoppageClick, profilepageClick, homepageClick }: MenubarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (inputValue === '' && document.activeElement !== inputRef.current) {
      setIsExpanded(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsExpanded(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      if (inputValue === '') {
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue]);

  return (
    <div className="mx-5 my-3 ">
      <div className="flex justify-between border-b border-gray-300 py-2">
        <button onClick={homepageClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
          <i className="bi bi-shop"></i>{" "}
          StudyTrade
        </button>
        <div className="flex space-x-7">
          <div className="flex justify-center items-center">
            <div className="relative">
              <div
                ref={containerRef}
                className="bg-gray-100 text-gray-800 font-semibold px-3 py-2 rounded-full flex shadow overflow-hidden"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <input
                  ref={inputRef}
                  type="search"
                  placeholder='Search...'
                  id='searchInput'
                  className={`rounded-full bg-gray-100 focus:outline-none appearance-none flex-grow px-2 transition-width duration-500 ${isExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button className="bg-white hover:bg-gray-300 font-semibold py-1 px-2 rounded-full shadow">
                  <i className="bi bi-search"></i>{" "}
                </button>
              </div>
            </div>
          </div>
          <button onClick={shoppageClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
            <i className="bi bi-heart"></i>{" "}
            Favorites
          </button>
          <button onClick={profilepageClick} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow">
            <i className="bi bi-person-circle"></i>{" "}
            Profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
